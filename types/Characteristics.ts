export class Characteristics {
	Strength: number;
	Dexterity: number;
	Endurance: number;
	Intellect: number;
	Education: number;
	SocialStanding: number;
	Psionics: number;

	constructor(
		strength: number = 0,
		dexterity: number = 0,
		endurance: number = 0,
		intellect: number = 0,
		education: number = 0,
		socialStanding: number = 0,
		psionics: number = 0
	) {
		this.Strength = strength;
		this.Dexterity = dexterity;
		this.Endurance = endurance;
		this.Intellect = intellect;
		this.Education = education;
		this.SocialStanding = socialStanding;
		this.Psionics = psionics;
	}

	ToString(): string {
		return `Strength: ${this.Strength}, Dexterity: ${this.Dexterity}, Endurance: ${this.Endurance}, Intellect: ${this.Intellect}, Education: ${this.Education}, Social Standing: ${this.SocialStanding}, Psionics: ${this.Psionics}`;
	}

	ToParsingString(): string {
		return `${this.Strength.toString().padStart(2, "0")}${this.Dexterity.toString().padStart(
			2,
			"0"
		)}${this.Endurance.toString().padStart(2, "0")}${this.Intellect.toString().padStart(
			2,
			"0"
		)}${this.Education.toString().padStart(2, "0")}${this.SocialStanding.toString().padStart(
			2,
			"0"
		)}${this.Psionics.toString().padStart(2, "0")}`;
	}
}
