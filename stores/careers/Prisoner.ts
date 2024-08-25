import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event, Item, MusterOutRecord } from "#imports";

const assignments: Assignment[] = [
	new Assignment(
		1,
		new DiceCheck(7, "END"),
		new DiceCheck(7, "STR"),
		"Inmate",
		"You just try to get through your time in prison without getting into trouble.",
		[
			new Rank(0, "", "Melee: Unarmed 1"),
			new Rank(1, "", ""),
			new Rank(2, "", "Athletics 1"),
			new Rank(3, "", ""),
			new Rank(4, "", "Advocate 1"),
			new Rank(5, "", ""),
			new Rank(6, "", "END +1"),
		]
	),
	new Assignment(2, new DiceCheck(8, "STR"), new DiceCheck(6, "END"), "Thug", "You are part of a gang in prison, terrorising the other inmates.", [
		new Rank(0, "", "Melee: Unarmed 1"),
		new Rank(1, "", ""),
		new Rank(2, "", "Athletics 1"),
		new Rank(3, "", ""),
		new Rank(4, "", "Advocate 1"),
		new Rank(5, "", ""),
		new Rank(6, "", "END +1"),
	]),
	new Assignment(3, new DiceCheck(9, "INT"), new DiceCheck(5, "END"), "Fixer", "You can arrange anything – for the right price.", [
		new Rank(0, "", "Melee: Unarmed 1"),
		new Rank(1, "", ""),
		new Rank(2, "", "Athletics 1"),
		new Rank(3, "", ""),
		new Rank(4, "", "Advocate 1"),
		new Rank(5, "", ""),
		new Rank(6, "", "END +1"),
	]),
];

const trainingTables: TrainingTable[] = [
	new TrainingTable(1, "Personal Development", [
		new Reward(1, "STR +1"),
		new Reward(2, "Melee: Unarmed"),
		new Reward(3, "END +1"),
		new Reward(4, "Jack-of-all-Trades"),
		new Reward(5, "EDU +1"),
		new Reward(6, "Gambler"),
	]),
	new TrainingTable(2, "Service Skills", [
		new Reward(1, "Athletics"),
		new Reward(2, "Deception"),
		new Reward(3, "Profession"),
		new Reward(4, "Streetwise"),
		new Reward(5, "Melee: Unarmed"),
		new Reward(6, "Persuade"),
	]),
	new TrainingTable(3, "Inmate", [
		new Reward(1, "Stealth"),
		new Reward(2, "Melee: Unarmed"),
		new Reward(3, "Streetwise"),
		new Reward(4, "Survival"),
		new Reward(5, "Athletics: Strength"),
		new Reward(6, "Mechanic"),
	]),
	new TrainingTable(4, "Thug", [
		new Reward(1, "Persuade"),
		new Reward(2, "Melee: Unarmed"),
		new Reward(3, "Melee: Unarmed"),
		new Reward(4, "Melee: Blade"),
		new Reward(5, "Athletics: Strength"),
		new Reward(6, "Athletics: Strength"),
	]),
	new TrainingTable(5, "Fixer", [
		new Reward(1, "Investigate"),
		new Reward(2, "Broker"),
		new Reward(3, "Decetion"),
		new Reward(4, "Streetwise"),
		new Reward(5, "Stealth"),
		new Reward(6, "Admin"),
	]),
];

