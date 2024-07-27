import { DiceCheck } from "#imports";

export class Assignment {
	Id: number;
	Name?: string;
	Description?: string;
	SurvivalCheck: DiceCheck;
	AdvancementCheck: DiceCheck;

	constructor(id: number, survivalCheck: DiceCheck, advancementCheck: DiceCheck, name?: string, description?: string) {
		this.Id = id;
		this.Name = name;
		this.Description = description;
		this.SurvivalCheck = survivalCheck;
		this.AdvancementCheck = advancementCheck;
	}
}
