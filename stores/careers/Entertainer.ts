import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event, Item, MusterOutRecord } from "#imports";

const assignments: Assignment[] = [
	new Assignment(1, new DiceCheck(6, "SOC"), new DiceCheck(6, "INT"), "Artist", "You are a writer, holographer or other creative.", [
		new Rank(0, "", ""),
		new Rank(1, "", "Art 1"),
		new Rank(2, "", ""),
		new Rank(3, "", "Investigate 1"),
		new Rank(4, "", ""),
		new Rank(5, "Famous Artist", "SOC +1"),
		new Rank(6, "", ""),
	]),
	new Assignment(
		2,
		new DiceCheck(7, "EDU"),
		new DiceCheck(5, "INT"),
		"Journalist",
		"You report on local or galactic events for a news feed, the TAS or other organisation.",
		[
			new Rank(0, "", ""),
			new Rank(1, "Freelancer", "Electronics: Comms 1"),
			new Rank(2, "Staff Writer", "Investigate 1"),
			new Rank(3, "", ""),
			new Rank(4, "Correspondent", "Persuade 1"),
			new Rank(5, "", ""),
			new Rank(6, "Senior Correspondent", "SOC +1"),
		]
	),
	new Assignment(
		3,
		new DiceCheck(5, "INT"),
		new DiceCheck(7, "DEX"),
		"Performer",
		"You are an actor, dancer, acrobat, professional athlete or other public performer.",
		[
			new Rank(0, "", ""),
			new Rank(1, "", "DEX +1"),
			new Rank(2, "", ""),
			new Rank(3, "", "STR +1"),
			new Rank(4, "", ""),
			new Rank(5, "Famous Performer", "SOC +1"),
			new Rank(6, "", ""),
		]
	),
];

const trainingTables: TrainingTable[] = [
	new TrainingTable(1, "Personal Development", [
		new Reward(1, "DEX +1"),
		new Reward(2, "INT +1"),
		new Reward(3, "SOC +1"),
		new Reward(4, "Language"),
		new Reward(5, "Carouse"),
		new Reward(6, "Jack-of-all-Trades"),
	]),
	new TrainingTable(2, "Service Skills", [
		new Reward(1, "Art"),
		new Reward(2, "Carouse"),
		new Reward(3, "Deception"),
		new Reward(4, "Drive"),
		new Reward(5, "Persuade"),
		new Reward(6, "Steward"),
	]),
	new TrainingTable(3, "Advanced Education (Min. EDU 8)", [
		new Reward(1, "Advocate"),
		new Reward(2, "Broker"),
		new Reward(3, "Deception"),
		new Reward(4, "Science"),
		new Reward(5, "Streetwise"),
		new Reward(6, "Diplomat"),
	]),
	new TrainingTable(4, "Artist", [
		new Reward(1, "Art"),
		new Reward(2, "Carouse"),
		new Reward(3, "Electronics: Computers"),
		new Reward(4, "Gambler"),
		new Reward(5, "Persuade"),
		new Reward(6, "Profession"),
	]),
	new TrainingTable(5, "Journalist", [
		new Reward(1, "Art"), // TODO: Holography or Write
		new Reward(2, "Electronics"),
		new Reward(3, "Drive"),
		new Reward(4, "Investigate"),
		new Reward(5, "Recon"),
		new Reward(6, "Streetwise"),
	]),
	new TrainingTable(6, "Performer", [
		new Reward(1, "Art"), // TODO: Performer or Instrument
		new Reward(2, "Athletics"),
		new Reward(3, "Carouse"),
		new Reward(4, "Deception"),
		new Reward(5, "Stealth"),
		new Reward(6, "Streetwise"),
	]),
];

const eventsTable: Event[] = [
	new Event(2, "Disaster! Roll on the Mishap table but you are not ejected from this career."),
	new Event(
		3,
		"You are invited to take part in a controversial event or exhibition. Roll Art or Investigate 8+. If you succeed, gain one SOC. If you fail, lose one SOC."
	),
	new Event(4, "You are a part of your homeworld’s celebrity circles. Gain one of Carouse 1, Persuade 1, Steward 1 or a Contact."),
	new Event(5, "One of your works is especially well received and popular, making you a minor celebrity. Gain DM+1 to any one Benefit roll."),
	new Event(6, "You gain a patron in the arts. Gain DM+2 to your next advancement roll and an Ally."),
	new Event(7, "Life Event. Roll on the Life Events Table."),
	new Event(
		8,
		"You have the opportunity to criticise or even bring down a questionable political leader on your homeworld. If you refuse and support the leader, you gain nothing. If you accept, gain an Enemy and roll Art or Persuade 8+. If you succeed, gain one level in any skill you already have. If you fail, increase a skill anyway and roll on the Mishap table."
	),
	new Event(9, "You go on a tour of the sector, visiting several worlds. Gain D3 Contacts."),
	new Event(
		10,
		"One of your pieces of art is stolen and the investigation brings you into the criminal underworld. Gain one of Streetwise 1, Investigate 1, Recon 1 or Stealth 1."
	),
	new Event(11, "As an artist, you lead a strange and charmed life. Go to the Life Events Table and have an Unusual Event."),
	new Event(12, "You win a prestigious prize. You are automatically promoted."),
];

const mishapTable: Event[] = [
	new Event(
		1,
		"Severely injured (this is the same as a result of 2 on the Injury table). Alternatively, roll twice on the Injury table and take the lower result."
	),
	new Event(2, "You expose or are involved in a scandal of some sort."),
	new Event(3, "Public opinion turns on you. Reduce your SOC by 1."),
	new Event(
		4,
		"You are betrayed by a peer. One of your Contacts or Allies betrays you, ending your career. That Contact or Ally becomes a Rival or Enemy. If you have no Contacts or Allies, then you are betrayed by someone you never saw coming and still gain a Rival or Enemy."
	),
	new Event(
		5,
		"An investigation, tour, project or expedition goes wrong, stranding you far from home. Gain one of Survival 1, Pilot 1, Persuade 1 or Streetwise 1."
	),
	new Event(
		6,
		"You are forced out because of censorship or controversy. What truth did you get too close to? You gain DM+2 to the qualification roll for your next career."
	),
];

const musterOutTable: MusterOutRecord[] = [
	new MusterOutRecord(1, 0, [new Relation(1, "Contact")]),
	new MusterOutRecord(2, 0, [new Reward(1, "SOC +1")]),
	new MusterOutRecord(3, 10000, [new Relation(1, "Contact")]),
	new MusterOutRecord(4, 10000, [new Reward(1, "SOC +1")]),
	new MusterOutRecord(5, 40000, [new Reward(1, "INT +1")]),
	new MusterOutRecord(6, 40000, [new Item(1, "Two Ship Shares")]),
	new MusterOutRecord(7, 80000, [new Reward(1, "SOC +1"), new Reward(2, "EDU +1")]),
];

export const Entertainer: Career = new Career(
	5,
	"Entertainer",
	new DiceCheck(5, "DEX or INT"),
	assignments,
	trainingTables,
	eventsTable,
	mishapTable,
	musterOutTable
);
