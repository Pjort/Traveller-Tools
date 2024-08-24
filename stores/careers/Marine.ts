import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event, Item, MusterOutRecord } from "#imports";

const assignments: Assignment[] = [
	new Assignment(
		1,
		new DiceCheck(5, "END"),
		new DiceCheck(7, "EDU"),
		"Support",
		"You are a quartermaster, engineer or battlefield medic in the marines.",
		[
			new Rank(0, "Marine", "Melee: Blade 1"), // TODO: Or Gun Combat 1
			new Rank(1, "Lance Corporal", "Gun Combat 1"),
			new Rank(2, "Corporal", ""),
			new Rank(3, "Lance Sergeant", "Leadership 1"),
			new Rank(4, "Sergeant", ""),
			new Rank(5, "Gunnery Sergeant", "END +1"),
			new Rank(6, "Sergeant Major", ""),
		]
	),
	new Assignment(
		2,
		new DiceCheck(6, "END"),
		new DiceCheck(6, "EDU"),
		"Star Marine",
		"You are trained to fight boarding actions and capture enemy vessels.",
		[
			new Rank(0, "Marine", "Melee: Blade 1"), // TODO: Or Gun Combat 1
			new Rank(1, "Lance Corporal", "Gun Combat 1"),
			new Rank(2, "Corporal", ""),
			new Rank(3, "Lance Sergeant", "Leadership 1"),
			new Rank(4, "Sergeant", ""),
			new Rank(5, "Gunnery Sergeant", "END +1"),
			new Rank(6, "Sergeant Major", ""),
		]
	),
	new Assignment(
		3,
		new DiceCheck(7, "END"),
		new DiceCheck(5, "EDU"),
		"Ground Assault",
		"You are kicked out of a spacecraft in high orbit and told to ‘capture that planet’.",
		[
			new Rank(0, "Marine", "Melee: Blade 1"), // TODO: Or Gun Combat 1
			new Rank(1, "Lance Corporal", "Gun Combat 1"),
			new Rank(2, "Corporal", ""),
			new Rank(3, "Lance Sergeant", "Leadership 1"),
			new Rank(4, "Sergeant", ""),
			new Rank(5, "Gunnery Sergeant", "END +1"),
			new Rank(6, "Sergeant Major", ""),
		]
	),
];

const trainingTables: TrainingTable[] = [
	new TrainingTable(1, "Personal Development", [
		new Reward(1, "STR +1"),
		new Reward(2, "DEX +1"),
		new Reward(3, "END +1"),
		new Reward(4, "Gambler"),
		new Reward(5, "Melee: Unarmed"),
		new Reward(6, "Melee: Blade"),
	]),
	new TrainingTable(2, "Service Skills", [
		new Reward(1, "Athletics"),
		new Reward(2, "Vacc Suit"),
		new Reward(3, "Tactics"),
		new Reward(4, "Heavy Weapons"),
		new Reward(5, "Gun Combat"),
		new Reward(6, "Stealth"),
	]),
	new TrainingTable(3, "Advanced Education (Min. EDU 8)", [
		new Reward(1, "Medic"),
		new Reward(2, "Survival"),
		new Reward(3, "Explosives"),
		new Reward(4, "Engineer"),
		new Reward(5, "Pilot"),
		new Reward(6, "Navigation"),
	]),
	new TrainingTable(4, "Officer (COMMISSIONED ONLY)", [
		new Reward(1, "Electronics"),
		new Reward(2, "Tactics"),
		new Reward(3, "Admin"),
		new Reward(4, "Advocate"),
		new Reward(5, "Diplomat"),
		new Reward(6, "Leadership"),
	]),
	new TrainingTable(5, "Support", [
		new Reward(1, "Electronics"),
		new Reward(2, "Mechanic"),
		new Reward(3, "Drive"), // TODO: Add Flyer as a OR option
		new Reward(4, "Medic"),
		new Reward(5, "Heavy Weapons"),
		new Reward(6, "Gun Combat"),
	]),
	new TrainingTable(6, "Star Marine", [
		new Reward(1, "Vacc Suit"),
		new Reward(2, "Athletics"),
		new Reward(3, "Gunner"),
		new Reward(4, "Melee: Blade"),
		new Reward(5, "Electronics"),
		new Reward(6, "Gun Combat"),
	]),
	new TrainingTable(7, "Ground Assault", [
		new Reward(1, "Vacc Suit"),
		new Reward(2, "Heavy Weapons"),
		new Reward(3, "Recon"),
		new Reward(4, "Melee: Blade"),
		new Reward(5, "Tactics: Military"),
		new Reward(6, "Gun Combat"),
	]),
];

