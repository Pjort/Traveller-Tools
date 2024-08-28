import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event, Item, MusterOutRecord } from "#imports";

const assignments: Assignment[] = [
	new Assignment(1, new DiceCheck(6, "INT"), new DiceCheck(6, "DEX"), "Thief", "You steal from the rich and give to… well, yourself, actually.", [
		new Rank(0, "", ""),
		new Rank(1, "", "Stealth 1"),
		new Rank(2, "", ""),
		new Rank(3, "", "Streetwise 1"),
		new Rank(4, "", ""),
		new Rank(5, "", "Recon 1"),
		new Rank(6, "", ""),
	]),
	new Assignment(2, new DiceCheck(6, "END"), new DiceCheck(6, "STR"), "Enforcer", "You are a leg breaker, thug or assassin for a criminal group.", [
		new Rank(0, "", ""),
		new Rank(1, "", "Persuade 1"),
		new Rank(2, "", ""),
		new Rank(3, "", "Gun Combat 1"), // TODO: Or Melee 1
		new Rank(4, "", ""),
		new Rank(5, "", "Streetwise 1"),
		new Rank(6, "", ""),
	]),
	new Assignment(3, new DiceCheck(6, "DEX"), new DiceCheck(6, "INT"), "Pirate", "You are a space-going corsair.", [
		new Rank(0, "Lackey", ""),
		new Rank(1, "Henchman", "Pilot 1"), // TODO: Or Gunner 1
		new Rank(2, "Corporal", ""),
		new Rank(3, "Sergeant", "Gun Combat 1"), // TODO: Or Melee 1
		new Rank(4, "Lieutenant", ""),
		new Rank(5, "Leader", "Leadership 1"),
		new Rank(6, "Captain", ""),
	]),
];

const trainingTables: TrainingTable[] = [
	new TrainingTable(1, "Personal Development", [
		new Reward(1, "Carouse"),
		new Reward(2, "DEX +1"),
		new Reward(3, "END +1"),
		new Reward(4, "Gambler"),
		new Reward(5, "Melee"),
		new Reward(6, "Gun Combat"),
	]),
	new TrainingTable(2, "Service Skills", [
		new Reward(1, "Deception"),
		new Reward(2, "Recon"),
		new Reward(3, "Athletics"),
		new Reward(4, "Gun Combat"),
		new Reward(5, "Stealth"),
		new Reward(6, "Streetwise"),
	]),
	new TrainingTable(3, "Advanced Education (Min. EDU 8)", [
		new Reward(1, "Electronics"),
		new Reward(2, "Navigation"),
		new Reward(3, "Medic"),
		new Reward(4, "Investigate"),
		new Reward(5, "Broker"),
		new Reward(6, "Advocate"),
	]),
	new TrainingTable(4, "Thief", [
		new Reward(1, "Stealth"),
		new Reward(2, "Electronics"),
		new Reward(3, "Recon"),
		new Reward(4, "Streetwise"),
		new Reward(5, "Deception"),
		new Reward(6, "Athletics"),
	]),
	new TrainingTable(5, "Enforcer", [
		new Reward(1, "Gun Combat"),
		new Reward(2, "Melee"),
		new Reward(3, "Streetwise"),
		new Reward(4, "Persuade"),
		new Reward(5, "Athletics"),
		new Reward(6, "Drive"),
	]),
	new TrainingTable(6, "Pirate", [
		new Reward(1, "Pilot"),
		new Reward(2, "Astrogation"),
		new Reward(3, "Gunner"),
		new Reward(4, "Engineer"),
		new Reward(5, "Vacc Suit"),
		new Reward(6, "Melee"),
	]),
];

const eventsTable: Event[] = [
	new Event(2, "Disaster! Roll on the Mishap table but you are not ejected from this career."),
	new Event(
		3,
		"You are arrested and charged. You can choose to defend yourself or hire a lawyer. If you defend yourself, roll Advocate 8+. If you succeed, the charges are dropped. If you fail, gain an Enemy and take the Prisoner career in your next term. If you hired a lawyer, gain the lawyer as a Contact and lose a Benefit roll."
	),
	new Event(4, "You are involved in the planning of an impressive heist. Gain Electronics 1 or Mechanic 1."),
	new Event(5, "One of your crimes pays off. Gain DM+2 to any one Benefit roll and gain your victim as an Enemy."),
	new Event(
		6,
		"You have the opportunity to backstab a fellow rogue for personal gain. If you do so, gain DM+4 to your next advancement roll. If you refuse, gain them as an Ally."
	),
	new Event(7, "Life Event. Roll on the Life Events Table."),
	new Event(8, "You spend months in the dangerous criminal underworld. Gain one of Streetwise 1, Stealth 1, Melee 1 or Gun Combat 1."),
	new Event(
		9,
		"You become involved in a feud with a rival criminal organisation. Roll Stealth or Gun Combat 8+. If you fail, roll on the Injury Table. If you succeed, gain an extra Benefit roll."
	),
	new Event(
		10,
		"You are involved in a gambling ring. Gain Gambler 1. You may wager any number of Benefit rolls. Roll Gambler 8+; if you fail, lose all the wagered Benefit rolls. If you succeed, gain half as many Benefit rolls as you wagered (round up)."
	),
	new Event(
		11,
		"A crime lord considers you his protégé. Either gain Tactics (military) 1 or DM+4 to your next advancement roll thanks to their aid."
	),
	new Event(12, "You commit a legendary crime. You are automatically promoted."),
];

const mishapTable: Event[] = [
	new Event(
		1,
		"Severely injured (this is the same as a result of 2 on the Injury table). Alternatively, roll twice on the Injury table and take the lower result."
	),
	new Event(2, "Arrested. You must take the Prisoner career in your next term."),
	new Event(
		3,
		"Betrayed by a friend. One of your Contacts or Allies betrays you, ending your career. That Contact or Ally becomes a Rival or Enemy. If you have no Contacts or Allies, then you are betrayed by someone you never saw coming and still gain a Rival or Enemy. In addition, roll 2D. If you roll 2, you must take the Prisoner career in your next term."
	),
	new Event(
		4,
		"A job goes wrong, forcing you to flee off-planet. Gain one of Deception 1, Pilot (small craft or spacecraft) 1, Athletics (dexterity) 1 or Gunner 1."
	),
	new Event(5, "A police detective or rival criminal forces you to flee and vows to hunt you down. Gain an Enemy."),
	new Event(6, "Injured. Roll on the Injury table (see page 49)."),
];

const musterOutTable: MusterOutRecord[] = [
	new MusterOutRecord(1, 0, [new Item(1, "Ship Share")]),
	new MusterOutRecord(2, 0, [new Item(1, "Weapon")]),
	new MusterOutRecord(3, 10000, [new Reward(1, "INT +1")]),
	new MusterOutRecord(4, 10000, [new Item(1, "1D Ship Shares")]),
	new MusterOutRecord(5, 50000, [new Item(1, "Armour")]),
	new MusterOutRecord(6, 100000, [new Reward(1, "DEX +1")]),
	new MusterOutRecord(7, 100000, [new Item(1, "2D Ship Shares")]),
];

export const Rogue: Career = new Career(10, "Rogue", new DiceCheck(6, "DEX"), assignments, trainingTables, eventsTable, mishapTable, musterOutTable);
