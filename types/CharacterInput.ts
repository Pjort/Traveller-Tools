export class CharacterInput {
	Name: string;
	Race: number;
	HomeWorld?: string;
	CharacteristicsString?: string;
	BackgroundSkillsString?: string;
	TermsString?: string;

	constructor(
		name: string = "",
		race: number = 0,
		homeWorld?: string,
		characteristicsString?: string,
		backgroundSkillsString?: string,
		termsString?: string
	) {
		this.Name = name;
		this.Race = race;
		this.HomeWorld = homeWorld;
		this.CharacteristicsString = characteristicsString;
		this.BackgroundSkillsString = backgroundSkillsString;
		this.TermsString = termsString;
	}
}
