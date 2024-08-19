import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event, Item, MusterOutRecord } from "#imports";

const assignments: Assignment[] = [
	new Assignment(
		1,
		new DiceCheck(5, "END"),
		new DiceCheck(7, "EDU"),
		"Support",
		"You are an engineer, cook or in some other role behind the front lines.",
		[
			new Rank(0, "Private", "Gun Combat 1"),
			new Rank(1, "Lance Corporal", "Recon 1"),
			new Rank(2, "Corporal", ""),
			new Rank(3, "Lance Sergeant", "Leadership 1"),
			new Rank(4, "Sergeant", ""),
			new Rank(5, "Gunnery Sergeant", ""),
			new Rank(6, "Sergeant Major", ""),
		]
	),
	new Assignment(2, new DiceCheck(6, "STR"), new DiceCheck(6, "EDU"), "Infantry", "You are one of the Poor Bloody Infantry on the ground.", [
		new Rank(0, "Private", "Gun Combat 1"),
		new Rank(1, "Lance Corporal", "Recon 1"),
		new Rank(2, "Corporal", ""),
		new Rank(3, "Lance Sergeant", "Leadership 1"),
		new Rank(4, "Sergeant", ""),
		new Rank(5, "Gunnery Sergeant", ""),
		new Rank(6, "Sergeant Major", ""),
	]),
	new Assignment(3, new DiceCheck(7, "DEX"), new DiceCheck(5, "INT"), "Cavalry", "You are one of the crew of a gunship or tank.", [
		new Rank(0, "Private", "Gun Combat 1"),
		new Rank(1, "Lance Corporal", "Recon 1"),
		new Rank(2, "Corporal", ""),
		new Rank(3, "Lance Sergeant", "Leadership 1"),
		new Rank(4, "Sergeant", ""),
		new Rank(5, "Gunnery Sergeant", ""),
		new Rank(6, "Sergeant Major", ""),
	]),
];

const trainingTables: TrainingTable[] = [
	new TrainingTable(1, "Personal Development", [
		new Reward(1, "STR +1"),
		new Reward(2, "DEX +1"),
		new Reward(3, "END +1"),
		new Reward(4, "Gambler"),
		new Reward(5, "Medic"),
		new Reward(6, "Melee"),
	]),
	new TrainingTable(2, "Service Skills", [
		new Reward(1, "Vacc Suit"), // TODO: Add Drive as a OR option
		new Reward(2, "Athletics"),
		new Reward(3, "Gun Combat"),
		new Reward(4, "Recon"),
		new Reward(5, "Melee"),
		new Reward(6, "Heavy Weapons"),
	]),
	new TrainingTable(3, "Advanced Education (Min. EDU 8)", [
		new Reward(1, "Tactics: military"),
		new Reward(2, "Electronics"),
		new Reward(3, "Navigation"),
		new Reward(4, "Explosives"),
		new Reward(5, "Engineer"),
		new Reward(6, "Survival"),
	]),
	new TrainingTable(4, "Officer (COMMISSIONED ONLY)", [
		new Reward(1, "Tactics: military"),
		new Reward(2, "Leadership"),
		new Reward(3, "Advocate"),
		new Reward(4, "Diplomat"),
		new Reward(5, "Electronics"),
		new Reward(6, "Admin"),
	]),
	new TrainingTable(5, "Support", [
		new Reward(1, "Mechanic"),
		new Reward(2, "Drive"), // TODO: Add Flyer as a OR option
		new Reward(3, "Profession"),
		new Reward(4, "Explosives"),
		new Reward(5, "Electronics: comms"),
		new Reward(6, "Medic"),
	]),
	new TrainingTable(6, "Infantry", [
		new Reward(1, "Gun Combat"),
		new Reward(2, "Melee"),
		new Reward(3, "Heavy Weapons"),
		new Reward(4, "Stealth"),
		new Reward(5, "Athletics"),
		new Reward(6, "Recon"),
	]),
	new TrainingTable(7, "Cavalry", [
		new Reward(1, "Mechanic"),
		new Reward(2, "Drive"),
		new Reward(3, "Flyer"),
		new Reward(4, "Recon"),
		new Reward(5, "Heavy Weapons: vehicle"),
		new Reward(6, "Electronics: sensors"),
	]),
];

