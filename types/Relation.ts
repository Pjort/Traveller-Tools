export class Relation extends Reward {
	Amount: number;
	TermNumber: number;

	constructor(id: number, description: string, amount: number = 1, termNumber: number = 0) {
		super(id, description);
		this.Amount = amount;
		this.TermNumber = termNumber;
	}
}
