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
	Career,
	MusterOutRecord,
	Item,
	Relation,
} from "#imports";
import { SkillsDb, CareersDb } from "#imports";

export class CharacterUtilities {
	public static ParseCharacter(input: CharacterInput): Character {
		const character = new Character(input.Name, input.Race, input.HomeWorld, 18);

		this.AddLifePath(character, "### Term 0 (0 - 18 years)");
		if (input.HomeWorld) this.AddLifePath(character, "Grew up on " + input.HomeWorld);

		character.currentStageId = 2; // Characteristics roll

		// Parse characteristics
		if (!this.ParseCharacteristics(character, input.CharacteristicsString)) return character;

		// Parse background skills
		if (!this.ParseBackgroundSkillsString(character, input.BackgroundSkillsString)) return character;

		if (input.TermsString) {
			this.ParseTerms(input.TermsString, character);
		}

		return character;
	}

	private static ParseCharacteristics(character: Character, characteristicsString: string | undefined): boolean {
		let characteristics: Characteristics | null = null;
		if (characteristicsString) {
			characteristics = this.ParseCharacteristicsString(characteristicsString);
			character.Characteristics = characteristics;
			this.AddLifePath(character, "**Initial characteristics rolls:** " + (characteristics?.ToString() ?? "No characteristics rolled"));

			// Alter characteristics by race
			if (character.Race == Race.Aslan) {
				character.Characteristics.Strength += 2;
				character.Characteristics.Dexterity -= 2;
				this.AddLifePath(character, "Aslan racial characteristics: +2 Strength, -2 Dexterity");
				character.Traits.push("**Dewclaws:** 1D+2 damage - Melee (Natural)");
				character.Traits.push("**Heightened Senses:** +1 DM to any Recon and Survival checks");
				this.AddLifePath(character, "Aslan traits: Dewclaws, Heightened Senses");
			}
			if (character.Race == Race.Vargr) {
				character.Characteristics.Strength -= 1;
				character.Characteristics.Dexterity += 1;
				character.Characteristics.Endurance -= 1;
				this.AddLifePath(character, "Vargr racial characteristics: -1 Strength, +1 Dexterity, -1 Endurance");
				character.Traits.push("**Bite:** 1D+1 damage - Melee (Natural)");
				character.Traits.push("**Heightened Senses:** +1 DM to any Recon and Survival checks, but -1 DM in darkness");
				this.AddLifePath(character, "Vargr traits: Bite, Heightened Senses");
			}
		} else {
			return false;
		}

		character.currentStageId = 3; // Background skills
		return true;
	}

	private static ParseBackgroundSkillsString(character: Character, backgroundSkillsString: string | undefined): boolean {
		if (backgroundSkillsString) {
			const backgroundSkills = this.ParseBackgroundSkills(backgroundSkillsString);
			this.AddSkillsToCharacter(character, backgroundSkills, false);

			let backgroundLifePath = "**Background skills:** ";
			for (const skill of character.Skills) {
				backgroundLifePath += skill.ToString() + ", ";
			}
			backgroundLifePath = backgroundLifePath.slice(0, -2);
			this.AddLifePath(character, backgroundLifePath);
		} else {
			return false;
		}

		character.currentStageId = 4; // Select a career
		return true;
	}

