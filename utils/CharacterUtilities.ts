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
	Event,
	LifeEvents,
	SkillsDb,
	CareersDb,
} from "#imports";
import type { forEachChild } from "typescript";

export class CharacterUtilities {
	public static ParseCharacter(input: CharacterInput): Character {
		const character = new Character(input.Name, input.RaceId, input.HomeWorld, 18);

		this.AddLifePath(character, "### Term 0 (0 - 18 years)");
		if (input.HomeWorld) this.AddLifePath(character, "Grew up on " + input.HomeWorld);

		character.Race.Traits.forEach((raceTrait) => {
			this.AddLifePath(character, "**" + character.Race.Name + " trait:** " + raceTrait);
		});

		character.currentStageId = 2; // Characteristics roll

		// Parse characteristics
		if (!this.ParseCharacteristics(character, input.CharacteristicsString)) return character;

		// Parse background skills
		if (!this.ParseBackgroundSkillsString(character, input.BackgroundSkillsString)) return character;

		if (input.TermsString) {
			this.ParseTerms(input.TermsString, character);
		}

		character.Age = this.calculateAge(character);

		return character;
	}

	private static ParseCharacteristics(character: Character, characteristicsString: string | undefined): boolean {
		if (!characteristicsString || characteristicsString?.length <= 0) return false;

		let characteristics: Characteristics | null = null;
		if (characteristicsString) {
			characteristics = this.ParseCharacteristicsString(characteristicsString);
			character.Characteristics = characteristics;
			this.AddLifePath(character, "**Initial characteristics rolls:** " + (characteristics?.ToString() ?? "No characteristics rolled"));

			// Alter characteristics by race
			if (character.Race.CharacteristicModifiers.Strength != 0) {
				characteristics.Strength += character.Race.CharacteristicModifiers.Strength;
				this.AddLifePath(
					character,
					"**" +
						character.Race.Name +
						" racial Strength:** " +
						(character.Race.CharacteristicModifiers.Strength > 0 ? "+" : "") +
						character.Race.CharacteristicModifiers.Strength,
				);
			}
			if (character.Race.CharacteristicModifiers.Dexterity != 0) {
				characteristics.Dexterity += character.Race.CharacteristicModifiers.Dexterity;
				this.AddLifePath(
					character,
					"**" +
						character.Race.Name +
						" racial Dexterity:** " +
						(character.Race.CharacteristicModifiers.Dexterity > 0 ? "+" : "") +
						character.Race.CharacteristicModifiers.Dexterity,
				);
			}
			if (character.Race.CharacteristicModifiers.Endurance != 0) {
				characteristics.Endurance += character.Race.CharacteristicModifiers.Endurance;
				this.AddLifePath(
					character,
					"**" +
						character.Race.Name +
						" racial Endurance:** " +
						(character.Race.CharacteristicModifiers.Endurance > 0 ? "+" : "") +
						character.Race.CharacteristicModifiers.Endurance,
				);
			}
			if (character.Race.CharacteristicModifiers.Intellect != 0) {
				characteristics.Intellect += character.Race.CharacteristicModifiers.Intellect;
				this.AddLifePath(
					character,
					"**" +
						character.Race.Name +
						" racial Intellect:** " +
						(character.Race.CharacteristicModifiers.Intellect > 0 ? "+" : "") +
						character.Race.CharacteristicModifiers.Intellect,
				);
			}
			if (character.Race.CharacteristicModifiers.Education != 0) {
				characteristics.Education += character.Race.CharacteristicModifiers.Education;
				this.AddLifePath(
					character,
					"**" +
						character.Race.Name +
						" racial Education:** " +
						(character.Race.CharacteristicModifiers.Education > 0 ? "+" : "") +
						character.Race.CharacteristicModifiers.Education,
				);
			}
			if (character.Race.CharacteristicModifiers.SocialStanding != 0) {
				characteristics.SocialStanding += character.Race.CharacteristicModifiers.SocialStanding;
				this.AddLifePath(
					character,
					"**" +
						character.Race.Name +
						" racial Social Standing:** " +
						(character.Race.CharacteristicModifiers.SocialStanding > 0 ? "+" : "") +
						character.Race.CharacteristicModifiers.SocialStanding,
				);
			}
		}

		character.currentStageId = 3; // Background skills
		return true;
	}