const eventsTable: Event[] = [
	new Event(2, "Disaster! Roll on the Mishap table but you are not ejected from this career."),
	new Event(3, "Trapped behind enemy lines, you have to survive on your own. Gain one of Survival 1, Stealth 1, Deception 1 or Streetwise 1."),
	new Event(4, "You are assigned to the security staff of a space station. Increase Vacc Suit or Athletics (dexterity) by one level."),
	new Event(5, "You are given advanced training in a specialist field. Roll EDU 8+ to gain any one skill of your choice at level 1."),
	new Event(
		6,
		"You are assigned to an assault on an enemy fortress. Roll Melee or Gun Combat 8+ and gain Tactics (military) or Leadership if you succeed. If you fail, you are injured and lose 1 point from any physical characteristic."
	),
	new Event(7, "Life Event. Roll on the Life Events Table."),
	new Event(
		8,
		"You are on the front lines of a planetary assault and occupation. Gain one of Recon 1, Gun Combat 1, Leadership 1 or Electronics (comms) 1."
	),
	new Event(
		9,
		"A mission goes disastrously wrong due to your commander’s error or incompetence but you survive. If you report your commanding officer for their failure then you gain DM+2 to your next advancement roll and gain the officer as an Enemy. If you say nothing and protect them, gain them as an Ally."
	),
	new Event(10, "You are assigned to a black ops mission. Gain DM+2 to your next advancement roll."),
	new Event(
		11,
		"Your commanding officer takes an interest in your career. Either gain Tactics 1 or DM+4 to your next advancement roll thanks to their aid."
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
		"A mission goes wrong; you and several others are captured and mistreated by the enemy. Due to your injuries, you are discharged early. Gain your jailer as an Enemy and reduce your STR and DEX by one because of your injuries."
	),
	new Event(
		3,
		"A mission goes wrong and you are stranded behind enemy lines. Increase Stealth or Survival by one level but, due to the mission’s failure, you are ejected from the service."
	),
	new Event(
		4,
		"You are ordered to take part in a black ops mission that goes against your conscience. If you refuse you are ejected from the service. If you accept you may stay with the marines but gain the lone survivor as an Enemy."
	),
	new Event(
		5,
		"You are tormented by or quarrel with an officer or fellow marine. Gain that character as a Rival as they drive you out of the service."
	),
	new Event(6, "Injured. Roll on the Injury table (see page 49)."),
];

const musterOutTable: MusterOutRecord[] = [
	new MusterOutRecord(1, 2000, [new Item(1, "Armour")]),
	new MusterOutRecord(2, 5000, [new Reward(1, "INT +1")]),
	new MusterOutRecord(3, 5000, [new Reward(1, "EDU +1")]),
	new MusterOutRecord(4, 10000, [new Item(1, "Weapon")]),
	new MusterOutRecord(5, 20000, [new Item(1, "TAS Membership")]),
	new MusterOutRecord(6, 30000, [new Item(1, "Armour"), new Reward(2, "END +1")]),
	new MusterOutRecord(7, 40000, [new Reward(1, "SOC +2")]),
];

export const Marine: Career = new Career(6, "Marine", new DiceCheck(6, "END"), assignments, trainingTables, eventsTable, mishapTable, musterOutTable);
