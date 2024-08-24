// stores/characterInputStore.ts
import { defineStore } from "pinia";
import { Character, CharacterInput, Skill, Term, Characteristics, Race, Item } from "#imports";

export const useCharacterStore = defineStore("character", {
	state: () => ({
		character: {
			Name: "",
			Race: Race.Human,
			HomeWorld: "",
			Age: 0,
			Traits: new Array<string>(),
			Characteristics: new Object() as Characteristics,
			LifePath: new Array<string>(),
			Skills: new Array<Skill>(),
			Terms: new Array<Term>(),
			currentStageId: 1,
			Events: new Array<Event>(),
			Mishaps: new Array<Event>(),
			Cash: 0,
			Items: new Array<Item>(),
		} as Character,
		characterInput: {
			Name: "",
			Race: Race.Human,
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
					Race: Race.Human,
					HomeWorld: "",
					Age: 0,
					Traits: [],
					Characteristics: {} as Characteristics,
					LifePath: [],
					Skills: [],
					Terms: [],
					currentStageId: 1,
					Events: [],
					Mishaps: [],
					Cash: 0,
					Items: [],
				};
				state.characterInput = {
					Name: "",
					Race: Race.Human,
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
			race: number,
			homeWorld: string,
			characteristicsString: string,
			backgroundSkillsString: string,
			termsString: string
		) {
			this.characterInput = {
				Name: name,
				Race: race,
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
		updateRace(race: number) {
			this.characterInput.Race = race;
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
			let careerName = state.character.Terms[state.character.Terms.length - 1].Career;
			if (!careerName) return null;
			const career = CareersDb.GetCareerByName(careerName);
			return career;
		},
		getCurrentAssignment: (state) => {
			let assignmentName = state.character.Terms[state.character.Terms.length - 1].Assignment;
			if (!assignmentName) return null;
			let careerName = state.character.Terms[state.character.Terms.length - 1].Career;
			if (!careerName) return null;
			const career = CareersDb.GetCareerByName(careerName);
			if (!career) return null;
			let assignment = career.Assignments.find((a) => a.Name == assignmentName);
			return assignment;
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

			// reduce the amount of benefit rolls left by the amount of benefits already received
			for (let term of state.character.Terms) {
				if (term.MusterOutBenefits) {
					benefitRollsLeft -= term.MusterOutBenefits.length;
				}
			}
			return benefitRollsLeft;
		},
	},
});
