import { Rank } from "#imports";
export class Term {
	Number: number;
	Age: number;
	Career?: string;
	Qualified?: boolean;
	Assignment?: string;
	SelectedTrainingTable?: number;
	Survived?: boolean;
	Advanced?: boolean;
	Rank?: Rank;
	MusterOutBenefits?: string[];

	constructor(
		number: number,
		age: number,
		career?: string,
		qualified?: boolean,
		assignment?: string,
		selectedTrainingTable?: number,
		survived?: boolean,
		advanced?: boolean,
		rank?: Rank,
		musterOutBenefits?: string[]
	) {
		this.Number = number;
		this.Age = age;
		this.Career = career;
		this.Qualified = qualified;
		this.Assignment = assignment;
		this.SelectedTrainingTable = selectedTrainingTable;
		this.Survived = survived;
		this.Advanced = advanced;
		this.Rank = rank;
		this.MusterOutBenefits = musterOutBenefits;
	}
}
