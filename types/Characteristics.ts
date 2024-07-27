export class Characteristics {
	Strength: number;
	Dexterity: number;
	Endurance: number;
	Intellect: number;
	Education: number;
	SocialStanding: number;
	Psionics: number;

	constructor(
		strength: number,
		dexterity: number,
		endurance: number,
		intellect: number,
		education: number,
		socialStanding: number,
		psionics: number
	) {
		this.Strength = strength;
		this.Dexterity = dexterity;
		this.Endurance = endurance;
		this.Intellect = intellect;
		this.Education = education;
		this.SocialStanding = socialStanding;
		this.Psionics = psionics;
	}

	toString(): string {
		return `Strength: ${this.Strength}, Dexterity: ${this.Dexterity}, Endurance: ${this.Endurance}, Intellect: ${this.Intellect}, Education: ${this.Education}, Social Standing: ${this.SocialStanding}, Psionics: ${this.Psionics}`;
	}
}
