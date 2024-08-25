import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event, Item, MusterOutRecord } from "#imports";

const assignments: Assignment[] = [
	new Assignment(
		1,
		new DiceCheck(5, "END"),
		new DiceCheck(9, "EDU"),
		"Courier",
		"You are responsible for shuttling messages and high value packages around the galaxy.",
		[
			new Rank(0, "", ""),
			new Rank(1, "Scout", "Vacc Suit 1"),
			new Rank(2, "", ""),
			new Rank(3, "Senior Scout", "Pilot 1"),
			new Rank(4, "", ""),
			new Rank(5, "", ""),
			new Rank(6, "", ""),
		]
	),
	new Assignment(2, new DiceCheck(6, "END"), new DiceCheck(8, "INT"), "Surveyor:", "You visit border worlds and assess their worth.", [
		new Rank(0, "", ""),
		new Rank(1, "Scout", "Vacc Suit 1"),
		new Rank(2, "", ""),
		new Rank(3, "Senior Scout", "Pilot 1"),
		new Rank(4, "", ""),
		new Rank(5, "", ""),
		new Rank(6, "", ""),
	]),
	new Assignment(
		3,
		new DiceCheck(7, "END"),
		new DiceCheck(7, "EDU"),
		"Explorer",
		"You go wherever the map is blank, exploring unknown worlds and uncharted space.",
		[
			new Rank(0, "", ""),
			new Rank(1, "Scout", "Vacc Suit 1"),
			new Rank(2, "", ""),
			new Rank(3, "Senior Scout", "Pilot 1"),
			new Rank(4, "", ""),
			new Rank(5, "", ""),
			new Rank(6, "", ""),
		]
	),
];

const trainingTables: TrainingTable[] = [
	new TrainingTable(1, "Personal Development", [
		new Reward(1, "STR +1"),
		new Reward(2, "DEX +1"),
		new Reward(3, "END +1"),
		new Reward(4, "INT +1"),
		new Reward(5, "EDU +1"),
		new Reward(6, "Jack-of-all-Trades"),
	]),
	new TrainingTable(2, "Service Skills", [
		new Reward(1, "Pilot"), // TODO:Pilot: Small Craft or Spacecraft
		new Reward(2, "Survival"),
		new Reward(3, "Mechanic"),
		new Reward(4, "Astrogation"),
		new Reward(5, "Vacc Suit"),
		new Reward(6, "Gun Combat"),
	]),
	new TrainingTable(3, "Advanced Education (Min. EDU 8)", [
		new Reward(1, "Medic"),
		new Reward(2, "Language"),
		new Reward(3, "Seafarer"),
		new Reward(4, "Explosives"),
		new Reward(5, "Science"),
		new Reward(6, "Jack-of-all-Trades"),
	]),
	new TrainingTable(4, "Courier", [
		new Reward(1, "Electronics"),
		new Reward(2, "Flyer"),
		new Reward(3, "Pilot: Spacecraft"),
		new Reward(4, "Engineer"),
		new Reward(5, "Athletics"),
		new Reward(6, "Astrogation"),
	]),
	new TrainingTable(5, "Surveyor", [
		new Reward(1, "Electronics"),
		new Reward(2, "Persuade"),
		new Reward(3, "Pilot"),
		new Reward(4, "Navigation"),
		new Reward(5, "Diplomat"),
		new Reward(6, "Streetwise"),
	]),
	new TrainingTable(6, "Explorer", [
		new Reward(1, "Electronics"),
		new Reward(2, "Pilot"),
		new Reward(3, "Engineer"),
		new Reward(4, "Science"),
		new Reward(5, "Stealth"),
		new Reward(6, "Recon"),
	]),
];

const eventsTable: Event[] = [
	new Event(2, "Disaster! Roll on the Mishap table but you are not ejected from this career."),
	new Event(
		3,
		"Your ship is ambushed by enemy vessels. Either run and roll Pilot 8+ to escape, or treat with them and roll Persuade 10+ to bargain with them. If you fail the check, then your ship is destroyed and you may not re-enlist in the Scouts at the end of this term. If you succeed, you survive and gain Electronics (sensors) 1. Either way, gain an Enemy."
	),
	new Event(4, "You survey an alien world. Gain one of Animals (riding or training) 1, Survival 1, Recon 1 or Science 1."),
	new Event(5, "You perform an exemplary service for the scouts. Gain DM+1 to any one Benefit roll."),
	new Event(
		6,
		"You spend several years jumping from world to world in your scout ship. Gain one of Astrogation 1, Electronics 1, Navigation 1, Pilot (small craft) 1 or Mechanic 1."
	),
	new Event(7, "Life Event. Roll on the Life Events Table."),
	new Event(
		8,
		"When dealing with an alien species , you have an opportunity to gather extra intelligence about them. Roll either Electronics 8+ or Deception 8+. If you succeed, gain an Ally in the Imperium and DM+2 to your next advancement roll. If you fail, roll on the Mishap table but you are not ejected from this career."
	),
	new Event(
		9,
		"Your scout ship is one of the first on the scene to rescue the survivors of a disaster. Roll either Medic 8+ or Engineer 8+. If you succeed, gain a Contact and DM+2 to your next advancement roll. If you fail, gain an Enemy."
	),
	new Event(
		10,
		"You spend a great deal of time on the fringes of Charted Space. Roll Survival 8+ or Pilot 8+. If you succeed, gain a Contact in an alien species and one level in any skill of your choice. If you fail, roll on the Mishap table but you are not ejected from this career."
	),
	new Event(
		11,
		"You serve as the courier for an important message from the Imperium. Either gain one level of Diplomat or DM+4 to your next advancement roll."
	),
	new Event(12, "You discover a world, item or information of worth to the Imperium. You are automatically promoted."),
];

const mishapTable: Event[] = [
	new Event(
		1,
		"Severely injured (this is the same as a result of 2 on the Injury table). Alternatively, roll twice on the Injury table and take the lower result."
	),
	new Event(2, "Psychologically damaged by your time in the scouts. Reduce your INT or SOC by 1."),
	new Event(
		3,
		"Your ship is damaged and you have to hitch-hike your way back across the stars to the nearest scout base. Gain 1D Contacts and D3 Enemies."
	),
	new Event(4, "You inadvertently cause a conflict between the Imperium and a minor world or species. Gain a Rival and Diplomat 1."),
	new Event(5, "You have no idea what happened to you – they found your ship drifting on the fringes of friendly space."),
	new Event(6, "Injured. Roll on the Injury table (see page 49)."),
];

const musterOutTable: MusterOutRecord[] = [
	new MusterOutRecord(1, 20000, [new Item(1, "Ship Share")]),
	new MusterOutRecord(2, 20000, [new Reward(1, "INT +1")]),
	new MusterOutRecord(3, 30000, [new Reward(1, "EDU +1")]),
	new MusterOutRecord(4, 30000, [new Item(1, "Weapon")]),
	new MusterOutRecord(5, 50000, [new Item(1, "Weapon")]),
	new MusterOutRecord(6, 50000, [new Item(1, "Scout Ship")]),
	new MusterOutRecord(7, 50000, [new Item(1, "Scout Ship")]),
];

export const Scout: Career = new Career(12, "Scout", new DiceCheck(5, "INT"), assignments, trainingTables, eventsTable, mishapTable, musterOutTable);
