import { Career, Assignment, DiceCheck, TrainingTable, Reward } from "#imports";

export const Agent: Career = new Career(
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
		new Assignment(2, new DiceCheck(7, "INT"), new DiceCheck(5, "INT"), "Intelligence", "You work as a spy or saboteur."),
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
		new TrainingTable(3, "Advanced Education (Min. EDU 8)", [
			new Reward(1, "Advocate"),
			new Reward(2, "Language"),
			new Reward(3, "Explosives"),
			new Reward(4, "Medic"),
			new Reward(5, "Vacc Suit"),
			new Reward(6, "Electronics"),
		]),
		new TrainingTable(4, "Law Enforcement", [
			new Reward(1, "Investigate"),
			new Reward(2, "Recon"),
			new Reward(3, "Streetwise"),
			new Reward(4, "Stealth"),
			new Reward(5, "Melee"),
			new Reward(6, "Advocate"),
		]),
		new TrainingTable(5, "Intelligence", [
			new Reward(1, "Investigate"),
			new Reward(2, "Recon"),
			new Reward(3, "Electronics: Comms"),
			new Reward(4, "Stealth"),
			new Reward(5, "Persuade"),
			new Reward(6, "Deception"),
		]),
		new TrainingTable(6, "Corporate", [
			new Reward(1, "Investigate"),
			new Reward(2, "Electronics: Computers"),
			new Reward(3, "Stealth"),
			new Reward(4, "Carouse"),
			new Reward(5, "Deception"),
			new Reward(6, "Streetwise"),
		]),
	]
);
