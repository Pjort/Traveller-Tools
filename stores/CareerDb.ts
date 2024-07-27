import { Career, Assignment, DiceCheck, TrainingTable, Reward } from "#imports";

export class CareerDb {
	private static careers: Career[] = [];

	public static get GetCareers(): Career[] {
		return this.careers;
	}

	public static GetCareerById(id: number): Career | undefined {
		return this.careers.find((c) => c.Id === id);
	}

	static {
		this.careers.push(
			new Career(
				1,
				"Agent",
				new DiceCheck(6, "INT"),
				[
					new Assignment(
						1,
						new DiceCheck(6, "END"),
						new DiceCheck(6, "INT"),
						"Law Enforcement",
						"You are a police officer or detective."
					),
					new Assignment(
						2,
						new DiceCheck(7, "INT"),
						new DiceCheck(5, "INT"),
						"Intelligence",
						"You work as a spy or saboteur."
					),
					new Assignment(
						3,
						new DiceCheck(5, "INT"),
						new DiceCheck(7, "INT"),
						"Corporate",
						"You work for a corporation, spying on rival organisations."
					),
				],
				[
					new TrainingTable(1, "Personal Development", [
						new Reward(1, "Gun Combat"),
						new Reward(2, "DEX +1"),
						new Reward(3, "END +1"),
						new Reward(4, "Melee"),
						new Reward(5, "INT +1"),
						new Reward(6, "Athletics"),
					]),
					new TrainingTable(2, "Service Skills", [
						new Reward(1, "Streetwise"),
						new Reward(2, "Drive"),
						new Reward(3, "Investigate"),
						new Reward(4, "Flyer"),
						new Reward(5, "Recon"),
						new Reward(6, "Gun Combat"),
					]),
				]
			)
		);
	}
}
