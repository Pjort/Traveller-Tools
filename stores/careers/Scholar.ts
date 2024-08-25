import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event, Item, MusterOutRecord } from "#imports";

const assignments: Assignment[] = [
	new Assignment(
		1,
		new DiceCheck(6, "END"),
		new DiceCheck(6, "INT"),
		"Field Researcher",
		"You are an explorer or field researcher, equally at home in the laboratory or wilderness.",
		[
			new Rank(0, "", ""),
			new Rank(1, "", "Science 1"),
			new Rank(2, "", "Electronics: Computers 1"),
			new Rank(3, "", "Investigate 1"),
			new Rank(4, "", ""),
			new Rank(5, "", "Science 2"),
			new Rank(6, "", ""),
		]
	),
	new Assignment(
		2,
		new DiceCheck(4, "EDU"),
		new DiceCheck(8, "INT"),
		"Scientist",
		"You are a researcher in some corporation or research institution or a mad scientist in an orbiting laboratory.",
		[
			new Rank(0, "", ""),
			new Rank(1, "", "Science 1"),
			new Rank(2, "", "Electronics: Computers 1"),
			new Rank(3, "", "Investigate 1"),
			new Rank(4, "", ""),
			new Rank(5, "", "Science 2"),
			new Rank(6, "", ""),
		]
	),
	new Assignment(3, new DiceCheck(4, "EDU"), new DiceCheck(8, "EDU"), "Physician", "You are a doctor, healer or medical researcher.", [
		new Rank(0, "", ""),
		new Rank(1, "", "Medic 1"),
		new Rank(2, "", ""),
		new Rank(3, "", "Science 1"),
		new Rank(4, "", ""),
		new Rank(5, "", "Science 2"),
		new Rank(6, "", ""),
	]),
];

const trainingTables: TrainingTable[] = [
	new TrainingTable(1, "Personal Development", [
		new Reward(1, "INT +1"),
		new Reward(2, "EDU +1"),
		new Reward(3, "SOC +1"),
		new Reward(4, "DEX +1"),
		new Reward(5, "END +1"),
		new Reward(6, "Language"),
	]),
	new TrainingTable(2, "Service Skills", [
		new Reward(1, "Drive"), // TODO: Or Flyer
		new Reward(2, "Electronics"),
		new Reward(3, "Diplomat"),
		new Reward(4, "Medic"),
		new Reward(5, "Investigate"),
		new Reward(6, "Science"),
	]),
	new TrainingTable(3, "Advanced Education (Min. EDU 8)", [
		new Reward(1, "Art"),
		new Reward(2, "Advocate"),
		new Reward(3, "Electronics"),
		new Reward(4, "Language"),
		new Reward(5, "Engineer"),
		new Reward(6, "Science"),
	]),
	new TrainingTable(4, "Field Researcher", [
		new Reward(1, "Electronics"),
		new Reward(2, "Vacc Suit"),
		new Reward(3, "Navigation"),
		new Reward(4, "Survival"),
		new Reward(5, "Investigate"),
		new Reward(6, "Science"),
	]),
	new TrainingTable(5, "Scientist", [
		new Reward(1, "Admin"),
		new Reward(2, "Engineer"),
		new Reward(3, "Science"),
		new Reward(4, "Science"),
		new Reward(5, "Electronics"),
		new Reward(6, "Science"),
	]),
	new TrainingTable(6, "Physician", [
		new Reward(1, "Medic"),
		new Reward(2, "Electronics"),
		new Reward(3, "Investigate"),
		new Reward(4, "Medic"),
		new Reward(5, "Persuade"),
		new Reward(6, "Science"),
	]),
];

const eventsTable: Event[] = [
	new Event(2, "Disaster! Roll on the Mishap table but you are not ejected from this career."),
	new Event(
		3,
		"You are called upon to perform research that goes against your conscience. Accept and you gain an extra Benefit roll, a level in each of any two Science skill specialties and D3 Enemies."
	),
	new Event(
		4,
		"You are assigned to work on a secret project for a patron or organisation. Gain one of Medic 1, Science 1, Engineer 1, Electronics 1 or Investigate 1."
	),
	new Event(5, "You win a prestigious prize for your work, garnering both the praise and envy of your peers. Gain DM+1 to any one Benefit roll."),
	new Event(6, "You are given advanced training in a specialist field. Roll EDU 8+ to gain any one skill of your choice at level 1."),
	new Event(7, "Life Event. Roll on the Life Events Table."),
	new Event(
		8,
		"You have the opportunity to cheat in some fashion, advancing your career and research by stealing another’s work, using an alien device, taking a shortcut and so forth. If you refuse, you gain nothing. If you accept, roll Deception 8+ or Admin 8+. If you succeed, you gain DM+2 to any one Benefit roll and may increase any skill by one level but also gain an Enemy. If you fail, gain an Enemy and lose one Benefit roll from this career."
	),
	new Event(9, "You make a breakthrough in your field. Gain DM+2 to your next advancement roll."),
	new Event(
		10,
		"You become entangled in a bureaucratic or legal morass that distracts you from your work. Gain one of Admin 1, Advocate 1, Persuade 1 or Diplomat 1."
	),
	new Event(
		11,
		"You work for an eccentric but brilliant mentor, who becomes an Ally. Either increase Science by one level or DM+4 to your next advancement roll thanks to their aid."
	),
	new Event(12, "Your work leads to a considerable breakthrough. You are automatically promoted."),
];

const mishapTable: Event[] = [
	new Event(
		1,
		"Severely injured (this is the same as a result of 2 on the Injury table). Alternatively, roll twice on the Injury table and take the lower result."
	),
	new Event(
		2,
		"A disaster leaves several injured and others blame you, forcing you to leave your career. Roll on the Injury table twice, taking the higher result and gain a Rival."
	),
	new Event(
		3,
		"The planetary government interferes with your research for political or religious reasons. If you continue with your work openly, increase Science by one level and gain an Enemy. If you continue with your work secretly, increase Science by one level and reduce your SOC by 2. This mishap does not cause you to leave this career."
	),
	new Event(
		4,
		"An expedition or voyage goes wrong, leaving you stranded in the wilderness. Gain Survival 1 or Athletics (dexterity or endurance) 1. By the time you find your way home, your job is gone."
	),
	new Event(
		5,
		"Your work is sabotaged by unknown parties. You may salvage what you can and give up (leave the career but retain this term’s Benefit roll) or start again from scratch (lose all Benefit rolls from this career but you do not have to leave)."
	),
	new Event(6, "A rival researcher blackens your name or steals your research. Gain a Rival but you do not have to leave this career."),
];

const musterOutTable: MusterOutRecord[] = [
	new MusterOutRecord(1, 5000, [new Reward(1, "INT +1")]),
	new MusterOutRecord(2, 10000, [new Reward(1, "EDU +1")]),
	new MusterOutRecord(3, 20000, [new Item(1, "Two Ship Shares")]),
	new MusterOutRecord(4, 30000, [new Reward(1, "SOC +1")]),
	new MusterOutRecord(5, 40000, [new Item(1, "Scientific Equipment")]),
	new MusterOutRecord(6, 60000, [new Item(1, "Lap Ship")]),
	new MusterOutRecord(7, 100000, [new Item(1, "Lap Ship")]),
];

export const Scholar: Career = new Career(
	11,
	"Scholar",
	new DiceCheck(6, "INT"),
	assignments,
	trainingTables,
	eventsTable,
	mishapTable,
	musterOutTable
);
