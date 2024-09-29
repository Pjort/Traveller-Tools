import { Characteristics, Item, Skill, Term, Relation, Race, RacesDb } from "#imports";

export class Character {
	Name: string;
	Race: Race = RacesDb.GetRaceById(1)!; // Default to Human (ID 1)
	HomeWorld?: string;
	Age: number;
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
		raceId: number,
		homeWorld?: string,
		age: number = 0,
		characteristics?: Characteristics,
		lifePath: string[] = [],
		skills: Skill[] = [],
		terms: Term[] = [],
		cash: number = 0,
		items: Item[] = [],
		relations: Relation[] = []
	) {
		this.Name = name;
		this.Race = RacesDb.GetRaceById(raceId) !== undefined ? RacesDb.GetRaceById(raceId)! : this.Race;
		this.HomeWorld = homeWorld;
		this.Age = age;
		this.Characteristics = characteristics;
		this.LifePath = lifePath;
		this.Skills = skills;
		this.Terms = terms;
		this.Cash = cash;
		this.Items = items;
		this.Relations = relations;
	}
}
