import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event, Item, MusterOutRecord } from "#imports";

const assignments: Assignment[] = [
	new Assignment(
		1,
		new DiceCheck(4, "INT"),
		new DiceCheck(6, "EDU"),
		"Administrator",
		"You serve in the planetary government or even ruled over a fiefdom or other domain.",
		[
			new Rank(0, "Assistant", ""),
			new Rank(1, "Clerk", "Admin 1"),
			new Rank(2, "Supervisor", ""),
			new Rank(3, "Manager", "Advocate 1"),
			new Rank(4, "Chief", ""),
			new Rank(5, "Director", "Leadership 1"),
			new Rank(6, "Minister", ""),
		]
	),
	new Assignment(2, new DiceCheck(5, "INT"), new DiceCheck(7, "SOC"), "Diplomat", "You are a diplomat or other state official.", [
		new Rank(0, "Intern", ""),
		new Rank(1, "3rd Secretary", "Admin 1"),
		new Rank(2, "2nd Secretary", ""),
		new Rank(3, "1st Secretary", "Advocate 1"),
		new Rank(4, "Counsellor", ""),
		new Rank(5, "Minister", "Diplomat 1"),
		new Rank(6, "Ambassador", ""),
	]),
	new Assignment(
		3,
		new DiceCheck(5, "SOC"),
		new DiceCheck(7, "INT"),
		"Dilettante",
		"You are known for being known and have absolutely no useful function in society.",
		[
			new Rank(0, "Wastrel", ""),
			new Rank(1, "", ""),
			new Rank(2, "Ingrate", "Carouse 1"),
			new Rank(3, "", ""),
			new Rank(4, "Black Sheep", "Persuade 1"),
			new Rank(5, "", ""),
			new Rank(6, "Scoundrel", "Jack-of-all-Trades 1"),
		]
	),
];

const trainingTables: TrainingTable[] = [
	new TrainingTable(1, "Personal Development", [
		new Reward(1, "STR +1"),
		new Reward(2, "DEX +1"),
		new Reward(3, "END +1"),
		new Reward(4, "Gambler"),
		new Reward(5, "Gun Combat"),
		new Reward(6, "Melee"),
	]),
	new TrainingTable(2, "Service Skills", [
		new Reward(1, "Admin"),
		new Reward(2, "Advocate"),
		new Reward(3, "Electronics"),
		new Reward(4, "Diplomat"),
		new Reward(5, "Investigate"),
		new Reward(6, "Persuade"),
	]),
	new TrainingTable(3, "Advanced Education (Min. EDU 8)", [
		new Reward(1, "Science"),
		new Reward(2, "Advocate"),
		new Reward(3, "Language"),
		new Reward(4, "Leadership"),
		new Reward(5, "Diplomat"),
		new Reward(6, "Art"),
	]),
	new TrainingTable(4, "Administrator", [
		new Reward(1, "Admin"),
		new Reward(2, "Advocate"),
		new Reward(3, "Broker"),
		new Reward(4, "Diplomat"),
		new Reward(5, "Leadership"),
		new Reward(6, "Persuade"),
	]),
	new TrainingTable(5, "Diplomat", [
		new Reward(1, "Advocate"),
		new Reward(2, "Carouse"),
		new Reward(3, "Electronics"),
		new Reward(4, "Steward"),
		new Reward(5, "Diplomat"),
		new Reward(6, "Deception"),
	]),
	new TrainingTable(6, "Dilettante", [
		new Reward(1, "Carouse"),
		new Reward(2, "Deception"),
		new Reward(3, "Flyer"),
		new Reward(4, "Streetwise"),
		new Reward(5, "Gambler"),
		new Reward(6, "Jack-of-all-Trades"),
	]),
];

const eventsTable: Event[] = [
	new Event(2, "Disaster! Roll on the Mishap table but you are not ejected from this career."),
	new Event(
		3,
		"You are challenged to a duel for your honour and standing. If you refuse, reduce your SOC by 1. If you accept, roll Melee (blade) 8+. If you succeed, gain one SOC. If you fail, roll on the Injury table and reduce your SOC by one. Either way, gain one level in Melee (blade), Leadership, Tactics (any) or Deception."
	),
	new Event(
		4,
		"Your time as a ruler or playboy gives you a wide range of experiences. Gain one of Animals (riding) 1, Art 1, Carouse 1 or Streetwise 1."
	),
	new Event(5, "You inherit a gift from a rich relative. Gain DM+1 to any one Benefit roll."),
	new Event(
		6,
		"You become deeply involved in politics on your world of residence, becoming a player in the political intrigues of government. Gain one level in Advocate, Admin, Diplomacy or Persuade but also gain a Rival."
	),
	new Event(7, "Life Event. Roll on the Life Events Table."),
	new Event(
		8,
		"A conspiracy of nobles attempts to recruit you. If you refuse, gain the conspiracy as an Enemy. If you accept, roll Deception 8+ or Persuade 8+. If you fail, roll on the Mishap table as the conspiracy collapses. If you succeed, Gain one level of Deception, Persuade, Tactics or Carouse."
	),
	new Event(
		9,
		"Your reign is acclaimed by all as being fair and wise – or in the case of a dilettante, you sponge off your family’s wealth a while longer. Gain either a jealous relative or an unhappy subject as an Enemy. Gain DM+2 to your next advancement roll."
	),
	new Event(
		10,
		"You manipulate and charm your way through high society. Gain one level of Carouse, Diplomat, Persuade or Steward, as well as a Rival and an Ally."
	),
	new Event(
		11,
		"You make an alliance with a powerful and charismatic noble, who becomes an Ally. Either gain one level of Leadership or DM+4 to your next advancement roll thanks to their aid."
	),
	new Event(12, "Your efforts do not go unnoticed by the Imperium. You are automatically promoted."),
];

const mishapTable: Event[] = [
	new Event(
		1,
		"Severely injured (this is the same as a result of 2 on the Injury table). Alternatively, roll twice on the Injury table and take the lower result."
	),
	new Event(2, "A family scandal forces you out of your position. Lose one SOC."),
	new Event(3, "A disaster or war strikes. Roll Stealth 8+ or Deception 8+ to escape unhurt. If you fail, roll on the Injury table."),
	new Event(4, "Political manoeuvrings usurp your position. Increase Diplomat or Advocate by one level and gain a Rival."),
	new Event(5, "An assassin attempts to end your life. Roll END 8+. If you fail, roll on the Injury table."),
	new Event(6, "Injured. Roll on the Injury table (see page 49)."),
];

const musterOutTable: MusterOutRecord[] = [
	new MusterOutRecord(1, 10000, [new Item(1, "Ship Share")]),
	new MusterOutRecord(2, 10000, [new Item(1, "Two Ship Shares")]),
	new MusterOutRecord(3, 50000, [new Item(1, "Blade")]),
	new MusterOutRecord(4, 50000, [new Reward(1, "SOC +1")]),
	new MusterOutRecord(5, 100000, [new Item(1, "TAS Membership")]),
	new MusterOutRecord(6, 100000, [new Item(1, "Yacht")]),
	new MusterOutRecord(7, 200000, [new Reward(1, "SOC +1"), new Item(2, "Yacht")]),
];

export const Noble: Career = new Career(9, "Noble", new DiceCheck(10, "SOC"), assignments, trainingTables, eventsTable, mishapTable, musterOutTable);