const eventsTable: Event[] = [
	new Event(2, "Disaster! Roll on the Mishap table but you are not ejected from this career."),
	new Event(
		3,
		"You are assigned to a planet with a hostile or wild environment. Gain one of Vacc Suit 1, Engineer 1, Animals (riding or training) 1 or Recon 1."
	),
	new Event(4, "You are assigned to an urbanised planet torn by war. Gain one of Stealth 1, Streetwise 1, Persuade 1 or Recon 1."),
	new Event(5, "You are given a special assignment or duty in your unit. Gain DM+1 to any one Benefit roll."),
	new Event(
		6,
		"You are thrown into a brutal ground war. Roll EDU 8+ to avoid injury; if you succeed, you gain one level in Gun Combat or Leadership."
	),
	new Event(7, "Life Event. Roll on the Life Events Table."),
	new Event(8, "You are given advanced training in a specialist field. Roll EDU 8+ to increase any one skill you already have by one level."),
	new Event(9, "Surrounded and outnumbered by the enemy, you hold out until relief arrives. Gain DM+2 to your next advancement roll."),
	new Event(10, "You are assigned to a peacekeeping role. Gain one of Admin 1, Investigate 1, Deception 1 or Recon 1."),
	new Event(
		11,
		"Your commanding officer takes an interest in your career. Either gain Tactics (military) 1 or DM+4 to your next advancement roll thanks to their aid."
	),
	new Event(12, "You display heroism in battle. You may gain a promotion or a commission automatically."),
];

const mishapTable: Event[] = [
	new Event(
		1,
		"Severely injured in action (this is the same as a result of 2 on the Injury table). Alternatively, roll twice on the Injury table and take the lower result."
	),
	new Event(
		2,
		"Your unit is slaughtered in a disastrous battle, for which you blame your commander. Gain them as an Enemy as they have you removed from the service."
	),
	new Event(
		3,
		"You are sent to a very unpleasant region (jungle, swamp, desert, icecap, urban) to battle against guerrilla fighters and rebels. You are discharged because of stress, injury or because the government wishes to bury the whole incident. Increase Recon or Survival by one level but also gain the rebels as an Enemy."
	),
	new Event(
		4,
		"You discover that your commanding officer is engaged in some illegal activity, such as weapon smuggling. You can join their ring and gain them as an Ally before the inevitable investigation gets you discharged or you can co-operate with the military police – the official whitewash gets you discharged anyway but you may keep your Benefit roll from this term of service."
	),
	new Event(
		5,
		"You are tormented by or quarrel with an officer or fellow soldier. Gain that officer as a Rival as they drive you out of the service."
	),
	new Event(6, "Injured. Roll on the Injury table (see page 49)."),
];

const musterOutTable: MusterOutRecord[] = [
	new MusterOutRecord(1, 2000, [new Item(1, "Cybernetic Implant")]),
	new MusterOutRecord(2, 5000, [new Reward(1, "INT +1")]),
	new MusterOutRecord(3, 10000, [new Reward(1, "EDU +1")]),
	new MusterOutRecord(4, 10000, [new Item(1, "Weapon")]),
	new MusterOutRecord(5, 10000, [new Item(1, "Armour")]),
	new MusterOutRecord(6, 20000, [new Reward(1, "END +1"), new Item(2, "Cybernetic Implant")]),
	new MusterOutRecord(7, 30000, [new Reward(1, "SOC +1")]),
];

export const Army: Career = new Career(2, "Army", new DiceCheck(5, "END"), assignments, trainingTables, eventsTable, mishapTable, musterOutTable);
