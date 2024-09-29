import { Race, Characteristics } from "#imports";

export class RacesDb {
	private static races: Race[] = [];

	public static GetRaces(): Race[] {
		return this.races;
	}

	public static GetRaceById(id: number): Race | undefined {
		return this.races.find((r) => r.Id === id);
	}

	public static GetRaceByName(name: string): Race | undefined {
		return this.races.find((r) => r.Name === name);
	}

	static {
		this.races.push(
			new Race(1, "Human", "The most common race in the galaxy", [], new Characteristics(0, 0, 0, 0, 0, 0)),
			new Race(
				2,
				"Aslan",
				"A proud, honor-bound feline race",
				["**Dewclaws:** 1D+2 damage - Melee (Natural)", "**Heightened Senses:** +1 DM to any Recon and Survival checks"],
				new Characteristics(2, -2, 0, 0, 0, 0),
			),
			new Race(
				3,
				"Vargr",
				"A canine race known for their pack mentality",
				["**Bite:** 1D+1 damage - Melee (Natural)", "**Heightened Senses:** +1 DM to any Recon and Survival checks, but -1 DM in darkness"],
				new Characteristics(-1, 1, -1, 0, 0, 0),
			),
		);
	}
}
