import { Assignment, DiceCheck, TrainingTable } from "#imports";

export class Career {
	Id: number;
	Name: string;
	QualificationCheck: DiceCheck;
	Assignments: Assignment[] = [];
	TrainingTables: TrainingTable[] = [];

	constructor(
		id: number,
		name: string,
		qualificationCheck: DiceCheck,
		assignments: Assignment[] = [],
		trainingTables: TrainingTable[] = []
	) {
		this.Id = id;
		this.Name = name;
		this.QualificationCheck = qualificationCheck;
		this.Assignments = assignments;
		this.TrainingTables = trainingTables;
	}
}
