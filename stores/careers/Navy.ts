import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event, Item, MusterOutRecord } from "#imports";

const assignments: Assignment[] = [
	new Assignment(
		1,
		new DiceCheck(5, "INT"),
		new DiceCheck(7, "EDU"),
		"Line/Crew",
		"You serve as a general crewman or officer on a ship of the line.",
		[
			new Rank(0, "Crewman", ""),
			new Rank(1, "Able Spacehand", "Mechanic 1"),
			new Rank(2, "Petty Officer, 3rd class", "Vacc Suit 1"),
			new Rank(3, "Petty Officer, 2nd class", ""),
			new Rank(4, "Petty Officer, 1st class", "END +1"),
			new Rank(5, "Chief Petty Officer", ""),
			new Rank(6, "Master Chief", ""),
		]
	),
	new Assignment(2, new DiceCheck(6, "INT"), new DiceCheck(6, "EDU"), "Engineer/Gunner", "You serve as a specialist technician on a starship.", [
		new Rank(0, "Crewman", ""),
		new Rank(1, "Able Spacehand", "Mechanic 1"),
		new Rank(2, "Petty Officer, 3rd class", "Vacc Suit 1"),
		new Rank(3, "Petty Officer, 2nd class", ""),
		new Rank(4, "Petty Officer, 1st class", "END +1"),
		new Rank(5, "Chief Petty Officer", ""),
		new Rank(6, "Master Chief", ""),
	]),
	new Assignment(3, new DiceCheck(7, "DEX"), new DiceCheck(5, "EDU"), "Flight", "You are a pilot of a shuttle, fighter or other light craft.", [
		new Rank(0, "Crewman", ""),
		new Rank(1, "Able Spacehand", "Mechanic 1"),
		new Rank(2, "Petty Officer, 3rd class", "Vacc Suit 1"),
		new Rank(3, "Petty Officer, 2nd class", ""),
		new Rank(4, "Petty Officer, 1st class", "END +1"),
		new Rank(5, "Chief Petty Officer", ""),
		new Rank(6, "Master Chief", ""),
	]),
];

const trainingTables: TrainingTable[] = [
	new TrainingTable(1, "Personal Development", [
		new Reward(1, "STR +1"),
		new Reward(2, "DEX +1"),
		new Reward(3, "END +1"),
		new Reward(4, "INT +1"),
		new Reward(5, "EDU +1"),
		new Reward(6, "SOC +1"),
	]),
	new TrainingTable(2, "Service Skills", [
		new Reward(1, "Pilot"),
		new Reward(2, "Vacc Suit"),
		new Reward(3, "Athletics"),
		new Reward(4, "Gunner"),
		new Reward(5, "Mechanic"),
		new Reward(6, "Gun Combat"),
	]),
	new TrainingTable(3, "Advanced Education (Min. EDU 8)", [
		new Reward(1, "Electronics"),
		new Reward(2, "Astronavigation"),
		new Reward(3, "Engineer"),
		new Reward(4, "Flyer"),
		new Reward(5, "Medic"),
		new Reward(6, "Admin"),
	]),
	new TrainingTable(4, "Officer (COMMISSIONED ONLY)", [
		new Reward(1, "Leadership"),
		new Reward(2, "Electronics"),
		new Reward(3, "Pilot"),
		new Reward(4, "Melee: Blade"),
		new Reward(5, "Admin"),
		new Reward(6, "Tactics: Naval"),
	]),
	new TrainingTable(5, "Line/Crew", [
		new Reward(1, "Electronics"),
		new Reward(2, "Mechanic"),
		new Reward(3, "Gun Combat"),
		new Reward(4, "Flyer"),
		new Reward(5, "Melee"),
		new Reward(6, "Vacc Suit"),
	]),
	new TrainingTable(6, "Engineer/Gunner", [
		new Reward(1, "Enigneer"),
		new Reward(2, "Mechanic"),
		new Reward(3, "Electronics"),
		new Reward(4, "Engineer"),
		new Reward(5, "Gunner"),
		new Reward(6, "Flyer"),
	]),
	new TrainingTable(7, "Flight", [
		new Reward(1, "Pilot"),
		new Reward(2, "Flyer"),
		new Reward(3, "Gunner"),
		new Reward(4, "Pilot: Small Craft"),
		new Reward(5, "Astrogation"),
		new Reward(6, "Electronics"),
	]),
];

