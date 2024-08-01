import { Assignment, DiceCheck, TrainingTable, Event } from "#imports";

export class Career {
	Id: number;
	Name: string;
	QualificationCheck: DiceCheck;
	Assignments: Assignment[] = [];
	TrainingTables: TrainingTable[] = [];
	Events: Event[] = [];
	Mishaps: Event[] = [];

	constructor(
		id: number,
		name: string,
		qualificationCheck: DiceCheck,
		assignments: Assignment[] = [],
		trainingTables: TrainingTable[] = [],
		events: Event[] = [],
		mishaps: Event[] = []
	) {
		this.Id = id;
		this.Name = name;
		this.QualificationCheck = qualificationCheck;
		this.Assignments = assignments;
		this.TrainingTables = trainingTables;
		this.Events = events;
		this.Mishaps = mishaps;
	}
}
