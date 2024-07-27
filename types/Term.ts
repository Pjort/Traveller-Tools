export class Term {
	Number: number;
	Age: number;
	Career?: string;
	Qualified?: boolean;
	Assignment?: string;
	Survived?: boolean;
	Advanced?: boolean;

	constructor(
		number: number,
		age: number,
		career?: string,
		qualified?: boolean,
		assignment?: string,
		survived?: boolean,
		advanced?: boolean
	) {
		this.Number = number;
		this.Age = age;
		this.Career = career;
		this.Qualified = qualified;
		this.Assignment = assignment;
		this.Survived = survived;
		this.Advanced = advanced;
	}
}
