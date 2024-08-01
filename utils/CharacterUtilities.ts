import {
	Character,
	Skill,
	Reward,
	DiceCheck,
	Assignment,
	Term,
	Characteristics,
	CharacterInput,
	Race,
	TrainingTable,
} from "#imports";
import { SkillsDb, CareersDb } from "#imports";

export class CharacterUtilities {
	public static ParseCharacter(input: CharacterInput): Character {
		const character = new Character(input.Name, input.Race, input.HomeWorld, 18);

		this.AddLifePath(character, "--------------------------");
		this.AddLifePath(character, "--- Term 0 (18 years) ---");
		this.AddLifePath(character, "--------------------------");

		character.currentStageId = 2;

		let characteristics: Characteristics | null = null;
		if (input.CharacteristicsString) {
			characteristics = this.ParseCharacteristics(input.CharacteristicsString);
			character.Characteristics = characteristics;
			this.AddLifePath(
				character,
				"Initial characteristics rolls: " + (characteristics?.ToString() ?? "No characteristics rolled")
			);

			// Alter characteristics by race
			if (character.Race == Race.Aslan) {
				character.Characteristics.Strength += 2;
				character.Characteristics.Dexterity -= 2;
				this.AddLifePath(character, "Aslan racial characteristics: +2 Strength, -2 Dexterity");
				this.AddLifePath(character, "Aslan traits: Dewclaws, Heightened Senses");
			}
			if (character.Race == Race.Vargr) {
				character.Characteristics.Strength -= 1;
				character.Characteristics.Dexterity += 1;
				character.Characteristics.Endurance -= 1;
				this.AddLifePath(character, "Vargr racial characteristics: -1 Strength, +1 Dexterity, -1 Endurance");
				this.AddLifePath(character, "Vargr traits: Bite, Heightened Senses");
			}
		} else {
			return character;
		}

		character.currentStageId = 3;

		if (input.BackgroundSkillsString) {
			const backgroundSkills = this.ParseBackgroundSkills(input.BackgroundSkillsString);
			this.AddSkillsToCharacter(character, backgroundSkills, false);

			let backgroundLifePath = "Background skills: ";
			for (const skill of character.Skills) {
				backgroundLifePath += skill.ToString() + ", ";
			}
			backgroundLifePath = backgroundLifePath.slice(0, -2);
			this.AddLifePath(character, backgroundLifePath);
		} else {
			return character;
		}

		character.currentStageId = 4;

		if (input.TermsString) {
			this.ParseTerms(input.TermsString, character);
		}

		return character;
	}

	public static ParseCharacteristics(characteristicsString: string): Characteristics {
		if (characteristicsString.length !== 14) {
			throw new Error("Characteristics string must be 14 characters long");
		}

		const strength = parseInt(characteristicsString.substring(0, 2));
		const dexterity = parseInt(characteristicsString.substring(2, 4));
		const endurance = parseInt(characteristicsString.substring(4, 6));
		const intellect = parseInt(characteristicsString.substring(6, 8));
		const education = parseInt(characteristicsString.substring(8, 10));
		const socialStanding = parseInt(characteristicsString.substring(10, 12));
		const psionics = parseInt(characteristicsString.substring(12, 14));

		return new Characteristics(strength, dexterity, endurance, intellect, education, socialStanding, psionics);
	}

	public static ParseBackgroundSkills(backgroundSkillsString: string): Skill[] {
		if (backgroundSkillsString.length % 2 !== 0) {
			throw new Error("Background skills string must be a multiple of 2 characters long");
		}

		const backgroundSkills: Skill[] = [];
		const skillIds: number[] = [];

		for (let i = 0; i < backgroundSkillsString.length; i += 2) {
			skillIds.push(parseInt(backgroundSkillsString.substring(i, i + 2)));
		}

		for (const skillId of skillIds) {
			const skillDbRecord = SkillsDb.GetSkillById(skillId);

			if (!skillDbRecord) {
				throw new Error("Invalid skill ID: " + skillId);
			}

			const name = skillDbRecord.Name;
			const level = 0;

			backgroundSkills.push(new Skill(name, level));
		}

		return backgroundSkills;
	}

	public static AddLifePath(character: Character, lifePath: string) {
		character.LifePath.push(lifePath);
	}

