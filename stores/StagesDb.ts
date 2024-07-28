import { Stage, Choice, Race } from "#imports";

export class StagesDb {
	private static Stages: Stage[] = [];

	public static get GetStages(): Stage[] {
		return this.Stages;
	}

	public static GetStageById(id: number): Stage | undefined {
		return this.Stages.find((s) => s.Id === id);
	}

	static {
		this.Stages.push(
			new Stage(1, "Basic information", [
				new Choice("Name", "Name", "input", "Enter your character's name"),
				new Choice("HomeWorld", "Home world", "input", "Enter your character's home world"),
				new Choice("Race", "Race", "select", "Select your character", [
					{ label: Race[Race.Human], value: Race.Human },
					{ label: Race[Race.Aslan], value: Race.Aslan },
					{ label: Race[Race.Vargr], value: Race.Vargr },
				]),
			])
		);
		this.Stages.push(new Stage(2, "Characteristics", []));
		this.Stages.push(new Stage(3, "Background skills", []));
	}
}
