import { Reward } from "#imports";

export class TrainingTable {
	Id: number;
	Name?: string;
	Rewards: Reward[] = [];

	constructor(id: number, name?: string, rewards: Reward[] = []) {
		this.Id = id;
		this.Name = name;
		this.Rewards = rewards;
	}
}
