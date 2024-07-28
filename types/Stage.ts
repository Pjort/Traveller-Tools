import { Choice } from "#imports";

export class Stage {
	Id: number;
	Title: string;
	Choices: Choice[];

	constructor(id: number, title: string, choices: Choice[] = []) {
		this.Id = id;
		this.Title = title;
		this.Choices = choices;
	}
}