	public static AddSkillToCharacter(character: Character, skill: Skill, addToLifePath = true) {
		const existingSkill = character.Skills.find((s: Skill) => s.Name === skill.Name);

		if (existingSkill) {
			if (skill.Level > existingSkill.Level) {
				existingSkill.Level = skill.Level;
				if (addToLifePath) {
					this.AddLifePath(character, "Gained: " + skill.ToString());
				}
			} else {
				if (addToLifePath) {
					this.AddLifePath(character, "Gained: " + skill.ToString() + " (already known)");
				}
			}
		} else {
			character.Skills.push(skill);
			if (addToLifePath) {
				this.AddLifePath(character, "Gained: " + skill.ToString());
			}
		}

		this.SortCharacterSkills(character);
	}

	public static AddSkillsToCharacter(character: Character, skills: Skill[], addToLifePath = true) {
		for (const skill of skills) {
			this.AddSkillToCharacter(character, skill, addToLifePath);
		}
	}

	public static SortCharacterSkills(character: Character) {
		character.Skills.sort((s1: Skill, s2: Skill) => s1.Name.localeCompare(s2.Name));
	}

	public static ParseTerms(termString: string, character: Character) {
		const terms = termString.split("NT");

		for (let i = 0; i < terms.length; i++) {
			const careerString = terms[i];
			const termNumber = i + 1;
			const age = termNumber * 4 + 18;
			character.Age = age;
			this.ParseCareer(character, careerString, termNumber, age);
		}
	}

	private static ParseCareer(character: Character, careerString: string, termNumber: number, age: number) {
		this.AddLifePath(character, "--------------------------");
		this.AddLifePath(character, "--- Term " + termNumber + " (" + age + " years) ---");
		this.AddLifePath(character, "--------------------------");

		if (careerString.length < 2) {
			throw new Error("Career string must be at least 2 characters long");
		}

		const careerId = parseInt(careerString.slice(0, 2));
		careerString = careerString.slice(2);
		const career = CareersDb.GetCareerById(careerId);

		if (!career) {
			throw new Error("Invalid career ID: " + careerId);
		}
		this.AddLifePath(character, "Career: " + career.Name);

		character.currentCareerId = careerId;
		character.currentStageId = 5;

		if (careerString.length >= 2) {
			character.currentStageId = 6;
			const qualificationCheckRoll = parseInt(careerString.slice(0, 2));
			careerString = careerString.slice(2);
			const diceModifier = this.GetDiceModifier(career.QualificationCheck, character);

			this.AddLifePath(
				character,
				`Qualification roll (${career.QualificationCheck?.CharacteristicsType} ${
					career.QualificationCheck?.TargetValue
				}+): ${qualificationCheckRoll}(roll) + ${diceModifier}(DM) = ${qualificationCheckRoll + diceModifier}`
			);

			if (qualificationCheckRoll + diceModifier >= career.QualificationCheck?.TargetValue) {
				this.AddLifePath(character, "Qualification successful");
			} else {
				this.AddLifePath(character, "Qualification failed");
				return;
			}
		}

		if (careerString.length < 1) {
			return;
		}

		character.currentStageId = 7;
		const assignmentId = parseInt(careerString.slice(0, 1));
		careerString = careerString.slice(1);

		const assignment = career.Assignments.find((a: Assignment) => a.Id === assignmentId);

		if (!assignment) {
			throw new Error("Invalid assignment ID: " + assignmentId);
		}

		this.AddLifePath(character, "Assignment: " + assignment.Name);
		this.AddLifePath(character, "Assignment description: " + assignment.Description);

		character.Terms.push(new Term(termNumber, age, career.Name, true, assignment.Name));

		if (termNumber === 1) {
			this.AddLifePath(character, `First term learn all ${career.Name}'s service skills`);
			const serviceSkillsTrainingTable = career.TrainingTables.find((t: TrainingTable) => t.Id === 2);
			if (serviceSkillsTrainingTable) {
				this.AddRewardsToCharacter(character, serviceSkillsTrainingTable.Rewards, true);
			}
		}

		if (careerString.length < 2) {
			return;
		}

		const trainingTableId = parseInt(careerString.slice(0, 1));
		careerString = careerString.slice(1);
		const trainingTable = career.TrainingTables.find((t: TrainingTable) => t.Id === trainingTableId);

		const trainingRoll = parseInt(careerString.slice(0, 1));
		careerString = careerString.slice(1);

		this.AddLifePath(character, "Training table selected: " + trainingTable?.Name);
		this.AddLifePath(character, "Training rolled: " + trainingRoll);

		if (trainingTable) {
			const reward = trainingTable.Rewards.find((r: Reward) => r.Id === trainingRoll);
			if (!reward) {
				throw new Error("Invalid reward ID: " + trainingRoll);
			}
			this.AddRewardToCharacter(character, reward);
		}

		if (careerString.length < 2) {
			return;
		}

		const survivalRoll = parseInt(careerString.slice(0, 2));
		careerString = careerString.slice(2);
		const survivalModifier = this.GetDiceModifier(assignment.SurvivalCheck, character);

		this.AddLifePath(
			character,
			`Survival roll (${assignment?.SurvivalCheck?.CharacteristicsType} ${
				assignment?.SurvivalCheck?.TargetValue
			}+): ${survivalRoll}(roll) + ${survivalModifier}(DM) = ${survivalRoll + survivalModifier}`
		);

		if (survivalRoll + survivalModifier >= assignment?.SurvivalCheck?.TargetValue) {
			this.AddLifePath(character, "Survival successful");
			character.Terms[character.Terms.length - 1].Survived = true;
		} else {
			this.AddLifePath(character, "Survival failed");
			character.Terms[character.Terms.length - 1].Survived = false;
		}
	}