const eventsTable: Event[] = [
	new Event(2, "Disaster! Roll on the Mishap table but you are not ejected from this career."),
	new Event(
		3,
		"You join a gambling circle on board. Gain Gambler 1 or Deception 1. If you wish, throw Gambler 8+. If you succeed, gain an extra Benefit roll from this career; if you fail, you lose one Benefit roll from this career."
	),
	new Event(4, "You are given a special assignment or duty on board ship. Gain DM+1 to any one Benefit roll."),
	new Event(5, "You are given advanced training in a specialist field. Roll EDU 8+ to gain one level in any skill you already have."),
	new Event(6, "Your vessel participates in a notable military engagement. Gain one of Electronics 1, Engineer 1, Gunner 1 or Pilot 1."),
	new Event(7, "Life Event. Roll on the Life Events Table."),
	new Event(8, "Your vessel participates in a diplomatic mission. Gain one of Recon 1, Diplomat 1, Steward 1 or a Contact."),
	new Event(
		9,
		"You foil an attempted crime on board, such as mutiny, sabotage, smuggling or conspiracy. Gain an Enemy but also gain DM+2 to your next advancement roll in the Navy."
	),
	new Event(
		10,
		"You have the opportunity to abuse your position for profit. If you do so, gain an extra Benefit roll from this term. Refuse and you get DM+2 to your next advancement roll."
	),
	new Event(
		11,
		"Your commanding officer takes an interest in your career. Either gain Tactics (naval) 1 or DM+4 to your next advancement roll thanks to their aid."
	),
	new Event(12, "You display heroism in battle, saving the whole ship. You automatically pass your next promotion or commission roll."),
];

const mishapTable: Event[] = [
	new Event(
		1,
		"Severely injured in action (this is the same as a result of 2 on the Injury table). Alternatively, roll twice on the Injury table and take the lower result."
	),
	new Event(
		2,
		"Placed in the frozen watch (cryogenically stored on board ship) and revived improperly. Reduce STR, DEX or END by 1 due to muscle wastage. You are not ejected from this career."
	),
	new Event(
		3,
		"During a battle, defeat or victory depends on your actions. You must make an 8+ roll using a skill that depends on your branch: Electronics (sensors) or Gunner if you are crew, Mechanic or Vacc Suit if you are engineer/gunner and Pilot (small craft or spacecraft) or Tactics (naval) if you are flight. If you fail, the ship suffers severe damage and you are blamed for the disaster. You are court-martialled and discharged. If you succeed, your efforts ensure that you are honourably discharged. You still leave the career but may keep your Benefit roll from this term."
	),
	new Event(
		4,
		"You are blamed for an accident that causes the death of several crew members. If you were responsible, then you gain one free roll on the Skills and Training tables before you are ejected from this career as your guilt drives you to excel. If you were not, then gain the officer who blamed you as an Enemy but you keep your Benefit roll from this term."
	),
	new Event(
		5,
		"You are tormented by or quarrel with an officer or fellow crewman. Gain that character as a Rival, as they force you out of the Navy."
	),
	new Event(6, "Injured. Roll on the Injury table (see page 49)."),
];

const musterOutTable: MusterOutRecord[] = [
	new MusterOutRecord(1, 1000, [new Item(1, "Personal Vehicle"), new Item(2, "Ship Share")]),
	new MusterOutRecord(2, 5000, [new Reward(1, "INT +1")]),
	new MusterOutRecord(3, 5000, [new Reward(1, "EDU +1"), new Item(2, "two Ship Shares")]),
	new MusterOutRecord(4, 10000, [new Item(1, "Weapon")]),
	new MusterOutRecord(5, 20000, [new Item(1, "TAS Membership")]),
	new MusterOutRecord(6, 50000, [new Item(1, "Ships's Boat"), new Item(2, "two Ship Shares")]),
	new MusterOutRecord(7, 50000, [new Reward(1, "SOC +2")]),
];

export const Navy: Career = new Career(8, "Navy", new DiceCheck(6, "INT"), assignments, trainingTables, eventsTable, mishapTable, musterOutTable);
