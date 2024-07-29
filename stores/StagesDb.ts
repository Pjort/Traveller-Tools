import { Stage } from "#imports";

export class StagesDb {
	private static Stages: Stage[] = [];

	public static get GetStages(): Stage[] {
		return this.Stages;
	}

	public static GetStageById(id: number): Stage | undefined {
		return this.Stages.find((s) => s.Id === id);
	}

	static {
		this.Stages.push(new Stage(1, "Basic information"));
		this.Stages.push(new Stage(2, "Characteristics"));
		this.Stages.push(new Stage(3, "Background skills"));
		this.Stages.push(new Stage(4, "Career"));
	}
}