	public static GetDiceModifier(diceCheck: DiceCheck | null, character: Character): number {
		if (!diceCheck) {
			return 0;
		}

		let characteristicValue = 0;

		if (!character.Characteristics) {
			throw new Error("Characteristics must be rolled before calculating dice modifier");
		}

		switch (diceCheck.CharacteristicsType) {
			case "STR":
				characteristicValue = character.Characteristics.Strength;
				break;
			case "DEX":
				characteristicValue = character.Characteristics.Dexterity;
				break;
			case "END":
				characteristicValue = character.Characteristics.Endurance;
				break;
			case "INT":
				characteristicValue = character.Characteristics.Intellect;
				break;
			case "EDU":
				characteristicValue = character.Characteristics.Education;
				break;
			case "SOC":
				characteristicValue = character.Characteristics.SocialStanding;
				break;
			case "PSI":
				characteristicValue = character.Characteristics.Psionics;
				break;
			case "Automatic":
				return 0;
			case "DEX or INT":
				characteristicValue = Math.max(character.Characteristics.Dexterity, character.Characteristics.Intellect);
				break;

			default:
				throw new Error("Invalid characteristic type: " + diceCheck.CharacteristicsType);
		}

		return this.CalculateDiceModifier(characteristicValue);
	}

	public static CalculateDiceModifier(characteristicValue: number): number {
		if (characteristicValue === 0) {
			return -3;
		}
		if (characteristicValue < 3) {
			return -2;
		}
		if (characteristicValue < 6) {
			return -1;
		}
		if (characteristicValue < 9) {
			return 0;
		}
		if (characteristicValue < 12) {
			return 1;
		}
		if (characteristicValue < 15) {
			return 2;
		}
		if (characteristicValue >= 15) {
			return 3;
		}

		return -3;
	}

	public static AddRewardToCharacter(character: Character, reward: Reward, isLevelZeroOnly = false) {
		if (!reward.Description) {
			return;
		}

		if (reward.Description.includes("+1")) {
			const characteristicName = reward.Description.substring(0, 3);

			if (!character.Characteristics) {
				throw new Error("Characteristics must be rolled before adding rewards");
			}

			this.AddLifePath(character, "Gained: " + reward.Description);

			switch (characteristicName) {
				case "STR":
					character.Characteristics.Strength++;
					break;
				case "DEX":
					character.Characteristics.Dexterity++;
					break;
				case "END":
					character.Characteristics.Endurance++;
					break;
				case "INT":
					character.Characteristics.Intellect++;
					break;
				case "EDU":
					character.Characteristics.Education++;
					break;
				case "SOC":
					character.Characteristics.SocialStanding++;
					break;
				case "PSI":
					character.Characteristics.Psionics++;
					break;
			}
		} else {
			const skillDbRecord = SkillsDb.GetSkillByName(reward.Description);

			if (!skillDbRecord) {
				throw new Error("Invalid skill name: " + reward.Description);
			}

			const existingSkill = character.Skills.find((s: Skill) => s.Name === reward.Description);
			if (existingSkill) {
				if (isLevelZeroOnly) {
					this.AddSkillToCharacter(character, new Skill(skillDbRecord.Name, 0));
				} else {
					this.AddSkillToCharacter(character, new Skill(skillDbRecord.Name, existingSkill.Level + 1));
				}
			} else {
				this.AddSkillToCharacter(character, new Skill(skillDbRecord.Name, 0));
			}
		}
	}

	public static AddRewardsToCharacter(character: Character, rewards: Reward[], isLevelZeroOnly = false) {
		for (const reward of rewards) {
			this.AddRewardToCharacter(character, reward, isLevelZeroOnly);
		}
	}
}
