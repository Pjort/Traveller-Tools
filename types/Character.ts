import { Characteristics, Item, Skill, Term, Relation } from "#imports";

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
	Traits: string[] = [];
	Characteristics?: Characteristics;
	LifePath: string[] = [];
	Skills: Skill[] = [];
	Terms: Term[] = [];
	currentStageId: number = 1;
	Events: Event[] = [];
	Mishaps: Event[] = [];
	Cash: number = 0;
	Items: Item[] = [];
	Relations: Relation[] = [];

	constructor(
		name: string,
		race: Race = Race.Human,
		homeWorld?: string,
		age: number = 0,
		traits: string[] = [],
		characteristics?: Characteristics,
		lifePath: string[] = [],
		skills: Skill[] = [],
		terms: Term[] = [],
		cash: number = 0,
		items: Item[] = [],
		relations: Relation[] = []
	) {
		this.Name = name;
		this.Race = race;
		this.HomeWorld = homeWorld;
		this.Age = age;
		this.Traits = traits;
		this.Characteristics = characteristics;
		this.LifePath = lifePath;
		this.Skills = skills;
		this.Terms = terms;
		this.Cash = cash;
		this.Items = items;
		this.Relations = relations;
	}
}