	private static ParseBackgroundSkillsString(character: Character, backgroundSkillsString: string | undefined): boolean {
		if (!backgroundSkillsString || backgroundSkillsString?.length <= 0) return false;

		if (backgroundSkillsString) {
			const backgroundSkills = this.ParseBackgroundSkills(backgroundSkillsString);
			this.AddSkillsToCharacter(character, backgroundSkills, false);

			let backgroundLifePath = "**Background skills:** ";
			for (const skill of character.Skills) {
				backgroundLifePath += skill.ToString() + ", ";
			}
			backgroundLifePath = backgroundLifePath.slice(0, -2);
			this.AddLifePath(character, backgroundLifePath);
		}

		character.currentStageId = 4; // Select a career
		return true;
	}

	private static ParseCharacteristicsString(characteristicsString: string): Characteristics {
		if (characteristicsString.length !== 16) {
			throw new Error("Characteristics string must be 16 characters long");
		}

		const strength = parseInt(characteristicsString.substring(0, 2));
		const dexterity = parseInt(characteristicsString.substring(2, 4));
		const endurance = parseInt(characteristicsString.substring(4, 6));
		const intellect = parseInt(characteristicsString.substring(6, 8));
		const education = parseInt(characteristicsString.substring(8, 10));
		const socialStanding = parseInt(characteristicsString.substring(10, 12));
		const psionics = parseInt(characteristicsString.substring(12, 14));
		const reputation = parseInt(characteristicsString.substring(14, 16));

		return new Characteristics(strength, dexterity, endurance, intellect, education, socialStanding, psionics, reputation);
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
		let career: Career | undefined = this.ContinueCareer(character, termNumber, age);
		let assignment: Assignment | undefined = this.ContinueAssignment(character, termNumber);

		if (!career) {
			career = this.ParseCareerSelection(character, termNumber, age, careerString);

			// Qualification roll
			career = this.ParseQualificationRoll(character, career, careerString);

			if (!career) {
				return;
				// throw new Error("Career not found");
			}
			// Select Basic Training
			if (!this.ParseBasicTrainning(character, career, termNumber, careerString)) return;

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
			const eventRoll = this.ParseEventRoll(character, career, careerString);
			if (eventRoll == 0) return;

			if (eventRoll == 7) {
				// Roll on Life Events table
				if (!this.ParseLifeEvents(character, career, careerString)) return;
			}

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

		// Muster out, roll until all benefit rolls are done
		while (this.ParseMusterOut(character, career, careerString));

		// Ageing
		if (!this.ParseAgeing(character, career, careerString)) return;
	}

	private static ContinueCareer(character: Character, termNumber: number, age: number): Career | undefined {
		// check if previous term was survived and no mustering out benefits if so then it is the same career this term
		if (termNumber <= 1) return undefined;

		const previousTerm = character.Terms[termNumber - 2];
		const previousCareerName = character.Terms[termNumber - 2].Career;
		if (previousTerm.Survived && previousTerm.MusterOutBenefits == undefined && previousCareerName != undefined) {
			character.currentStageId = 7; // Select a training table
			this.AddLifePath(character, "### Term " + termNumber + " (" + (age - 4) + " - " + age + " years)");
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
		this.AddLifePath(character, "### Term " + termNumber + " (" + (age - 4) + " - " + age + " years)");
		this.AddLifePath(character, "**Career:** " + career.Name);

		character.Terms.push(new Term(termNumber, age, career.Name));

		character.currentStageId = 5; // Qualification roll
		return career;
	}

	private static ParseQualificationRoll(character: Character, career: Career | undefined, careerString: CareerString): Career | undefined {
		if (!career) {
			return undefined;
		}
		if (careerString.value.length < 2) {
			return undefined;
		}

		const qualificationCheckRoll = parseInt(careerString.value.slice(0, 2));
		careerString.value = careerString.value.slice(2);
		const diceModifier = this.GetDiceModifier(career.QualificationCheck, character);
		const previousCareerCount = this.countPreviousCareers(character);
		let qualificationRollString = `Qualification roll (${career.QualificationCheck?.CharacteristicsType} ${career.QualificationCheck?.TargetValue}+): ${qualificationCheckRoll}(roll) + ${diceModifier}(DM)`;

		if (career.Name == "Bounty Hunter") {
			if (previousCareerCount > 0) {
				qualificationRollString += ` + ${previousCareerCount}(previous careers)`;
			}
			qualificationRollString += ` = ${qualificationCheckRoll + diceModifier + previousCareerCount}`;
		} else {
			if (previousCareerCount > 0) {
				qualificationRollString += ` - ${previousCareerCount}(previous careers)`;
			}
			qualificationRollString += ` = ${qualificationCheckRoll + diceModifier - previousCareerCount}`;
		}
		this.AddLifePath(character, qualificationRollString);

		if (
			qualificationCheckRoll + diceModifier - previousCareerCount * (career.Name == "Bounty Hunter" ? -1 : 1) >=
			career.QualificationCheck?.TargetValue
		) {
			this.AddLifePath(character, "Qualification successful");
			character.currentStageId = 21; // Basic training
			character.Terms[character.Terms.length - 1].Qualified = true;
		} else {
			this.AddLifePath(character, "Qualification failed");
			character.Terms[character.Terms.length - 1].Qualified = false;

			character.currentStageId = 60; // Submit to draft or take Drifter
			this.AddLifePath(character, "Submit to Draft or become a Drifter");

			if (careerString.value.length < 1) {
				return undefined;
			}

			const draftOrDrifter = careerString.value.slice(0, 1);
			careerString.value = careerString.value.slice(1);

			if (draftOrDrifter == "1") {
				this.AddLifePath(character, "Chose to submit to Draft");

				character.currentStageId = 61; // Draft roll
				if (careerString.value.length < 1) {
					return undefined;
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
				character.currentStageId = 21; // Basic training
			} else {
				this.AddLifePath(character, "Chose to become a Drifter");
				career = CareersDb.GetCareerByName("Drifter");
				character.Terms[character.Terms.length - 1].Career = career?.Name;
				character.currentStageId = 21; // Basic training
			}
		}

		return career;
	}

	private static ParseBasicTrainning(character: Character, career: Career, termNumber: Number, careerString: CareerString): boolean {
		if (termNumber === 1) {
			this.AddLifePath(character, `Basic training: First term learn all ${career?.Name}'s service skills`);
			const serviceSkillsTrainingTable = career?.TrainingTables.find((t: TrainingTable) => t.Id === 2);
			if (serviceSkillsTrainingTable) {
				this.AddRewardsToCharacter(character, serviceSkillsTrainingTable.Rewards, true);
			}
			character.currentStageId = 6; // Select assignment
			return true;
		}

		if (careerString.value.length < 1) {
			return false;
		}

		const basicTrainingSelection = parseInt(careerString.value.slice(0, 1));
		careerString.value = careerString.value.slice(1);

		const serviceSkillsTrainingTable = career?.TrainingTables.find((t: TrainingTable) => t.Id === 2);
		if (serviceSkillsTrainingTable) {
			const selectedSkill = serviceSkillsTrainingTable.Rewards[basicTrainingSelection - 1];
			if (!selectedSkill) {
				throw new Error("Invalid basic training ID: " + (basicTrainingSelection - 1));
			}
			this.AddLifePath(character, "Basic training selected: " + selectedSkill.Description);
			this.AddRewardToCharacter(character, selectedSkill, true);
		}

		character.currentStageId = 6; // Select assignment
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

		if (assignment.Ranks) {
			this.AddLifePath(character, "Gained Rank: 0");
			if (assignment.Ranks[0].Title != "") this.AddLifePath(character, "Gained Title: " + assignment.Ranks[0].Title);
			this.AddRewardToCharacter(character, assignment.Ranks[0]);
			character.Terms[character.Terms.length - 1].Rank = assignment.Ranks[0];
		}

		character.currentStageId = 7; // Training table selection
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
			}+): ${survivalRoll}(roll) + ${survivalModifier}(DM) = ${survivalRoll + survivalModifier}`,
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

	private static ParseEventRoll(character: Character, career: Career, careerString: CareerString): number {
		if (careerString.value.length < 2) {
			return 0;
		}

		const eventsRoll = parseInt(careerString.value.slice(0, 2));
		careerString.value = careerString.value.slice(2);

		this.AddLifePath(character, "Event roll: " + eventsRoll);

		const event = career?.Events.find((e) => e.Id == eventsRoll);
		this.AddLifePath(character, "**Event:** " + event?.Description);

		if (eventsRoll == 7) {
			character.currentStageId = 20; // Life events roll
		} else {
			character.currentStageId = 11; // Advancement roll
		}
		return eventsRoll;
	}

	private static ParseLifeEvents(character: Character, career: Career, careerString: CareerString): boolean {
		if (careerString.value.length < 2) {
			return false;
		}

		const lifeEventsRoll = parseInt(careerString.value.slice(0, 2));
		careerString.value = careerString.value.slice(2);

		this.AddLifePath(character, "Life events roll: " + lifeEventsRoll);

		const lifeEvent: Event | undefined = LifeEvents.GetLifeEvents().find((e) => e.Id == lifeEventsRoll);
		if (!lifeEvent) {
			throw new Error("Invalid life events roll: " + lifeEventsRoll);
		}

		this.AddLifePath(character, "Life Event: " + lifeEvent.Description);

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
			}+): ${advancementRoll}(roll) + ${advancementModifier}(DM) = ${advancementRoll + advancementModifier}`,
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
			this.AddLifePath(character, "Chose to continue in the same " + career.Name + " career");
		}

		return true;
	}

