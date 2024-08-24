import { Career, Assignment, DiceCheck, TrainingTable, Reward, Event, Item, MusterOutRecord } from "#imports";

const assignments: Assignment[] = [
	new Assignment(1, new DiceCheck(6, "SOC"), new DiceCheck(6, "INT"), "Corporate", "You are an executive or manager in a large corporation.", [
		new Rank(0, "", ""),
		new Rank(1, "", ""),
		new Rank(2, "Manager", "Admin 1"),
		new Rank(3, "", ""),
		new Rank(4, "Senior Manager", "Advocate 1"),
		new Rank(5, "", ""),
		new Rank(6, "Director", "SOC +1"),
	]),
	new Assignment(2, new DiceCheck(4, "END"), new DiceCheck(8, "EDU"), "Worker", "You are a blue collar worker on an industrial world.", [
		new Rank(0, "", ""),
		new Rank(1, "", ""),
		new Rank(2, "Technician", "Profession 1"),
		new Rank(3, "", ""),
		new Rank(4, "Craftsman", "Mechanic 1"),
		new Rank(5, "", ""),
		new Rank(6, "Master Technician", "Engineer 1"),
	]),
	new Assignment(
		3,
		new DiceCheck(7, "INT"),
		new DiceCheck(5, "END"),
		"Colonist",
		"You are building a new life on a recently settled world that still needs taming.",
		[
			new Rank(0, "", ""),
			new Rank(1, "", ""),
			new Rank(2, "Settler", "Survival 1"),
			new Rank(3, "", ""),
			new Rank(4, "Explorer", "Navigation 1"),
			new Rank(5, "", ""),
			new Rank(6, "", "Gun Combat 1"),
		]
	),
];

const trainingTables: TrainingTable[] = [
	new TrainingTable(1, "Personal Development", [
		new Reward(1, "EDU +1"),
		new Reward(2, "INT +1"),
		new Reward(3, "Carouse"),
		new Reward(4, "Gambler"),
		new Reward(5, "Drive"),
		new Reward(6, "Jack-of-all-Trades"),
	]),
	new TrainingTable(2, "Service Skills", [
		new Reward(1, "Drive"),
		new Reward(2, "Flyer"),
		new Reward(3, "Streetwise"),
		new Reward(4, "Melee"),
		new Reward(5, "Steward"),
		new Reward(6, "Profession"),
	]),
	new TrainingTable(3, "Advanced Education (Min. EDU 8)", [
		new Reward(1, "Art"),
		new Reward(2, "Advocate"),
		new Reward(3, "Diplomat"),
		new Reward(4, "Language"),
		new Reward(5, "Electronics: Computers"),
		new Reward(6, "Medic"),
	]),
	new TrainingTable(4, "Corporate", [
		new Reward(1, "Advocate"),
		new Reward(2, "Admin"),
		new Reward(3, "Broker"),
		new Reward(4, "Electronics: Computers"),
		new Reward(5, "Diplomat"),
		new Reward(6, "Leadership"),
	]),
	new TrainingTable(5, "Worker", [
		new Reward(1, "Drive"),
		new Reward(2, "Mechanic"),
		new Reward(3, "Electronics"),
		new Reward(4, "Engineer"),
		new Reward(5, "Profession"),
		new Reward(6, "Science"),
	]),
	new TrainingTable(6, "Colonist", [
		new Reward(1, "Animals"),
		new Reward(2, "Athletics"),
		new Reward(3, "Jack-of-all-Trades"),
		new Reward(4, "Drive"),
		new Reward(5, "Survival"),
		new Reward(6, "Recon"),
	]),
];

const eventsTable: Event[] = [
	new Event(2, "Disaster! Roll on the Mishap table but you are not ejected from this career."),
	new Event(
		3,
		"Political upheaval strikes your homeworld and you are caught up in the revolution. Gain either Advocate 1, Persuade 1, Explosives 1 or Streetwise 1. Roll whichever skill you chose 8+. If you succeed you come out on the winning side and gain DM+2 to your next advancement roll. Fail and you suffer DM-2 to your next Survival roll."
	),
	new Event(
		4,
		"You spend time maintaining and using heavy vehicles, either as part of your job or as a hobby. Increase Mechanic, Drive, Electronics, Flyer or Engineer by one level."
	),
	new Event(5, "Your business expands, your corporation grows or the colony thrives. Gain DM+1 to any one Benefit roll."),
	new Event(6, "You are given advanced training in a specialist field. Roll EDU 10+ to gain any one skill of your choice at level 1."),
	new Event(7, "Life Event. Roll on the Life Events Table."),
	new Event(
		8,
		"You learn something you should not have – a corporate secret, a political scandal – which you can profit from illegally. If you choose to do so, then you gain DM+1 to a Benefit roll from this career and gain Streetwise 1, Deception 1 or a criminal Contact. If you refuse, you gain nothing."
	),
	new Event(9, "You are rewarded for your diligence or cunning. Gain DM+2 to your next advancement roll."),
	new Event(10, "You gain experience in a technical field as a computer operator or surveyor. Increase Electronics or Engineer by one level."),
	new Event(
		11,
		"You befriend a superior in the corporation or the colony. Gain an Ally. Either gain Diplomat 1 or DM+4 to your next advancement roll thanks to their aid."
	),
	new Event(12, "You rise to a position of power in your colony or corporation. You are automatically promoted."),
];

const mishapTable: Event[] = [
	new Event(
		1,
		"Severely injured (this is the same as a result of 2 on the Injury table). Alternatively, roll twice on the Injury table and take the lower result."
	),
	new Event(2, "You are harassed and your life ruined by a criminal gang. Gain the gang as an Enemy."),
	new Event(3, "Hard times caused by a lack of interstellar trade costs you your job. Lose one SOC."),
	new Event(
		4,
		"Your business is investigated by the planetary authorities (or your colony suffers interference from interests offworld). Co-operate and the business or colony is shut down but you gain DM+2 to the qualification roll for your next career as a reward for your aid. Refuse and gain an Ally."
	),
	new Event(
		5,
		"A revolution, attack or other unusual event throws your life into chaos, forcing you to leave the planet. Roll Streetwise 8+. If you succeed, increase any skill you have by one level."
	),
	new Event(6, "Injured. Roll on the Injury table (see page 49)."),
];

const musterOutTable: MusterOutRecord[] = [
	new MusterOutRecord(1, 2000, [new Item(1, "Ship Share")]),
	new MusterOutRecord(2, 5000, [new Relation(1, "Ally")]),
	new MusterOutRecord(3, 10000, [new Reward(1, "INT +1")]),
	new MusterOutRecord(4, 10000, [new Item(1, "Gun")]),
	new MusterOutRecord(5, 10000, [new Reward(1, "EDU +1")]),
	new MusterOutRecord(6, 50000, [new Item(1, "Two Ship Shares")]),
	new MusterOutRecord(7, 100000, [new Item(1, "TAS Membership")]),
];

export const Citizen: Career = new Career(
	3,
	"Citizen",
	new DiceCheck(5, "EDU"),
	assignments,
	trainingTables,
	eventsTable,
	mishapTable,
	musterOutTable
);
