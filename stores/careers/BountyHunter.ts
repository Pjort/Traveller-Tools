import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event, Item, MusterOutRecord } from "#imports";

const assignments: Assignment[] = [
	new Assignment(
		1,
		new DiceCheck(6, "EDU"),
		new DiceCheck(6, "REP"),
		"Tech Ops",
		"You run support from a hideout, safe house or base of operations.",
		[
			new Rank(0, "", ""),
			new Rank(1, "", "Electronics 1"),
			new Rank(2, "", ""),
			new Rank(3, "", "Mechanics 1"),
			new Rank(4, "", ""),
			new Rank(5, "", "REP +1"),
			new Rank(6, "", ""),
		]
	),
	new Assignment(2, new DiceCheck(7, "STR"), new DiceCheck(5, "REP"), "Hunter", "You are the one in the field who is sent after marks.", [
		new Rank(0, "", ""),
		new Rank(1, "", "Gun Combat 1"),
		new Rank(2, "", ""),
		new Rank(3, "", "Streetwise 1"),
		new Rank(4, "", ""),
		new Rank(5, "", "REP +1"),
		new Rank(6, "", ""),
	]),
	new Assignment(3, new DiceCheck(5, "INT"), new DiceCheck(7, "REP"), "Fixer", "You are responsible for finding and negotiating contracts.", [
		new Rank(0, "", ""),
		new Rank(1, "", "Broker 1"),
		new Rank(2, "", ""),
		new Rank(3, "", "Deception 1"),
		new Rank(4, "", ""),
		new Rank(5, "", "REP +1"),
		new Rank(6, "", ""),
	]),
];

const trainingTables: TrainingTable[] = [
	new TrainingTable(1, "Personal Development", [
		new Reward(1, "STR +1"),
		new Reward(2, "DEX +1"),
		new Reward(3, "END +1"),
		new Reward(4, "INT +1"),
		new Reward(5, "Athletics"),
		new Reward(6, "Gambler"),
	]),
	new TrainingTable(2, "Service Skills", [
		new Reward(1, "Carouse"),
		new Reward(2, "Deception"),
		new Reward(3, "Electronics"),
		new Reward(4, "Gun Combat"),
		new Reward(5, "Investigate"),
		new Reward(6, "Streetwise"),
	]),
	new TrainingTable(3, "Advanced Education (Min. EDU 8)", [
		new Reward(1, "Animals"),
		new Reward(2, "Astrogation"),
		new Reward(3, "Explosives"),
		new Reward(4, "Tactics: Military"),
		new Reward(5, "Medic"),
		new Reward(6, "Pilot"),
	]),
	new TrainingTable(4, "Tech Ops", [
		new Reward(1, "Admin"),
		new Reward(2, "Electronics"),
		new Reward(3, "Electronics"),
		new Reward(4, "Investigate"),
		new Reward(5, "Mechanic"),
		new Reward(6, "Science"),
	]),
	new TrainingTable(5, "Hunter", [
		new Reward(1, "Flyer"), // TODO: or drive
		new Reward(2, "Gun Combat"),
		new Reward(3, "Melee"),
		new Reward(4, "Navigation"),
		new Reward(5, "Recon"),
		new Reward(6, "Stealth"),
	]),
	new TrainingTable(6, "Fixer", [
		new Reward(1, "Advocate"),
		new Reward(2, "Broker"),
		new Reward(3, "Diplomat"),
		new Reward(4, "Deception"),
		new Reward(5, "Persuade"),
		new Reward(6, "Streetwise"),
	]),
];

