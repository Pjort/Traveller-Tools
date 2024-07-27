export class Reward {
	Id: number;
	Description?: string;

	constructor(id: number, description?: string) {
		this.Id = id;
		this.Description = description;
	}
}
