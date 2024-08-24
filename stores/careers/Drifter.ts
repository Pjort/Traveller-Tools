import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event, Item, MusterOutRecord } from "#imports";

const assignments: Assignment[] = [
	new Assignment(
		1,
		new DiceCheck(7, "END"),
		new DiceCheck(7, "STR"),
		"Barbarian",
		"You live on a primitive world without the benefits of technology.",
		[
			new Rank(0, "", ""),
			new Rank(1, "", "Survival 1"),
			new Rank(2, "Warrior", "Melee: Blade 1"),
			new Rank(3, "", ""),
			new Rank(4, "Chieftan", "Leadership 1"),
			new Rank(5, "", ""),
			new Rank(6, "Warlord", ""),
		]
	),
	new Assignment(
		2,
		new DiceCheck(7, "END"),
		new DiceCheck(7, "INT"),
		"Wanderer",
		"You are a space bum, living hand-to-mouth in slums and spaceports across the galaxy.",
		[
			new Rank(0, "", ""),
			new Rank(1, "", ""),
			new Rank(2, "", "Streetwise 1"),
			new Rank(3, "", ""),
			new Rank(4, "", "Deception 1"),
			new Rank(5, "", ""),
			new Rank(6, "", ""),
		]
	),
	new Assignment(3, new DiceCheck(7, "DEX"), new DiceCheck(7, "END"), "Scavenger", "You work as a belter (asteroid miner) or on a salvage crew.", [
		new Rank(0, "", ""),
		new Rank(1, "", ""),
		new Rank(2, "", "Vacc Suit 1"),
		new Rank(3, "", ""),
		new Rank(4, "", "Mechanic 1"), // TODO: Or Professions: Belter 1
		new Rank(5, "", ""),
		new Rank(6, "", ""),
	]),
];

const trainingTables: TrainingTable[] = [
	new TrainingTable(1, "Personal Development", [
		new Reward(1, "STR +1"),
		new Reward(2, "END +1"),
		new Reward(3, "DEX +1"),
		new Reward(4, "Language"),
		new Reward(5, "Profession"),
		new Reward(6, "Jack-of-all-Trades"),
	]),
	new TrainingTable(2, "Service Skills", [
		new Reward(1, "Athletics"),
		new Reward(2, "Melee: Unarmed"),
		new Reward(3, "Recon"),
		new Reward(4, "Streetwise"),
		new Reward(5, "Stealth"),
		new Reward(6, "Survival"),
	]),
	new TrainingTable(3, "Barbarian", [
		new Reward(1, "Animals"),
		new Reward(2, "Carouse"),
		new Reward(3, "Melee: Blade"),
		new Reward(4, "Stealth"),
		new Reward(5, "Seafarer: Sail"), // TODO: Or Seafarer: Personal
		new Reward(6, "Survival"),
	]),
	new TrainingTable(4, "Wanderer", [
		new Reward(1, "Drive"),
		new Reward(2, "Deception"),
		new Reward(3, "Recon"),
		new Reward(4, "Stealth"),
		new Reward(5, "Streetwise"),
		new Reward(6, "Survival"),
	]),
	new TrainingTable(5, "Scavenger", [
		new Reward(1, "Pilot: Small Craft"),
		new Reward(2, "Mechanic"),
		new Reward(3, "Astrogation"),
		new Reward(4, "Vacc Suit"),
		new Reward(5, "Profession"),
		new Reward(6, "Gun Combat"),
	]),
];

const eventsTable: Event[] = [
	new Event(2, "Disaster! Roll on the Mishap table but you are not ejected from this career."),
	new Event(
		3,
		"A patron offers you a chance at a job. If you accept, you gain DM+4 to your next qualification roll but you owe that patron a favour."
	),
	new Event(4, "You pick up a few useful skills here and there. Gain one level of Jack-of-all-Trades, Survival, Streetwise or Melee (any)."),
	new Event(5, "You manage to scavenge something of use. Gain DM+1 to any one Benefit roll."),
	new Event(6, "You encounter something unusual. Go to the Life Events table and have an Unusual Event."),
	new Event(7, "Life Event. Roll on the Life Events Table."),
	new Event(
		8,
		"You are attacked by enemies. Gain an Enemy if you do not have one already and roll either Melee 8+, Gun Combat 8+ or Stealth 8+ to avoid a roll on the Injury table."
	),
	new Event(
		9,
		"You are offered a chance to take part in a risky but rewarding adventure. If you accept, roll 1D: On a 1–2, you are injured or arrested; either roll on the Injury table or take the Prisoner career in your next term. On 3–4, you survive, but gain nothing. On a 5–6, you succeed. Gain DM+4 to one Benefit roll."
	),
	new Event(10, "Life on the edge hones your abilities. Increase any skill you already have by one level."),
	new Event(11, "You are forcibly drafted. Roll for the Draft next term."),
	new Event(12, "You thrive on adversity. You are automatically promoted."),
];

const mishapTable: Event[] = [
	new Event(
		1,
		"Severely injured (this is the same as a result of 2 on the Injury table). Alternatively, roll twice on the Injury table and take the lower result."
	),
	new Event(2, "Injured. Roll on the Injury table (see page 49)."),
	new Event(3, "You run afoul of a criminal gang, corrupt bureaucrat or other foe. Gain an Enemy."),
	new Event(4, "You suffer from a life-threatening illness. Reduce your END by 1."),
	new Event(
		5,
		"Betrayed by a friend. One of your Contacts or Allies betrays you, ending your career. That Contact or Ally becomes a Rival or Enemy. If you have no Contacts or Allies, then you are betrayed by someone you never saw coming and still gain a Rival or Enemy. In addition, roll 2D. If you roll 2, you must take the Prisoner career in your next term."
	),
	new Event(6, "You do not know what happened to you. There is a gap in your memory."),
];

const musterOutTable: MusterOutRecord[] = [
	new MusterOutRecord(1, 0, [new Relation(1, "Contact")]),
	new MusterOutRecord(2, 0, [new Item(1, "Weapon")]),
	new MusterOutRecord(3, 1000, [new Relation(1, "Ally")]),
	new MusterOutRecord(4, 2000, [new Item(1, "Weapon")]),
	new MusterOutRecord(5, 3000, [new Reward(1, "EDU +1")]),
	new MusterOutRecord(6, 4000, [new Item(1, "Ship Share")]),
	new MusterOutRecord(7, 8000, [new Item(1, "Two Ship Shares")]),
];

export const Drifter: Career = new Career(
	4,
	"Drifter",
	new DiceCheck(0, "Automatic"),
	assignments,
	trainingTables,
	eventsTable,
	mishapTable,
	musterOutTable
);
