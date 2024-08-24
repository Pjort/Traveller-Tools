import { SkillDbRecord } from "#imports";

export class SkillsDb {
	private static _skills: SkillDbRecord[] = [];

	public static GetSkills(): SkillDbRecord[] {
		return this._skills;
	}

	public static GetSkillById(id: number): SkillDbRecord | undefined {
		return this._skills.find((s) => s.Id === id);
	}

	public static GetSkillByName(name: string): SkillDbRecord | undefined {
		return this._skills.find((s) => s.Name === name);
	}

	public static GetBackgroundSkills(): SkillDbRecord[] {
		const backgroundSkills: SkillDbRecord[] = [];
		backgroundSkills.push(this.GetSkillById(1)!);
		backgroundSkills.push(this.GetSkillById(3)!);
		backgroundSkills.push(this.GetSkillById(7)!);
		backgroundSkills.push(this.GetSkillById(9)!);
		backgroundSkills.push(this.GetSkillById(14)!);
		backgroundSkills.push(this.GetSkillById(17)!);
		backgroundSkills.push(this.GetSkillById(22)!);
		backgroundSkills.push(this.GetSkillById(33)!);
		backgroundSkills.push(this.GetSkillById(52)!);
		backgroundSkills.push(this.GetSkillById(54)!);
		backgroundSkills.push(this.GetSkillById(55)!);
		backgroundSkills.push(this.GetSkillById(66)!);
		backgroundSkills.push(this.GetSkillById(68)!);
		backgroundSkills.push(this.GetSkillById(69)!);
		backgroundSkills.push(this.GetSkillById(75)!);
		backgroundSkills.push(this.GetSkillById(76)!);
		backgroundSkills.push(this.GetSkillById(80)!);
		return backgroundSkills;
	}

