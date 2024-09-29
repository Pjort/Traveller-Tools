// stores/characterInputStore.ts
import { defineStore } from "pinia";
import { Character, CharacterInput, Skill, Term, Characteristics, Race, Item, Relation, RacesDb } from "#imports";

export const useCharacterStore = defineStore("character", {
	state: () => ({
		character: {
			Name: "",
			Race: new Object() as Race,
			HomeWorld: "",
			Age: 0,
			Characteristics: new Object() as Characteristics,
			LifePath: new Array<string>(),
			Skills: new Array<Skill>(),
			Terms: new Array<Term>(),
			currentStageId: 1,
			Events: new Array<Event>(),
			Mishaps: new Array<Event>(),
			Cash: 0,
			Items: new Array<Item>(),
			Relations: new Array<Relation>(),
		} as Character,
		characterInput: {
			Name: "",
			RaceId: 1,
			HomeWorld: "",
			CharacteristicsString: "",
			BackgroundSkillsString: "",
			TermsString: "",
		} as CharacterInput,
		lastestLifePath: new Array<string>(),
	}),
	actions: {
		reset() {
			this.$patch((state) => {
				state.character = {
					Name: "",
					Race: {} as Race,
					HomeWorld: "",
					Age: 0,
					Characteristics: {} as Characteristics,
					LifePath: [],
					Skills: [],
					Terms: [],
					currentStageId: 1,
					Events: [],
					Mishaps: [],
					Cash: 0,
					Items: [],
					Relations: [],
				};
				state.characterInput = {
					Name: "",
					RaceId: 1,
					HomeWorld: "",
					CharacteristicsString: "",
					BackgroundSkillsString: "",
					TermsString: "",
				};
				state.lastestLifePath = [];
			});
		},
		setCharacterInput(characterInput: CharacterInput) {
			this.characterInput = characterInput;
		},
		updateCharacterInput(
			name: string,
			raceId: number,
			homeWorld: string,
			characteristicsString: string,
			backgroundSkillsString: string,
			termsString: string
		) {
			this.characterInput = {
				Name: name,
				RaceId: raceId,
				HomeWorld: homeWorld,
				CharacteristicsString: characteristicsString,
				BackgroundSkillsString: backgroundSkillsString,
				TermsString: termsString,
			};
		},
		updateHomeWorld(homeWorld: string) {
			this.characterInput.HomeWorld = homeWorld;
		},
		updateName(name: string) {
			this.characterInput.Name = name;
		},
		updateRace(raceId: number) {
			// Parse raceId into a integer
			raceId = parseInt(raceId.toString());
			this.characterInput.RaceId = raceId;
		},
		updateCharacteristicsString(characteristicsString: string) {
			this.characterInput.CharacteristicsString = characteristicsString;
		},
		updateBackgroundSkillsString(backgroundSkillsString: string) {
			this.characterInput.BackgroundSkillsString = backgroundSkillsString;
		},
		updateTermsString(termsString: string) {
			this.characterInput.TermsString = termsString;
		},
		parseCharacter() {
			let character = CharacterUtilities.ParseCharacter(this.characterInput);
			// find the lastest life path, by comparing the current life path with the lastest life path
			let oldLifepathLength = this.character.LifePath.length;
			let newLifepathLength = character.LifePath.length;
			let lastestLifePath = new Array<string>();
			for (let i = oldLifepathLength; i < newLifepathLength; i++) {
				lastestLifePath.push(character.LifePath[i]);
			}
			this.lastestLifePath = lastestLifePath;

			this.character = character;
		},
	},
	getters: {
		getCharacter: (state) => state.character,
		getCharacterInput: (state) => state.characterInput,
		getCurrentStageId: (state) => state.character.currentStageId,
		getCurrentCareer: (state) => {
			try {
				let careerName = state.character.Terms[state.character.Terms.length - 1].Career;
				if (!careerName) return null;
				const career = CareersDb.GetCareerByName(careerName);
				return career;
			} catch (e) {
				return null;
			}
		},
		getCurrentAssignment: (state) => {
			try {
				let assignmentName = state.character.Terms[state.character.Terms.length - 1].Assignment;
				if (!assignmentName) return null;
				let careerName = state.character.Terms[state.character.Terms.length - 1].Career;
				if (!careerName) return null;
				const career = CareersDb.GetCareerByName(careerName);
				if (!career) return null;
				let assignment = career.Assignments.find((a) => a.Name == assignmentName);
				return assignment;
			} catch (e) {
				return null;
			}
		},
		getLastestLifePath: (state) => {
			if (state.character.LifePath.length == state.lastestLifePath.length) return [];
			return state.lastestLifePath;
		},
		getAmountOfBenefitRollsLeft: (state) => {
			let benefitRollsLeft = 0;
			benefitRollsLeft += state.character.Terms.length;

			// Add benefits from each term where the character advanced and go rank 1, 3 or 5
			for (let term of state.character.Terms) {
				if (term.Advanced) {
					if (term.Rank && term.Rank.Id == 1) {
						benefitRollsLeft += 1;
					} else if (term.Rank && term.Rank.Id == 3) {
						benefitRollsLeft += 1;
					} else if (term.Rank && term.Rank.Id == 5) {
						benefitRollsLeft += 1;
					}
				}
			}
			// Reduce by one for each term that wasn't survived
			for (let term of state.character.Terms) {
				if (!term.Survived) {
					benefitRollsLeft -= 1;
				}
			}

			// Reduce the amount of benefit rolls left by the amount of benefits already received
			for (let term of state.character.Terms) {
				if (term.MusterOutBenefits) {
					benefitRollsLeft -= term.MusterOutBenefits.length;
				}
			}
			return benefitRollsLeft;
		},
	},
});