const eventsTable: Event[] = [
	new Event(2, "Disaster! Roll on the Mishap table but you are not ejected from this career."),
	new Event(
		3,
		"You chase a high profile bounty but another bounty hunter is already on the trail. Roll Investigate 8+. If you fail, roll on the Mishaps table. If you succeed, gain REP +1 and increase one of these skills by one level: Athletics, Deception, Gun Combat, Investigate, Persuade, Stealth or Streetwise. Either way, the bounty hunter becomes a Rival."
	),
	new Event(4, "You successfully complete a difficult bounty and are well rewarded for your efforts. Gain REP +1 and DM+1 to one Benefit roll."),
	new Event(5, "Your network of contacts grows. Gain D3 Contacts."),
	new Event(
		6,
		"You receive advanced training, formal or otherwise. Roll INT 8+ to increase any one of the following skills you already possess by one level: Engineer, Explosives, Gunner, Pilot, Survival or Vacc Suit. If you do not have any of these skills, pick one and receive it at level 1."
	),
	new Event(7, "Life Event. Roll on the Life Events Table."),
	new Event(8, "You develop a new understanding in the use of ranged weaponry. Gain one level in Gun Combat or Heavy Weapons."),
	new Event(
		9,
		"You accept a bounty to bring in a corrupt politician. Roll Investigate 8+ or Streetwise 8+. If you succeed, gain REP +1 and DM+1 to one Benefit roll. If you fail, roll on the Mishaps table and gain an Enemy."
	),
	new Event(10, "You pull out all the stops to bring in a mark. Gain REP +2."),
	new Event(11, "You work with a more accomplished bounty hunter. Gain REP +1 and count them as an Ally."),
	new Event(
		12,
		"You bring in an infamous criminal, who is well-known for the notorious crimes they committed. Gain REP +2 and roll twice on the Benefits table."
	),
];

const mishapTable: Event[] = [
	new Event(
		1,
		"You are severely injured while attempting to apprehend a mark (this is the same as a result of 2 on the Injury table). Alternatively, roll twice on the Injury table and take the lower result. Lose REP -1."
	),
	new Event(
		2,
		"A criminal you have successfully tracked down offers you a deal to allow them to go. If you accept, you cannot claim the bounty and lose REP -1 but gain Cr50000. If you refuse, you make an Enemy of your mark as well as D3 of their friends and allies."
	),
	new Event(
		3,
		"In the process of investigating your mark, you discover the person who hired you is equally complicit in the crime. Roll Broker, Diplomat or Persuade 8+. If you succeed, you make a deal that absolves you of the need to fulfil your contract while allowing your client to save face or avoid legal consequences. If you fail, your mark takes the fall and you become known as unreliable. Lose REP -1."
	),
	new Event(
		4,
		"You accept a contract that later goes against your moral code and you cannot complete it in good conscience. Gain an Enemy and lose REP -1."
	),
	new Event(
		5,
		"Your efforts to find a mark attract the attention of their associates and they injure you in an ambush. Roll on the Injury table and lose REP -1."
	),
	new Event(
		6,
		"Something goes terribly wrong during pursuit of a mark and you must either suffer a hit to your reputation or engage with the worst elements of the criminal underworld to succeed. Choose between losing REP -1 or owing either, at the Referee’s choice, a great favour or MCr1 (with 20% interest accruing every year once you muster out and start adventuring) to a crime lord."
	),
];

const musterOutTable: MusterOutRecord[] = [
	new MusterOutRecord(1, 5000, [new Relation(1, "Contact")]),
	new MusterOutRecord(2, 5000, [new Item(1, "Weapon")]),
	new MusterOutRecord(3, 10000, [new Item(1, "Armour")]),
	new MusterOutRecord(4, 50000, [new Relation(1, "D3 Contacts")]),
	new MusterOutRecord(5, 100000, [new Reward(1, "REP +1")]),
	new MusterOutRecord(6, 100000, [new Item(1, "Guild Membership")]),
	new MusterOutRecord(7, 200000, [new Item(1, "Ship Share")]),
	// new MusterOutRecord(8, 250000, [new Item(1, "Free Trader"), new Item(2, "Safari Ship"), new Item(3, "Yacht")]),
];

export const BountyHunter: Career = new Career(
	15,
	"Bounty Hunter",
	new DiceCheck(6, "INT"),
	assignments,
	trainingTables,
	eventsTable,
	mishapTable,
	musterOutTable
);
