export class Term {
	Number: number;
	Age: number;
	Career?: string;
	Qualified?: boolean;
	Assignment?: string;
	SelectedTrainingTable?: number;
	Survived?: boolean;
	Advanced?: boolean;

	constructor(
		number: number,
		age: number,
		career?: string,
		qualified?: boolean,
		assignment?: string,
		selectedTrainingTable?: number,
		survived?: boolean,
		advanced?: boolean
	) {
		this.Number = number;
		this.Age = age;
		this.Career = career;
		this.Qualified = qualified;
		this.Assignment = assignment;
		this.SelectedTrainingTable = selectedTrainingTable;
		this.Survived = survived;
		this.Advanced = advanced;
	}
}
