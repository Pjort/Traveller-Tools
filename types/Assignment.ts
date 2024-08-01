import { DiceCheck } from "#imports";

export class Assignment {
	Id: number;
	Name?: string;
	Description?: string;
	SurvivalCheck: DiceCheck;
	AdvancementCheck: DiceCheck;
	Rank?: number;

	constructor(
		id: number,
		survivalCheck: DiceCheck,
		advancementCheck: DiceCheck,
		name?: string,
		description?: string,
		rank?: number
	) {
		this.Id = id;
		this.Name = name;
		this.Description = description;
		this.SurvivalCheck = survivalCheck;
		this.AdvancementCheck = advancementCheck;
		this.Rank = rank;
	}
}