	private static ParseCharacteristicsString(characteristicsString: string): Characteristics {
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

	private static ParseBackgroundSkills(backgroundSkillsString: string): Skill[] {
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

	private static AddLifePath(character: Character, lifePath: string) {
		character.LifePath.push(lifePath);
	}

	private static AddSkillToCharacter(character: Character, skill: Skill, addToLifePath = true) {
		const existingSkill = character.Skills.find((s: Skill) => s.Name === skill.Name);

		if (existingSkill) {
			if (skill.Level > existingSkill.Level) {
				existingSkill.Level = skill.Level;
				if (addToLifePath) {
					this.AddLifePath(character, "**Gained skill:** " + skill.ToString() + " (+1)");
				}
			} else {
				if (addToLifePath) {
					this.AddLifePath(character, "**Gained skill:** " + skill.ToString() + " (already known)");
				}
			}
		} else {
			character.Skills.push(skill);
			if (addToLifePath) {
				this.AddLifePath(character, "**Gained skill:** " + skill.ToString());
			}
		}

		this.SortCharacterSkills(character);
	}

	private static AddSkillsToCharacter(character: Character, skills: Skill[], addToLifePath = true) {
		for (const skill of skills) {
			this.AddSkillToCharacter(character, skill, addToLifePath);
		}
	}

	private static SortCharacterSkills(character: Character) {
		character.Skills.sort((s1: Skill, s2: Skill) => s1.Name.localeCompare(s2.Name));
	}

	private static ParseTerms(termString: string, character: Character) {
		const terms = termString.split("NT");

		for (let i = 0; i < terms.length; i++) {
			const careerString: CareerString = new CareerString(terms[i]);
			const termNumber = i + 1;
			const age = termNumber * 4 + 18;
			character.Age = age;
			character.currentStageId = 4; // Select a career
			this.ParseCareer(character, careerString, termNumber, age);
		}
	}

	private static ParseCareer(character: Character, careerString: CareerString, termNumber: number, age: number) {
		this.AddLifePath(character, "### Term " + termNumber + " (" + (age - 4) + " - " + age + " years)");

		let career: Career | undefined = this.ContinueCareer(character, termNumber, age);
		let assignment: Assignment | undefined = this.ContinueAssignment(character, termNumber);

		if (!career) {
			career = this.ParseCareerSelection(character, termNumber, age, careerString);
			if (!career) {
				return;
			}

			// Qualification roll
			if (!this.ParseQualificationRoll(character, career, careerString)) return;

			if (!career) {
				throw new Error("Career not found");
			}

			// Select Assignment
			assignment = this.ParseAssignment(character, career, termNumber, careerString);
		}

		if (!assignment) {
			return;
		}

		// Select training table
		const trainingTable = this.ParseTrainingTable(character, career, careerString);
		if (!trainingTable) return;

		// Roll on training table
		if (!this.ParseTrainingTableRoll(character, trainingTable, careerString)) return;

		// Survival check
		if (!this.ParseSurvivalCheck(character, assignment, careerString)) return;

		if (character.Terms[character.Terms.length - 1].Survived == false) {
			// Mishap roll
			if (!this.ParseMishapRoll(character, career, careerString)) return;
		} else {
			// Event roll
			if (!this.ParseEventRoll(character, career, careerString)) return;

			// Advancement roll
			if (!this.ParseAdvancementRoll(character, assignment, careerString)) return;

			if (character.Terms[character.Terms.length - 1].Advanced == true) {
				// Select training table
				const trainingTable = this.ParseTrainingTable(character, career, careerString);
				if (!trainingTable) return;

				// Roll on training table
				if (!this.ParseTrainingTableRoll(character, trainingTable, careerString)) return;
			}

			// Muster out or continue
			if (!this.ParseMusterOutOrContinue(character, career, careerString)) return;
		}

		// Muster out
		while (this.ParseMusterOut(character, career, careerString));
	}

	private static ContinueCareer(character: Character, termNumber: number, age: number): Career | undefined {
		// check if previous term was survived and no mustering out benefits if so then it is the same career this term
		if (termNumber <= 1) return undefined;

		const previousTerm = character.Terms[termNumber - 2];
		const previousCareerName = character.Terms[termNumber - 2].Career;
		if (previousTerm.Survived && previousTerm.MusterOutBenefits == undefined && previousCareerName != undefined) {
			character.currentStageId = 7; // Select a training table
			this.AddLifePath(character, "Stayed in the same career");
			this.AddLifePath(character, "**Career:** " + previousCareerName);
			character.Terms.push(new Term(termNumber, age, previousCareerName));
			return CareersDb.GetCareerByName(previousCareerName);
		}

		return undefined;
	}

	private static ContinueAssignment(character: Character, termNumber: number): Assignment | undefined {
		// check if previous term was survived and no mustering out benefits if so then it is the same assignment this term
		if (termNumber <= 1) return undefined;

		const previousTerm = character.Terms[termNumber - 2];
		const previousCareerName = character.Terms[termNumber - 2].Career;
		const previousAssignmentName = character.Terms[termNumber - 2].Assignment;
		if (
			previousTerm.Survived &&
			previousTerm.MusterOutBenefits == undefined &&
			previousCareerName != undefined &&
			previousAssignmentName != undefined
		) {
			const career = CareersDb.GetCareerByName(previousCareerName);
			if (career) {
				character.Terms[character.Terms.length - 1].Assignment = previousAssignmentName;
				character.Terms[character.Terms.length - 1].Rank = previousTerm.Rank;
				this.AddLifePath(character, "**Assignment:** " + previousAssignmentName);
				return career.Assignments.find((a: Assignment) => a.Name === previousAssignmentName);
			}
		}

		return undefined;
	}

	private static ParseCareerSelection(character: Character, termNumber: number, age: number, careerString: CareerString): Career | undefined {
		if (careerString.value.length < 2) {
			return;
		}

		const careerId = parseInt(careerString.value.slice(0, 2));
		careerString.value = careerString.value.slice(2);
		const career = CareersDb.GetCareerById(careerId);

		if (!career) {
			throw new Error("Invalid career ID: " + careerId);
		}
		this.AddLifePath(character, "**Career:** " + career.Name);

		character.Terms.push(new Term(termNumber, age, career.Name));

		character.currentStageId = 5; // Qualification roll
		return career;
	}

	private static ParseQualificationRoll(character: Character, career: Career | undefined, careerString: CareerString): boolean {
		if (!career) {
			return false;
		}
		if (careerString.value.length >= 2) {
			const qualificationCheckRoll = parseInt(careerString.value.slice(0, 2));
			careerString.value = careerString.value.slice(2);
			const diceModifier = this.GetDiceModifier(career.QualificationCheck, character);

			this.AddLifePath(
				character,
				`Qualification roll (${career.QualificationCheck?.CharacteristicsType} ${
					career.QualificationCheck?.TargetValue
				}+): ${qualificationCheckRoll}(roll) + ${diceModifier}(DM) = ${qualificationCheckRoll + diceModifier}`
			);

			if (qualificationCheckRoll + diceModifier >= career.QualificationCheck?.TargetValue) {
				this.AddLifePath(character, "Qualification successful");
				character.currentStageId = 6; // Select an assignment
				character.Terms[character.Terms.length - 1].Qualified = true;
			} else {
				this.AddLifePath(character, "Qualification failed");
				character.Terms[character.Terms.length - 1].Qualified = false;

				character.currentStageId = 60; // Submit to draft or take Drifter
				this.AddLifePath(character, "Submit to Draft or become a Drifter");

				if (careerString.value.length < 1) {
					return false;
				}

				const draftOrDrifter = careerString.value.slice(0, 1);
				careerString.value = careerString.value.slice(1);

				if (draftOrDrifter == "1") {
					this.AddLifePath(character, "Chose to submit to Draft");

					character.currentStageId = 61; // Draft roll
					if (careerString.value.length < 1) {
						return false;
					}

					const roolForDraft = careerString.value.slice(0, 1);
					careerString.value = careerString.value.slice(1);

					this.AddLifePath(character, "Draft roll: " + roolForDraft);
					if (roolForDraft == "1") {
						career = CareersDb.GetCareerByName("Navy");
					} else if (roolForDraft == "2") {
						career = CareersDb.GetCareerByName("Army");
					} else if (roolForDraft == "3") {
						career = CareersDb.GetCareerByName("Marine");
					} else if (roolForDraft == "4") {
						career = CareersDb.GetCareerByName("Merchant");
					} else if (roolForDraft == "5") {
						career = CareersDb.GetCareerByName("Scout");
					} else if (roolForDraft == "6") {
						career = CareersDb.GetCareerByName("Agent");
					} else {
						throw new Error("Invalid draft roll: " + roolForDraft);
					}

					this.AddLifePath(character, "Drafted into: " + career?.Name);
					character.Terms[character.Terms.length - 1].Career = career?.Name;
					character.currentStageId = 6; // Select an assignment
				} else {
					this.AddLifePath(character, "Chose to become a Drifter");
					career = CareersDb.GetCareerByName("Drifter");
					character.Terms[character.Terms.length - 1].Career = career?.Name;
					character.currentStageId = 6; // Select an assignment
				}
			}
		}
		return true;
	}

	private static ParseAssignment(character: Character, career: Career, termNumber: number, careerString: CareerString): Assignment | undefined {
		if (careerString.value.length < 1) {
			return;
		}

		const assignmentId = parseInt(careerString.value.slice(0, 1));
		careerString.value = careerString.value.slice(1);

		const assignment = career?.Assignments.find((a: Assignment) => a.Id === assignmentId);

		if (!assignment) {
			throw new Error("Invalid assignment ID: " + assignmentId);
		}

		this.AddLifePath(character, "**Assignment:** " + assignment.Name);
		this.AddLifePath(character, "Assignment description: " + assignment.Description);
		character.Terms[character.Terms.length - 1].Assignment = assignment.Name;

		if (termNumber === 1) {
			this.AddLifePath(character, `First term learn all ${career?.Name}'s service skills`);
			const serviceSkillsTrainingTable = career?.TrainingTables.find((t: TrainingTable) => t.Id === 2);
			if (serviceSkillsTrainingTable) {
				this.AddRewardsToCharacter(character, serviceSkillsTrainingTable.Rewards, true);
			}
		}

		character.currentStageId = 7; // Select a training table
		return assignment;
	}

	private static ParseTrainingTable(character: Character, career: Career, careerString: CareerString): TrainingTable | undefined {
		if (careerString.value.length < 1) {
			return undefined;
		}

		const trainingTableId = parseInt(careerString.value.slice(0, 1));
		careerString.value = careerString.value.slice(1);

		const trainingTable = career?.TrainingTables.find((t: TrainingTable) => t.Id === trainingTableId);
		this.AddLifePath(character, "Training table selected: " + trainingTable?.Name);

		character.currentStageId = 8; // Roll on training table
		return trainingTable;
	}

	private static ParseTrainingTableRoll(character: Character, trainingTable: TrainingTable, careerString: CareerString): boolean {
		if (careerString.value.length < 1) {
			return false;
		}
		const trainingRoll = parseInt(careerString.value.slice(0, 1));
		careerString.value = careerString.value.slice(1);

		this.AddLifePath(character, "Training table roll: " + trainingRoll);

		if (trainingTable) {
			const reward = trainingTable.Rewards.find((r: Reward) => r.Id === trainingRoll);
			if (!reward) {
				throw new Error("Invalid reward ID: " + trainingRoll);
			}
			this.AddRewardToCharacter(character, reward);
		}

		if (character.Terms[character.Terms.length - 1].Advanced == true) {
			character.currentStageId = 12; // Muster out or not
		} else {
			character.currentStageId = 9; // Survival check
		}
		return true;
	}

	private static ParseSurvivalCheck(character: Character, assignment: Assignment, careerString: CareerString): boolean {
		if (careerString.value.length < 2) {
			return false;
		}

		const survivalRoll = parseInt(careerString.value.slice(0, 2));
		careerString.value = careerString.value.slice(2);
		const survivalModifier = this.GetDiceModifier(assignment.SurvivalCheck, character);

		this.AddLifePath(
			character,
			`Survival roll (${assignment.SurvivalCheck?.CharacteristicsType} ${
				assignment.SurvivalCheck?.TargetValue
			}+): ${survivalRoll}(roll) + ${survivalModifier}(DM) = ${survivalRoll + survivalModifier}`
		);

		if (survivalRoll + survivalModifier >= assignment?.SurvivalCheck?.TargetValue) {
			this.AddLifePath(character, "Survival successful");
			character.currentStageId = 10; // Event roll
			character.Terms[character.Terms.length - 1].Survived = true;
		} else {
			this.AddLifePath(character, "Survival failed");
			character.currentStageId = 65; // Mishap roll
			character.Terms[character.Terms.length - 1].Survived = false;
		}

		return true;
	}

	private static ParseEventRoll(character: Character, career: Career, careerString: CareerString): boolean {
		if (careerString.value.length < 2) {
			return false;
		}

		const eventsRoll = parseInt(careerString.value.slice(0, 2));
		careerString.value = careerString.value.slice(2);

		this.AddLifePath(character, "Event roll: " + eventsRoll);

		const event = career?.Events.find((e) => e.Id == eventsRoll);
		this.AddLifePath(character, "**Event:** " + event?.Description);

		character.currentStageId = 11; // Advancement roll
		return true;
	}

	private static ParseMishapRoll(character: Character, career: Career, careerString: CareerString): boolean {
		if (careerString.value.length < 1) {
			return false;
		}

		const mishapRoll = parseInt(careerString.value.slice(0, 1));
		careerString.value = careerString.value.slice(1);

		this.AddLifePath(character, "Mishap roll: " + mishapRoll);

		const mishap = career?.Mishaps.find((m) => m.Id == mishapRoll);
		if (!mishap) {
			throw new Error("Invalid mishap roll: " + mishapRoll);
		}

		this.AddLifePath(character, "**Mishap:** " + mishap.Description);
		character.currentStageId = 13; // Muster out
		return true;
	}

	private static ParseAdvancementRoll(character: Character, assignment: Assignment, careerString: CareerString): boolean {
		if (careerString.value.length < 2) {
			return false;
		}

		const advancementRoll = parseInt(careerString.value.slice(0, 2));
		careerString.value = careerString.value.slice(2);
		const advancementModifier = this.GetDiceModifier(assignment.AdvancementCheck, character);

		this.AddLifePath(
			character,
			`Advancement roll (${assignment.AdvancementCheck?.CharacteristicsType} ${
				assignment.AdvancementCheck?.TargetValue
			}+): ${advancementRoll}(roll) + ${advancementModifier}(DM) = ${advancementRoll + advancementModifier}`
		);

		let currentRank: number = character.Terms[character.Terms.length - 1].Rank?.Id ?? 0;
		if (advancementRoll + advancementModifier >= assignment.AdvancementCheck?.TargetValue) {
			if (currentRank < 6) currentRank++;
			this.AddLifePath(character, "Advancement successful");
			if (assignment.Ranks) {
				this.AddLifePath(character, "Gained Rank: " + currentRank);
				if (assignment.Ranks[currentRank].Title != "") this.AddLifePath(character, "Gained Title: " + assignment.Ranks[currentRank].Title);
				this.AddRewardToCharacter(character, assignment.Ranks[currentRank]);
				character.Terms[character.Terms.length - 1].Rank = assignment.Ranks[currentRank];
			}
			character.Terms[character.Terms.length - 1].Advanced = true;
			character.currentStageId = 7; // Training table selection, for extra training because of advancement
		} else {
			this.AddLifePath(character, "Advancement failed");
			character.Terms[character.Terms.length - 1].Advanced = false;
			character.currentStageId = 12; // Muster out or not
		}

		return true;
	}

	private static ParseMusterOutOrContinue(character: Character, career: Career, careerString: CareerString): boolean {
		if (careerString.value.length < 1) {
			return false;
		}

		const musterOutOrContinue = careerString.value.slice(0, 1);
		careerString.value = careerString.value.slice(1);

		if (musterOutOrContinue == "2") {
			this.AddLifePath(character, "Chose to muster out");
			character.currentStageId = 13; // Muster out
		} else {
			this.AddLifePath(character, "Chose to continue");
		}

		return true;
	}

	private static ParseMusterOut(character: Character, career: Career, careerString: CareerString): boolean {
		if (careerString.value.length < 2) {
			return false;
		}

		const cashOrBenefits = careerString.value.slice(0, 1);
		this.AddLifePath(character, "Muster out selection: " + (cashOrBenefits == "1" ? "Cash" : "Benefits"));

		const roll = parseInt(careerString.value.slice(1, 2));
		careerString.value = careerString.value.slice(2);

		this.AddLifePath(character, "Muster out roll: " + roll);

		const musterOutRecord = career.MusterOutTable.find((m: MusterOutRecord) => m.Id == roll);
		if (!musterOutRecord) {
			throw new Error("Invalid muster out roll: " + roll);
		}

		if (character.Terms[character.Terms.length - 1].MusterOutBenefits == undefined) {
			character.Terms[character.Terms.length - 1].MusterOutBenefits = [];
		}

		if (cashOrBenefits == "1") {
			// Cash
			this.AddLifePath(character, "**Muster out:** Cr" + musterOutRecord.Cash);
			character.Cash += musterOutRecord.Cash;
			character.Terms[character.Terms.length - 1].MusterOutBenefits?.push("Cr" + musterOutRecord.Cash.toString());
		} else {
			// Benefits
			this.AddRewardsToCharacter(character, musterOutRecord.Benefits);
			character.Terms[character.Terms.length - 1].MusterOutBenefits?.push(musterOutRecord.Benefits.map((b) => b.Description).join(", "));
		}

		return true;
	}

	private static GetDiceModifier(diceCheck: DiceCheck | null, character: Character): number {
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

	private static CalculateDiceModifier(characteristicValue: number): number {
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

	private static AddRewardToCharacter(character: Character, reward: Reward | Item | Relation, isLevelZeroOnly = false) {
		if (!reward.Description) {
			return;
		}

		// Check if reward is type Item
		if (reward instanceof Item) {
			this.AddLifePath(character, "**Gained item:** " + reward.Description);
			character.Items.push(reward);
			return;
		}

		// Check if reward is type Relation
		if (reward instanceof Relation) {
			reward.TermNumber = character.Terms[character.Terms.length - 1].Number;
			this.AddLifePath(character, "**Gained relation:** " + reward.Description);
			character.Relations.push(reward);
			return;
		}

		if (reward.Description.includes(" +1")) {
			const characteristicName = reward.Description.substring(0, 3);

			if (!character.Characteristics) {
				throw new Error("Characteristics must be rolled before adding rewards");
			}

			switch (characteristicName) {
				case "STR":
					this.AddLifePath(character, "**Gained:** " + reward.Description);
					character.Characteristics.Strength++;
					break;
				case "DEX":
					this.AddLifePath(character, "**Gained:** " + reward.Description);
					character.Characteristics.Dexterity++;
					break;
				case "END":
					this.AddLifePath(character, "**Gained:** " + reward.Description);
					character.Characteristics.Endurance++;
					break;
				case "INT":
					this.AddLifePath(character, "**Gained:** " + reward.Description);
					character.Characteristics.Intellect++;
					break;
				case "EDU":
					this.AddLifePath(character, "**Gained:** " + reward.Description);
					character.Characteristics.Education++;
					break;
				case "SOC":
					this.AddLifePath(character, "**Gained:** " + reward.Description);
					character.Characteristics.SocialStanding++;
					break;
				case "PSI":
					this.AddLifePath(character, "**Gained:** " + reward.Description);
					character.Characteristics.Psionics++;
					break;
				default:
					throw new Error("Invalid characteristic name: " + reward.Description);
			}
		} else if (reward.Description.includes(" 1")) {
			const skillDbRecord = SkillsDb.GetSkillByName(reward.Description.substring(0, reward.Description.length - 2));

			if (!skillDbRecord) {
				throw new Error("Invalid skill name: " + reward.Description);
			}

			const existingSkill = character.Skills.find((s: Skill) => s.Name == reward.Description?.substring(0, reward.Description.length - 2));
			if (existingSkill) {
				if (existingSkill.Level < 1) {
					this.AddSkillToCharacter(character, new Skill(skillDbRecord.Name, 1));
				} else {
					this.AddLifePath(character, "**Gained:** " + reward.Description + " (already known " + existingSkill.Level + ")");
				}
			} else {
				this.AddSkillToCharacter(character, new Skill(skillDbRecord.Name, 1));
			}
		} else {
			const skillDbRecord = SkillsDb.GetSkillByName(reward.Description);

			if (!skillDbRecord) {
				throw new Error("Invalid skill name: " + reward.Description);
			}

			const existingSkill = character.Skills.find((s: Skill) => s.Name == reward.Description);
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

	private static AddRewardsToCharacter(character: Character, rewards: Reward[], isLevelZeroOnly = false) {
		for (const reward of rewards) {
			this.AddRewardToCharacter(character, reward, isLevelZeroOnly);
		}
	}

	public static calculateDiceModifier = (value: number): number => {
		// 0 is -3
		// 1-2 is -2
		// 3-5 is -1
		// 6-8 is 0
		// 9-11 is +1
		// 12-14 is +2
		// 15+ is +3

		if (value <= 0) return -3;
		if (value <= 2) return -2;
		if (value <= 5) return -1;
		if (value <= 8) return 0;
		if (value <= 11) return 1;
		if (value <= 14) return 2;
		if (value <= 17) return 3;
		if (value <= 20) return 4;
		if (value <= 23) return 5;

		return -3;
	};

	public static createDiceModifierString = (value: number): string => {
		const modifier = this.calculateDiceModifier(value);
		if (modifier > 0) return `+${modifier}`;
		return modifier.toString();
	};
}

class CareerString {
	value: string;

	constructor(value: string) {
		this.value = value;
	}
}
