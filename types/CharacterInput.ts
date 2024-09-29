export class CharacterInput {
	Name: string;
	RaceId: number;
	HomeWorld?: string;
	CharacteristicsString?: string;
	BackgroundSkillsString?: string;
	TermsString?: string;

	constructor(
		name: string = "",
		raceId: number = 0,
		homeWorld?: string,
		characteristicsString?: string,
		backgroundSkillsString?: string,
		termsString?: string,
	) {
		this.Name = name;
		this.RaceId = raceId;
		this.HomeWorld = homeWorld;
		this.CharacteristicsString = characteristicsString;
		this.BackgroundSkillsString = backgroundSkillsString;
		this.TermsString = termsString;
	}
}