const eventsTable: Event[] = [
	new Event(2, "Disaster! Roll on the Mishap table. However, you are not ejected from this career."),
	new Event(
		3,
		"You have the opportunity to escape the prison. If you take this opportunity, roll either Stealth 10+ or Deception 10+. Succeed and you leave this career. Fail and raise your Parole Threshold by +2."
	),
	new Event(
		4,
		"You are assigned to difficult or backbreaking labour. Roll END 8+. If you fail, increase your Parole Threshold by +1. Succeed and you may reduce your Parole Threshold by 1 and gain any one of the following skills: Athletics (any) 1, Mechanic 1, or Melee (unarmed) 1."
	),
	new Event(
		5,
		"You have the opportunity to join a gang. Roll Persuade or Melee 8+ to do so. If you fail, you gain an Enemy. Succeed and you must raise your Parole Threshold by +1 but gain DM+1 to all survival rolls in this career and any one of the following skills: Deception 1, Persuade 1, Melee (unarmed) 1 or Stealth 1."
	),
	new Event(6, "Vocational Training. Roll EDU 8+ to gain any one skill except Jack-of-all-Trades."),
	new Event(
		7,
		"Prison Event: 1. Riot. A riot engulfs the prison. Roll 1D. On a 1–2, you are injured – roll on the Injury table. On a 5–6, you are able to loot something useful; gain an extra Benefit roll this term. 2. New Contact. You make friends with another inmate; gain them as a Contact. 3. New Rival. You gain a new Rival among the inmates or guards. 4. Transferred. You are moved to a different prison. Re-roll your Parole Threshold. 5. Good Behaviour. Reduce your Parole Threshold by -2. 6. You are attacked by another prisoner. Roll Melee (unarmed) 8+. If you fail, roll on the Injury table."
	),
	new Event(8, "Parole hearing. Reduce your Parole Threshold by -1."),
	new Event(
		9,
		"You have the opportunity to hire a new lawyer, with your choice of Advocate skill. They cost Cr1000 x their Advocate level squared. Roll 2D + your lawyer’s Advocate skill; on an 8+, reduce your Parole Threshold by 1D."
	),
	new Event(
		10,
		"Special Duty. You are given a special responsibility in the prison. Gain one of Admin, Advocate, Electronics (computers) or Steward."
	),
	new Event(11, "The warden takes an interest in your case. Reduce your Parole Threshold by -2."),
	new Event(
		12,
		"Heroism. You have the opportunity to save a guard or prison officer. If you take the risk, roll 2D. On a 7 or less, roll on the Injury table. On 8+, gain an Ally and reduce your Parole Threshold by -2."
	),
];

const mishapTable: Event[] = [
	new Event(
		1,
		"Severely injured (this is the same as a result of 2 on the Injury table). Alternatively, roll twice on the Injury table and take the lower result."
	),
	new Event(2, "You are accused of assaulting a prison guard. Parole Threshold +2."),
	new Event(
		3,
		"A prison gang persecutes you. You may choose to fight back if you wish but, if you do not, you lose all Benefit rolls from your Prisoner career. If you fight back, roll Melee (unarmed) 8+. Fail and you must roll twice on the Injury table and take the lower result. Succeed and you gain an Enemy and raise Parole Threshold by +1."
	),
	new Event(4, "A guard takes a dislike to you. Gain an Enemy and raise your Parole Threshold by +1."),
	new Event(5, "Disgraced. Word of your criminal past reaches your homeworld. Lose 1 SOC."),
	new Event(6, "Injured. Roll on the Injury table (see page 49)."),
];

const musterOutTable: MusterOutRecord[] = [
	new MusterOutRecord(1, 0, [new Relation(1, "Contact")]),
	new MusterOutRecord(2, 0, [new Item(1, "Blade")]),
	new MusterOutRecord(3, 100, [new Reward(1, "Deception")]), // TODO: or , new Reward(2, "Persuade"), new Reward(3, "Stealth")
	new MusterOutRecord(4, 200, [new Relation(1, "Ally")]),
	new MusterOutRecord(5, 500, [new Reward(1, "Melee")]), // TODO: or , new Reward(2, "Recon"), new Reward(3, "Streetwise")
	new MusterOutRecord(6, 1000, [new Reward(1, "STR +1"), new Reward(2, "END +1")]),
	new MusterOutRecord(7, 2500, [new Reward(1, "Deception"), new Reward(2, "Persuade"), new Reward(3, "Stealth")]),
];

export const Prisoner: Career = new Career(
	13,
	"Prisoner",
	new DiceCheck(0, "Automatic"),
	assignments,
	trainingTables,
	eventsTable,
	mishapTable,
	musterOutTable
);