	private static ParseMusterOut(character: Character, career: Career, careerString: CareerString): boolean {
		if (careerString.value.slice(0, 1) == "A") {
			return false;
		}

		if (careerString.value.length < 2) {
			return false;
		}

		const cashOrBenefits = careerString.value.slice(0, 1);
		this.AddLifePath(character, "Muster out selection: " + (cashOrBenefits == "1" ? "Cash" : "Benefits"));

		let roll = parseInt(careerString.value.slice(1, 2));
		careerString.value = careerString.value.slice(2);

		let musterOutRollString = "Muster out roll: " + roll;

		if (cashOrBenefits == "1") {
			// Cash
			// Check if character has skill Gambler
			const gamblerSkill = character.Skills.find((s) => s.Name == "Gambler");
			if (gamblerSkill) {
				roll += 1;
				musterOutRollString += " (+1 from Gambler)";
			}
		}

		// Check if rank 5 or 6 in current career
		const currentRank = character.Terms[character.Terms.length - 1].Rank;
		if (currentRank?.Id == 5 || currentRank?.Id == 6) {
			roll += 1;
			musterOutRollString += " (+1 from Rank)";
		}

		if (roll > 7) roll = 7;

		this.AddLifePath(character, musterOutRollString + " = " + roll);

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

	private static ParseAgeing(character: Character, career: Career, careerString: CareerString): boolean {
		if (careerString.value.slice(0, 1) != "A") {
			return true;
		}
		character.currentStageId = 14; // Ageing roll

		if (careerString.value.length < 3) {
			return false;
		}

		const ageRoll = parseInt(careerString.value.slice(1, 3));
		careerString.value = careerString.value.slice(3);

		let ageResult: number = ageRoll;

		ageResult -= character.Terms.length;

		this.AddLifePath(character, "Ageing roll: " + ageRoll + " - " + character.Terms.length + "(total terms)" + " = " + ageResult);
		this.ApplyAgeing(character, ageResult);

		// Check if any characteristics are 0 or less
		if (character.Characteristics) {
			if (character.Characteristics.Strength <= 0) {
				this.AddLifePath(character, "**Ageing Crisis:** Strength 0 or less");
			}
			if (character.Characteristics.Dexterity <= 0) {
				this.AddLifePath(character, "**Ageing Crisis:** Dexterity 0 or less");
			}
			if (character.Characteristics.Endurance <= 0) {
				this.AddLifePath(character, "**Ageing Crisis:** Endurance 0 or less");
			}
			if (character.Characteristics.Intellect <= 0) {
				this.AddLifePath(character, "**Ageing Crisis:** Intellect 0 or less");
			}
			if (character.Characteristics.Education <= 0) {
				this.AddLifePath(character, "**Ageing Crisis:** Education 0 or less");
			}
			if (character.Characteristics.SocialStanding <= 0) {
				this.AddLifePath(character, "**Ageing Crisis:** Social Standing 0 or less");
			}
		}
		return true;
	}

	private static ApplyAgeing(character: Character, ageResult: number) {
		if (ageResult > 0) {
			this.AddLifePath(character, "**Ageing:** has no effect");
			return;
		}

		if (character.Characteristics == undefined) return;

		// Sort the 3 physical characteristics by value
		const physicalCharacteristics = [
			{ name: "Strength", value: character.Characteristics.Strength },
			{ name: "Dexterity", value: character.Characteristics.Dexterity },
			{ name: "Endurance", value: character.Characteristics.Endurance },
		];
		physicalCharacteristics.sort((a, b) => a.value - b.value);

		// Sort the 3 mental characteristics by value
		const mentalCharacteristics = [
			{ name: "Intellect", value: character.Characteristics.Intellect },
			{ name: "Education", value: character.Characteristics.Education },
			{ name: "Social Standing", value: character.Characteristics.SocialStanding },
		];
		mentalCharacteristics.sort((a, b) => a.value - b.value);

		if (ageResult == 0) {
			// Reduce the highst physical characteristic by 1
			const highestPhysicalCharacteristic = physicalCharacteristics[2].name;
			if (highestPhysicalCharacteristic == "Strength") {
				character.Characteristics.Strength--;
			} else if (highestPhysicalCharacteristic == "Dexterity") {
				character.Characteristics.Dexterity--;
			} else if (highestPhysicalCharacteristic == "Endurance") {
				character.Characteristics.Endurance--;
			}

			this.AddLifePath(character, "**Ageing:** -1 " + highestPhysicalCharacteristic);
			return;
		}

		if (ageResult == -1) {
			// Reduce the highest 2 physical characteristic by 1
			const highestPhysicalCharacteristic = physicalCharacteristics[2].name;
			const secondHighestPhysicalCharacteristic = physicalCharacteristics[1].name;
			if (highestPhysicalCharacteristic == "Strength") {
				character.Characteristics.Strength--;
			} else if (highestPhysicalCharacteristic == "Dexterity") {
				character.Characteristics.Dexterity--;
			} else if (highestPhysicalCharacteristic == "Endurance") {
				character.Characteristics.Endurance--;
			}
			if (secondHighestPhysicalCharacteristic == "Strength") {
				character.Characteristics.Strength--;
			} else if (secondHighestPhysicalCharacteristic == "Dexterity") {
				character.Characteristics.Dexterity--;
			} else if (secondHighestPhysicalCharacteristic == "Endurance") {
				character.Characteristics.Endurance--;
			}

			this.AddLifePath(character, "**Ageing:** -1 " + highestPhysicalCharacteristic + ", -1 " + secondHighestPhysicalCharacteristic);
			return;
		}

		if (ageResult == -2) {
			// Reduce all physical characteristics by 1
			character.Characteristics.Strength--;
			character.Characteristics.Dexterity--;
			character.Characteristics.Endurance--;

			this.AddLifePath(character, "**Ageing:** -1 all physical characteristics");

			return;
		}

		if (ageResult == -3) {
			// Reduce highest physical characteristic by 2 and the other two by 1
			const highestPhysicalCharacteristic = physicalCharacteristics[2].name;
			const secondHighestPhysicalCharacteristic = physicalCharacteristics[1].name;
			const lowestPhysicalCharacteristic = physicalCharacteristics[0].name;
			if (highestPhysicalCharacteristic == "Strength") {
				character.Characteristics.Strength -= 2;
			} else if (highestPhysicalCharacteristic == "Dexterity") {
				character.Characteristics.Dexterity -= 2;
			} else if (highestPhysicalCharacteristic == "Endurance") {
				character.Characteristics.Endurance -= 2;
			}

			if (secondHighestPhysicalCharacteristic == "Strength") {
				character.Characteristics.Strength--;
			} else if (secondHighestPhysicalCharacteristic == "Dexterity") {
				character.Characteristics.Dexterity--;
			} else if (secondHighestPhysicalCharacteristic == "Endurance") {
				character.Characteristics.Endurance--;
			}
			if (lowestPhysicalCharacteristic == "Strength") {
				character.Characteristics.Strength--;
			} else if (lowestPhysicalCharacteristic == "Dexterity") {
				character.Characteristics.Dexterity--;
			} else if (lowestPhysicalCharacteristic == "Endurance") {
				character.Characteristics.Endurance--;
			}

			this.AddLifePath(
				character,
				"**Ageing:** -2 " +
					highestPhysicalCharacteristic +
					", -1 " +
					secondHighestPhysicalCharacteristic +
					", -1 " +
					lowestPhysicalCharacteristic,
			);
			return;
		}

		if (ageResult == -4) {
			// Reduce two highest physical characteristics by 2 and the third by 1
			const highestPhysicalCharacteristic = physicalCharacteristics[2].name;
			const secondHighestPhysicalCharacteristic = physicalCharacteristics[1].name;
			const lowestPhysicalCharacteristic = physicalCharacteristics[0].name;

			if (highestPhysicalCharacteristic == "Strength") {
				character.Characteristics.Strength -= 2;
			} else if (highestPhysicalCharacteristic == "Dexterity") {
				character.Characteristics.Dexterity -= 2;
			} else if (highestPhysicalCharacteristic == "Endurance") {
				character.Characteristics.Endurance -= 2;
			}

			if (secondHighestPhysicalCharacteristic == "Strength") {
				character.Characteristics.Strength -= 2;
			} else if (secondHighestPhysicalCharacteristic == "Dexterity") {
				character.Characteristics.Dexterity -= 2;
			} else if (secondHighestPhysicalCharacteristic == "Endurance") {
				character.Characteristics.Endurance -= 2;
			}

			if (lowestPhysicalCharacteristic == "Strength") {
				character.Characteristics.Strength--;
			} else if (lowestPhysicalCharacteristic == "Dexterity") {
				character.Characteristics.Dexterity--;
			} else if (lowestPhysicalCharacteristic == "Endurance") {
				character.Characteristics.Endurance--;
			}

			this.AddLifePath(
				character,
				"**Ageing:** -2 " +
					highestPhysicalCharacteristic +
					", -2 " +
					secondHighestPhysicalCharacteristic +
					", -1 " +
					lowestPhysicalCharacteristic,
			);
			return;
		}

		if (ageResult == -5) {
			// Reduce all physical characteristics by 2
			character.Characteristics.Strength -= 2;
			character.Characteristics.Dexterity -= 2;
			character.Characteristics.Endurance -= 2;

			this.AddLifePath(character, "**Ageing:** -2 all physical characteristics");

			return;
		}

		if (ageResult <= -6) {
			// Reduce all physical characteristics by 2 and highest mental characteristic by 1
			character.Characteristics.Strength -= 2;
			character.Characteristics.Dexterity -= 2;
			character.Characteristics.Endurance -= 2;

			const highestMentalCharacteristic = mentalCharacteristics[2].name;
			if (highestMentalCharacteristic == "Intellect") {
				character.Characteristics.Intellect--;
			} else if (highestMentalCharacteristic == "Education") {
				character.Characteristics.Education--;
			} else if (highestMentalCharacteristic == "Social Standing") {
				character.Characteristics.SocialStanding--;
			}

			this.AddLifePath(character, "**Ageing:** -2 all physical characteristics, -1 " + highestMentalCharacteristic);
			return;
		}
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
			case "REP":
				characteristicValue = character.Characteristics.Reputation;
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

		if (reward.Description.includes(" +1") || reward.Description.includes(" +2")) {
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
				case "REP":
					this.AddLifePath(character, "**Gained:** " + reward.Description);
					character.Characteristics.Reputation++;
					break;
				default:
					throw new Error("Invalid characteristic name: " + reward.Description);
			}
		} else if (reward.Description.includes(" 1") || reward.Description.includes(" 2")) {
			const skillDbRecord = SkillsDb.GetSkillByName(reward.Description.substring(0, reward.Description.length - 2));

			if (!skillDbRecord) {
				throw new Error("Invalid skill name: " + reward.Description);
			}

			const newLevel = parseInt(reward.Description.substring(reward.Description.length - 1));

			const existingSkill = character.Skills.find((s: Skill) => s.Name == reward.Description?.substring(0, reward.Description.length - 2));
			if (existingSkill) {
				if (existingSkill.Level < newLevel) {
					this.AddSkillToCharacter(character, new Skill(skillDbRecord.Name, newLevel));
				} else {
					this.AddLifePath(
						character,
						"**Gained skill:** " + reward.Description + ": " + existingSkill.Level + " (already known " + existingSkill.Level + ")",
					);
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
					this.AddLifePath(
						character,
						"**Gained skill:** " + reward.Description + ": " + existingSkill.Level + " (already known " + existingSkill.Level + ")",
					);
				} else {
					this.AddSkillToCharacter(character, new Skill(skillDbRecord.Name, existingSkill.Level + 1));
				}
			} else {
				if (isLevelZeroOnly) {
					this.AddSkillToCharacter(character, new Skill(skillDbRecord.Name, 0));
				} else {
					this.AddSkillToCharacter(character, new Skill(skillDbRecord.Name, 1));
				}
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

	public static countPreviousCareers = (character: Character): number => {
		let count = 0;
		for (const term of character.Terms) {
			if (term.MusterOutBenefits && term.MusterOutBenefits.length > 0) count++;
		}
		return count;
	};

	public static calculateAge = (character: Character): number => {
		let age = 18;
		for (const term of character.Terms) {
			if (term.Career) age += 4;
		}
		return age;
	};
}

class CareerString {
	value: string;

	constructor(value: string) {
		this.value = value;
	}
}
