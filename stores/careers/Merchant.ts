import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event, Item, MusterOutRecord } from "#imports";

const assignments: Assignment[] = [
	new Assignment(
		1,
		new DiceCheck(5, "EDU"),
		new DiceCheck(7, "INT"),
		"Merchant Marine",
		"You work on one of the massive cargo haulers run by the Imperium or a megacorporation.",
		[
			new Rank(0, "Crewman", ""),
			new Rank(1, "Senior Crewman", "Mechanic 1"),
			new Rank(2, "4th Officer", ""),
			new Rank(3, "3rd Officer", ""),
			new Rank(4, "2nd Officer", "Pilot 1"),
			new Rank(5, "1st Officer", "SOC +1"),
			new Rank(6, "Captain", ""),
		]
	),
	new Assignment(2, new DiceCheck(6, "DEX"), new DiceCheck(6, "INT"), "Free Trader", "You are part of the crew of a tramp trader.", [
		new Rank(0, "", ""),
		new Rank(1, "", "Persuade 1"),
		new Rank(2, "", ""),
		new Rank(3, "", "Jack-of-all-Trades 1"),
		new Rank(4, "", ""),
		new Rank(5, "", ""),
		new Rank(6, "", ""),
	]),
	new Assignment(3, new DiceCheck(5, "EDU"), new DiceCheck(7, "INT"), "Broker", "You work in a planetside brokerage or starport.", [
		new Rank(0, "", ""),
		new Rank(1, "", "Broker 1"),
		new Rank(2, "", ""),
		new Rank(3, "Experienced Broker", "Streetwise 1"),
		new Rank(4, "", ""),
		new Rank(5, "", ""),
		new Rank(6, "", ""),
	]),
];

const trainingTables: TrainingTable[] = [
	new TrainingTable(1, "Personal Development", [
		new Reward(1, "STR +1"),
		new Reward(2, "DEX +1"),
		new Reward(3, "END +1"),
		new Reward(4, "INT +1"),
		new Reward(5, "Language"),
		new Reward(6, "Streetwise"),
	]),
	new TrainingTable(2, "Service Skills", [
		new Reward(1, "Drive"),
		new Reward(2, "Vacc Suit"),
		new Reward(3, "Broker"),
		new Reward(4, "Steward"),
		new Reward(5, "Electronics"),
		new Reward(6, "Persuade"),
	]),
	new TrainingTable(3, "Advanced Education (Min. EDU 8)", [
		new Reward(1, "Engineer"),
		new Reward(2, "Astrogation"),
		new Reward(3, "Electronics"),
		new Reward(4, "Pilot"),
		new Reward(5, "Admin"),
		new Reward(6, "Advocate"),
	]),
	new TrainingTable(4, "Merchant Marine", [
		new Reward(1, "Pilot"),
		new Reward(2, "Vacc Suit"),
		new Reward(3, "Athletics"),
		new Reward(4, "Mechanic"),
		new Reward(5, "Engineer"),
		new Reward(6, "Electronics"),
	]),
	new TrainingTable(5, "Free Trader", [
		new Reward(1, "Pilot: Spacecraft"),
		new Reward(2, "Vacc Suit"),
		new Reward(3, "Deception"),
		new Reward(4, "Mechanic"),
		new Reward(5, "Streetwise"),
		new Reward(6, "Gunner"),
	]),
	new TrainingTable(6, "Broker", [
		new Reward(1, "Admin"),
		new Reward(2, "Advocate"),
		new Reward(3, "Broker"),
		new Reward(4, "Streetwise"),
		new Reward(5, "Deception"),
		new Reward(6, "Persuade"),
	]),
];

const eventsTable: Event[] = [
	new Event(2, "Disaster! Roll on the Mishap table but you are not ejected from this career."),
	new Event(
		3,
		"You are offered the opportunity to smuggle illegal items onto a planet. If you accept, roll Deception 8+ or Persuade 8+ to gain Streetwise 1 and an extra Benefit roll. If you refuse, you gain an Enemy in the criminal sphere."
	),
	new Event(
		4,
		"Gain any one of these skills, reflecting your time spent dealing with suppliers and spacers: Profession 1, Electronics 1, Engineer 1, Animals 1 or Science 1."
	),
	new Event(
		5,
		"You have a chance to risk your fortune on a possibility lucrative deal. You may gamble a number of Benefit rolls and roll Gambler 8+ or Broker 8+. If you succeed, you gain half as many Benefit rolls as you risked, rounding up. If you fail, you lose all the rolls risked. Either way, gain one level in whichever skill you used."
	),
	new Event(6, "You make an unexpected connection outside your normal circles. Gain a Contact."),
	new Event(7, "Life Event. Roll on the Life Events Table."),
	new Event(
		8,
		"You are embroiled in legal trouble. Gain one of Advocate 1, Admin 1, Diplomat 1 or Investigate 1, then roll 2D. If you roll 2, you must take the Prisoner career in your next term."
	),
	new Event(9, "You are given advanced training in a specialist field. Roll EDU 8+ to increase any one skill you already have by one level."),
	new Event(10, "A good deal ensures you are living the high life for a few years. Gain DM+1 to any one Benefit roll."),
	new Event(
		11,
		"You befriend a useful ally in one sphere. Gain an Ally and either gain a level in Carouse or DM+4 to your next advancement roll thanks to their aid."
	),
	new Event(12, "Your business or ship thrives. You are automatically promoted."),
];

const mishapTable: Event[] = [
	new Event(
		1,
		"Severely injured (this is the same as a result of 2 on the Injury table). Alternatively, roll twice on the Injury table and take the lower result."
	),
	new Event(2, "You are bankrupted by a rival. You lose all Benefits from this career and gain the other trader as a Rival."),
	new Event(3, "A sudden war destroys your trade routes and contacts, forcing you to flee that region of space. Gain Gun Combat 1 or Pilot 1."),
	new Event(4, "Your ship or starport is destroyed by criminals. Gain them as an Enemy."),
	new Event(
		5,
		"Imperial trade restrictions force you out of business. You may take the Rogue career for your next term without needing to roll for qualification."
	),
	new Event(
		6,
		"A series of bad deals and decisions force you into bankruptcy. You salvage what you can. You may take a Benefit roll for this term as well as any others you are entitled to."
	),
];

const musterOutTable: MusterOutRecord[] = [
	new MusterOutRecord(1, 1000, [new Item(1, "Blade")]),
	new MusterOutRecord(2, 5000, [new Reward(1, "INT +1")]),
	new MusterOutRecord(3, 10000, [new Reward(1, "EDU +1")]),
	new MusterOutRecord(4, 20000, [new Item(1, "Gun")]),
	new MusterOutRecord(5, 20000, [new Item(1, "Ship Share")]),
	new MusterOutRecord(6, 40000, [new Item(1, "Free Trader")]),
	new MusterOutRecord(7, 40000, [new Item(1, "Free Trader")]),
];

export const Merchant: Career = new Career(
	7,
	"Merchant",
	new DiceCheck(4, "INT"),
	assignments,
	trainingTables,
	eventsTable,
	mishapTable,
	musterOutTable
);
