import { Characteristics } from "#imports";

export class Race {
	Id: number;
	Name: string;
	Description: string;
	Traits: string[];
	CharacteristicModifiers: Characteristics = new Characteristics();

	constructor(
		id: number,
		name: string,
		description: string,
		traits: string[] = [],
		characteristicModifiers: Characteristics = new Characteristics(),
	) {
		this.Id = id;
		this.Name = name;
		this.Description = description;
		this.Traits = traits;
		this.CharacteristicModifiers = characteristicModifiers;
	}
}
