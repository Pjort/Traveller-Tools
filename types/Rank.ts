export class Rank extends Reward {
	Title?: string;

	constructor(id: number, title: string, description: string) {
		super(id, description);
		this.Title = title;
	}
}