	static {
		this._skills.push(new SkillDbRecord(1, "Admin"));
		this._skills.push(new SkillDbRecord(2, "Advocate"));
		this._skills.push(new SkillDbRecord(3, "Animals"));
		this._skills.push(new SkillDbRecord(4, "Animals: Handling"));
		this._skills.push(new SkillDbRecord(5, "Animals: Training"));
		this._skills.push(new SkillDbRecord(6, "Animals: Veterinary"));
		this._skills.push(new SkillDbRecord(7, "Art"));
		this._skills.push(new SkillDbRecord(8, "Astrogation"));
		this._skills.push(new SkillDbRecord(9, "Athletics"));
		this._skills.push(new SkillDbRecord(10, "Athletics: Dexterity"));
		this._skills.push(new SkillDbRecord(11, "Athletics: Endurance"));
		this._skills.push(new SkillDbRecord(12, "Athletics: Strength"));
		this._skills.push(new SkillDbRecord(13, "Broker"));
		this._skills.push(new SkillDbRecord(14, "Carouse"));
		this._skills.push(new SkillDbRecord(15, "Deception"));
		this._skills.push(new SkillDbRecord(16, "Diplomat"));
		this._skills.push(new SkillDbRecord(17, "Drive"));
		this._skills.push(new SkillDbRecord(18, "Drive: Mole"));
		this._skills.push(new SkillDbRecord(19, "Drive: Track"));
		this._skills.push(new SkillDbRecord(20, "Drive: Walker"));
		this._skills.push(new SkillDbRecord(21, "Drive: Wheel"));
		this._skills.push(new SkillDbRecord(22, "Electronics"));
		this._skills.push(new SkillDbRecord(23, "Electronics: Comms"));
		this._skills.push(new SkillDbRecord(24, "Electronics: Computers"));
		this._skills.push(new SkillDbRecord(25, "Electronics: Remote Ops"));
		this._skills.push(new SkillDbRecord(26, "Electronics: Sensors"));
		this._skills.push(new SkillDbRecord(27, "Engineer"));
		this._skills.push(new SkillDbRecord(28, "Engineer: Life Support"));
		this._skills.push(new SkillDbRecord(29, "Engineer: M-Drive"));
		this._skills.push(new SkillDbRecord(30, "Engineer: J-Drive"));
		this._skills.push(new SkillDbRecord(31, "Engineer: Power"));
		this._skills.push(new SkillDbRecord(32, "Explosives"));
		this._skills.push(new SkillDbRecord(33, "Flyer"));
		this._skills.push(new SkillDbRecord(34, "Flyer: Grav"));
		this._skills.push(new SkillDbRecord(35, "Flyer: Rotor"));
		this._skills.push(new SkillDbRecord(36, "Flyer: Wing"));
		this._skills.push(new SkillDbRecord(37, "Gambler"));
		this._skills.push(new SkillDbRecord(38, "Gunner"));
		this._skills.push(new SkillDbRecord(39, "Gunner: Turrets"));
		this._skills.push(new SkillDbRecord(40, "Gunner: Ortillery"));
		this._skills.push(new SkillDbRecord(41, "Gunner: Screens"));
		this._skills.push(new SkillDbRecord(42, "Gun Combat"));
		this._skills.push(new SkillDbRecord(43, "Gun Combat: Archaic"));
		this._skills.push(new SkillDbRecord(44, "Gun Combat: Energy"));
		this._skills.push(new SkillDbRecord(45, "Gun Combat: Slug"));
		this._skills.push(new SkillDbRecord(46, "Heavy Weapons"));
		this._skills.push(new SkillDbRecord(47, "Heavy Weapons: Artillery"));
		this._skills.push(new SkillDbRecord(48, "Heavy Weapons: Man Portable"));
		this._skills.push(new SkillDbRecord(49, "Heavy Weapons: Vehicle"));
		this._skills.push(new SkillDbRecord(50, "Investigate"));
		this._skills.push(new SkillDbRecord(51, "Jack-of-all-Trades"));
		this._skills.push(new SkillDbRecord(52, "Language"));
		this._skills.push(new SkillDbRecord(53, "Leadership"));
		this._skills.push(new SkillDbRecord(54, "Mechanic"));
		this._skills.push(new SkillDbRecord(55, "Medic"));
		this._skills.push(new SkillDbRecord(56, "Melee"));
		this._skills.push(new SkillDbRecord(57, "Melee: Blade"));
		this._skills.push(new SkillDbRecord(58, "Melee: Bludgeon"));
		this._skills.push(new SkillDbRecord(59, "Melee: Natural"));
		this._skills.push(new SkillDbRecord(60, "Navigation"));
		this._skills.push(new SkillDbRecord(61, "Persuade"));
		this._skills.push(new SkillDbRecord(62, "Pilot"));
		this._skills.push(new SkillDbRecord(63, "Pilot: Capital Ships"));
		this._skills.push(new SkillDbRecord(64, "Pilot: Small Craft"));
		this._skills.push(new SkillDbRecord(65, "Pilot: Spacecraft"));
		this._skills.push(new SkillDbRecord(66, "Profession"));
		this._skills.push(new SkillDbRecord(67, "Recon"));
		this._skills.push(new SkillDbRecord(68, "Science"));
		this._skills.push(new SkillDbRecord(69, "Seafarer"));
		this._skills.push(new SkillDbRecord(70, "Seafarer: Ocean Ships"));
		this._skills.push(new SkillDbRecord(71, "Seafarer: Submarine"));
		this._skills.push(new SkillDbRecord(72, "Seafarer: Sail"));
		this._skills.push(new SkillDbRecord(73, "Stealth"));
		this._skills.push(new SkillDbRecord(74, "Steward"));
		this._skills.push(new SkillDbRecord(75, "Streetwise"));
		this._skills.push(new SkillDbRecord(76, "Survival"));
		this._skills.push(new SkillDbRecord(77, "Tactics"));
		this._skills.push(new SkillDbRecord(78, "Tactics: Military"));
		this._skills.push(new SkillDbRecord(79, "Tactics: Naval"));
		this._skills.push(new SkillDbRecord(80, "Vacc Suit"));
		this._skills.push(new SkillDbRecord(81, "Melee: Unarmed"));
	}
}
