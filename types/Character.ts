import { Characteristics, Skill, Term } from "#imports";

export enum Race {
	Human,
	Aslan,
	Vargr,
}

export class Character {
	Name: string;
	Race: Race = Race.Human;
	HomeWorld?: string;
	Age: number;
	Characteristics?: Characteristics;
	LifePath: string[] = [];
	Skills: Skill[] = [];
	Terms: Term[] = [];

	constructor(
		name: string,
		race: Race = Race.Human,
		homeWorld?: string,
		age: number = 0,
		characteristics?: Characteristics,
		lifePath: string[] = [],
		skills: Skill[] = [],
		terms: Term[] = []
	) {
		this.Name = name;
		this.Race = race;
		this.HomeWorld = homeWorld;
		this.Age = age;
		this.Characteristics = characteristics;
		this.LifePath = lifePath;
		this.Skills = skills;
		this.Terms = terms;
	}
}