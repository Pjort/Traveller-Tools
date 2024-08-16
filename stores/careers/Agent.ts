import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event } from "#imports";

export const Agent: Career = new Career(
	1,
	"Agent",
	new DiceCheck(6, "INT"),
	[
		new Assignment(1, new DiceCheck(6, "END"), new DiceCheck(6, "INT"), "Law Enforcement", "You are a police officer or detective.", [
			new Rank(0, "Rookie", ""),
			new Rank(1, "Corporal", "Streetwise 1"),
			new Rank(2, "Sergeant", ""),
			new Rank(3, "Detective", ""),
			new Rank(4, "Lieutenant", "Investigate 1"),
			new Rank(5, "Chief", "Admin 1"),
			new Rank(6, "Commissioner", "SOC +1"),
		]),
		new Assignment(2, new DiceCheck(7, "INT"), new DiceCheck(5, "INT"), "Intelligence", "You work as a spy or saboteur.", [
			new Rank(0, "", ""),
			new Rank(1, "Agent", "Deception 1"),
			new Rank(2, "Field Agent", "Investigate 1"),
			new Rank(3, "Field Agent", ""),
			new Rank(4, "Special Agent", "Gun Combat 1"),
			new Rank(5, "Assistant Director", ""),
			new Rank(6, "Director", ""),
		]),
		new Assignment(
			3,
			new DiceCheck(5, "INT"),
			new DiceCheck(7, "INT"),
			"Corporate",
			"You work for a corporation, spying on rival organisations.",
			[
				new Rank(0, "", ""),
				new Rank(1, "Agent", "Deception 1"),
				new Rank(2, "Field Agent", "Investigate 1"),
				new Rank(3, "Field Agent", ""),
				new Rank(4, "Special Agent", "Gun Combat 1"),
				new Rank(5, "Assistant Director", ""),
				new Rank(6, "Director", ""),
			]
		),
	],
	[
		new TrainingTable(1, "Personal Development", [
			new Reward(1, "Gun Combat"),
			new Reward(2, "DEX +1"),
			new Reward(3, "END +1"),
			new Reward(4, "Melee"),
			new Reward(5, "INT +1"),
			new Reward(6, "Athletics"),
		]),
		new TrainingTable(2, "Service Skills", [
			new Reward(1, "Streetwise"),
			new Reward(2, "Drive"),
			new Reward(3, "Investigate"),
			new Reward(4, "Flyer"),
			new Reward(5, "Recon"),
			new Reward(6, "Gun Combat"),
		]),
		new TrainingTable(3, "Advanced Education (Min. EDU 8)", [
			new Reward(1, "Advocate"),
			new Reward(2, "Language"),
			new Reward(3, "Explosives"),
			new Reward(4, "Medic"),
			new Reward(5, "Vacc Suit"),
			new Reward(6, "Electronics"),
		]),
		new TrainingTable(4, "Law Enforcement", [
			new Reward(1, "Investigate"),
			new Reward(2, "Recon"),
			new Reward(3, "Streetwise"),
			new Reward(4, "Stealth"),
			new Reward(5, "Melee"),
			new Reward(6, "Advocate"),
		]),
		new TrainingTable(5, "Intelligence", [
			new Reward(1, "Investigate"),
			new Reward(2, "Recon"),
			new Reward(3, "Electronics: Comms"),
			new Reward(4, "Stealth"),
			new Reward(5, "Persuade"),
			new Reward(6, "Deception"),
		]),
		new TrainingTable(6, "Corporate", [
			new Reward(1, "Investigate"),
			new Reward(2, "Electronics: Computers"),
			new Reward(3, "Stealth"),
			new Reward(4, "Carouse"),
			new Reward(5, "Deception"),
			new Reward(6, "Streetwise"),
		]),
	],
	[
		new Event(2, "Disater! Roll on the Mishap Table but you are not ejected from this career."),
		new Event(
			3,
			"An investigation takes on a dangerous turn. Make Investigate 8+ or Streetwise 8+. If you fail, roll on the Mishap Table. If you succeed, increase one of these skills by one level: Deception, Jack-of-all-Trades, Persuade or Tactics."
		),
		new Event(4, "You complete a mission for your superiors and are suitably rewarded. Gain DM+1 to any one Benefit rill from this career."),
		new Event(5, "You establish a network of contacts. Gain D3 Contacts."),
		new Event(6, "You are given advanced training in a specialist field. Roll EDU 8+ to increase any one skill you already have by one level."),
		new Event(7, "Life Event. Roll on the Life Events Table."),
		new Event(
			8,
			"You go undercover to investigate an enemy. Roll Deception 8+. If you succeed, roll immediately on the Rogue or Citizen Events table and make one roll on any Specialist skill table for that career. If you fail, roll immediately on the Rogue or Citizen Mishap table."
		),
		new Event(9, "You go above and beyond the call of duty. Gain DM+2 to your next advancement roll."),
		new Event(10, "You are given specialist training in vehicles. Gain one of Drive 1, Flyer 1, Pilot 1 or Gunner 1."),
		new Event(
			11,
			"You are befriended by a senior agent. Either increase Investigate by one level or DM+4 to an advancement roll thanks to their aid."
		),
		new Event(12, "Your efforts uncover a major conspiracy against your employers. You are automatically promoted."),
	],
	[
		new Event(
			1,
			"Severely injured (this is the same as a result of 2 on the Injury table). Alternatively, roll twice on the Injury table and take the lower result."
		),
		new Event(
			2,
			"A criminal or other figure under investigation offers you a deal. Accept and you leave this career without further penalty (although you lose the Benefit roll as normal). Refuse and you must roll twice on the Injury table and take the lower result. You gain an Enemy and one level in any skill you choose."
		),
		new Event(
			3,
			"An investigation goes critically wrong or leads to the top, ruining your career. Roll Advocate 8+. If you succeed, you may keep the Benefit roll from this term. If you roll 2, you must take the Prisoner career in your next term."
		),
		new Event(4, "You learn something you should not know and people want to kill you for it. Gain an Enemy and Deception 1."),
		new Event(
			5,
			"Your work ends up coming home with you and someone gets hurt. Choose one of your Contacts, Allies or family members and roll twice on the Injury table for them, taking the lower result."
		),
		new Event(6, "Injured. Roll on the Injury table (see page 49)."),
	]
);
