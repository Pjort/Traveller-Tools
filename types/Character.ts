import { Characteristics, Item, Skill, Term } from "#imports";

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
	currentStageId: number = 1;
	Cash: number = 0;
	Items: Item[] = [];

	constructor(
		name: string,
		race: Race = Race.Human,
		homeWorld?: string,
		age: number = 0,
		characteristics?: Characteristics,
		lifePath: string[] = [],
		skills: Skill[] = [],
		terms: Term[] = [],
		cash: number = 0,
		items: Item[] = []
	) {
		this.Name = name;
		this.Race = race;
		this.HomeWorld = homeWorld;
		this.Age = age;
		this.Characteristics = characteristics;
		this.LifePath = lifePath;
		this.Skills = skills;
		this.Terms = terms;
		this.Cash = cash;
		this.Items = items;
	}
}
