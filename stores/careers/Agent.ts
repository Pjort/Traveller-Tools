import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event } from "#imports";

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
	],
	[
		new Event(2, "Disater! Roll on the Mishap Table but you are not ejected from this career."),
		new Event(
			3,
			"An investigation takes on a dangerous turn. Make Investigate 8+ or Streetwise 8+. If you fail, roll on the Mishap Table. If you succeed, increase one of these skills by one level: Deception, Jack-of-all-Trades, Persuade or Tactics."
		),
		new Event(
			4,
			"You complete a mission for your superiors and are suitably rewarded. Gain DM+1 to any one Benefit rill from this career."
		),
		new Event(5, "You establish a network of contacts. Gain D3 Contacts."),
		new Event(
			6,
			"You are given advanced training in a specialist field. Roll EDU 8+ to increase any one skill you already have by one level."
		),
		new Event(7, "Life Event. Roll on the Life Events Table."),
		new Event(
			8,
			"You go undercover to investigate an enemy. Roll Deception 8+. If you succeed, roll immediately on the Rogue or Citizen Events table and make one roll on any Specialist skill table for that career. If you fail, roll immediately on the Rogue or Citizen Mishap table."
		),
		new Event(9, "You go above and beyond the call of duty. Gain DM+2 to your next advancement roll."),
		new Event(10, "You are given specialist training in vehicles. Gain one of Drive 1, Flyer 1, Pilot 1 or Gunner 1."),
		new Event(
			11,
			"You are befriended by a senior agent. Either increase Investigate by one level or DM+4 to an advancement roll thanks to their aid."
		),
		new Event(12, "Your efforts uncover a major conspiracy against your employers. You are automatically promoted."),
	],
	[new Event(1, ""), new Event(2, ""), new Event(3, ""), new Event(4, ""), new Event(5, ""), new Event(6, "")]
);
