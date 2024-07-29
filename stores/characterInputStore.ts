// stores/characterInputStore.ts
import { defineStore } from "pinia";
import { CharacterInput } from "#imports";

export const useCharacterInputStore = defineStore("characterInput", {
	state: () => ({
		characterInput: {
			Name: "",
			Race: 0,
			HomeWorld: "",
			CharacteristicsString: "",
			BackgroundSkillsString: "",
			TermsString: "",
		} as CharacterInput,
	}),
	actions: {
		setCharacter(characterInput: CharacterInput) {
			this.characterInput = characterInput;
		},
		updateCharacter(
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
	},
	getters: {
		getCharacterInput: (state) => state.characterInput,
	},
});
