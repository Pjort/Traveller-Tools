// stores/characterInputStore.ts
import { defineStore } from "pinia";
import { Character, CharacterInput, Skill, Term, Characteristics, Race } from "#imports";

export const useCharacterStore = defineStore("character", {
	state: () => ({
		character: {
			Name: "",
			Race: Race.Human,
			HomeWorld: "",
			Age: 0,
			Characteristics: new Object() as Characteristics,
			LifePath: new Array<string>(),
			Skills: new Array<Skill>(),
			Terms: new Array<Term>(),
			currentStageId: 1,
			currentCareerId: 0,
		} as Character,
		characterInput: {
			Name: "",
			Race: Race.Human,
			HomeWorld: "",
			CharacteristicsString: "",
			BackgroundSkillsString: "",
			TermsString: "",
		} as CharacterInput,
	}),
	actions: {
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
			this.character = CharacterUtilities.ParseCharacter(this.characterInput);
		},
	},
	getters: {
		getCharacter: (state) => state.character,
		getCharacterInput: (state) => state.characterInput,
		getCurrentStageId: (state) => state.character.currentStageId,
		getCurrentCareer: (state) => {
			const career = CareersDb.GetCareerById(state.character.currentCareerId);
			return career;
		},
	},
});
