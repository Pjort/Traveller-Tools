import type { Reward } from "#imports";

export class MusterOutRecord {
	Id: number;
	Cash: number;
	Benefits: Reward[];

	constructor(id: number, cash: number, benefits: Reward[]) {
		this.Id = id;
		this.Cash = cash;
		this.Benefits = benefits;
	}
}
