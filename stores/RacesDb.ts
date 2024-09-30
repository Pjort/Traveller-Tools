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
			new Race(
				4,
				"K’kree - Male",
				"A centaur-like",
				[
					"**Big and Tough:** K'kree halve END reduction from damage or exertion.",
					"**Claustrophobic:** K’kree are intensely claustrophobic.",
					"**Gregarious:** K’kree need others of their own kind around them at all times.",
				],
				new Characteristics(6, 0, 0, -4, -4, 0),
			),
			new Race(
				5,
				"K’kree - Female",
				"A centaur-like",
				[
					"**Big and Tough:** K'kree halve END reduction from damage or exertion.",
					"**Claustrophobic:** K’kree are intensely claustrophobic.",
					"**Gregarious:** K’kree need others of their own kind around them at all times.",
				],
				new Characteristics(3, 0, 0, 0, -5, 0),
			),
			new Race(6, "Zhodani", "", ["**Psionic Training:** Zhodani roll 2D for the PSI characteristic at the start of Traveller generation."]),
			new Race(7, "Solomani", ""),
			new Race(8, "Droyne", "", ["**Droyne Flight:** Droyne can fly for short distances."]),
			new Race(
				9,
				"Hiver",
				"",
				[
					"**Hiver Physiology:** Hivers gain a +2 DM on all checks to resist disease or chemical toxins, and have a natural 2 points of armour from their leathery skin.",
					"**Physical Coward:** Hivers are frightened of physical violence and aggression.",
					"**Sense of Smell/No Sense of Smell:** Most Hivers have no sense of smell, and receive the No Sense of Smell trait.",
					"**Stability:** Hivers are relatively low to the ground and can use as many as six limbs to balance if necessary.",
				],
				new Characteristics(-2, 0, 0, 0, 0, 0),
			),
			new Race(
				10,
				"Darrians",
				"",
				[
					"**Heightened Senses:** Darrians have slightly better hearing and vision than humans, granting DM+1 to any Recon or Survival check involving those senses",
					"**Ozone Immunity:** Darrians are able to safely metabolise ozone due to a naturally occurring retrovirus present in their cells. Darrians take no damage from ozone poisoning.",
					"**Temperature Resistance:** Darrians are somewhat resistant to heat and cold damage due to their variable metabolism. They suffer -1 less damage from extremes of temperature in their environment.",
				],
				new Characteristics(-1, 1, -1, 1, 1, 0),
			),
			new Race(
				11,
				"Geonee",
				"Geonee are a subspecies of humans adapted to high-gravity environments, characterized by their stocky builds and resilient physiologyption",
				[
					"**Hyper-acclimatisation:** Geonee are able to rapidly acclimatise to new environments. It only takes them D3 weeks to adapt to new gravities.",
					"**Poor Senses:** Geonee hearing is not as sensitive as those of other humans. When in Atmosphere 7 or less they suffer DM-1 to all Recon checks which require hearing.",
				],
				new Characteristics(2, -1, 2, 0, 0, -1),
			),
			new Race(
				12,
				"Dolphin",
				"",
				[
					"**Cold Resistance:** Dolphins possess a thick covering of blubber, which keeps them warm, providing DM+4 to all checks made to resist the effects of low temperatures.",
					"**Deep Diver (300m):** Dolphins can dive deep underwater, to a depth of 300 metres without risk and can hold their breath for up to 15 minutes.",
					"**Echolocation (100m):** Dolphins use a highly sensitive echolocation sense to navigate their environment, effectively allowing them to ‘see’ underwater or in complete darkness to a range of 100 metres.",
					"**Succour Syndrome:** When Dolphins hear the distress calls of other cetaceans they risk suffering from succour syndrome. If they fail a Very Difficult (12+) Gun Combat or Melee check (1D seconds, INT) both their INT and EDU temporarily drop to 0 and they must immediately swim as fast as possible to the side of the distressed cetacean.",
					"**Swimmer (12m):** Dolphins are superb swimmers and can move through water at a speed of 12 metres.",
				],
				new Characteristics(4, 0, 2, 0, 0, -4),
			),
			new Race(
				13,
				"Orca",
				"",
				[
					"**Big and Tough:** Orca halve END reduction from damage or exertion.",
					"**Cold Resistance:** Orca possess a thick covering of blubber that keeps them warm, providing DM+4 to all checks made to resist the effects of low temperatures.",
					"**Deep Diver (260m):** Orca can dive deep underwater, to a depth of 260 metres without risk and can hold their breath for up to 15 minutes.",
					"**Echolocation (100m):** Orca use a highly sensitive echolocation sense to navigate their environment, effectively allowing them to ‘see’ underwater or in complete darkness to a range of 100 metres.",
					"**Succour Syndrome:** When Orca hear the distress calls of other Orca they risk suffering from succour syndrome. If they fail a Very Difficult (12+) Gun Combat or Melee check (1D seconds, INT) both their INT and EDU temporarily drop to zero and they must immediately swim as fast as possible to the side of the distressed cetacean.",
					"**Swimmer (16m):** Orca are superb swimmers and can move through water at a speed of 16 metres.",
				],
				new Characteristics(8, 0, 4, 0, 0, -4),
			),
			new Race(
				14,
				"Bwaps",
				"",
				[
					"**Regeneration:** Bwaps are able to regenerate amputated extremities. If a Bwap loses a limb or a tail, it will slowly grow back, taking six months. The limb or tail will be useless for this time as it develops into a fully functional extremity. Amputated hands and feet will only take three months to regrow back andamputated digits take six weeks.",
					"**Social Norms:** Bwaps have a very specific way of thinking that can make certain actions more difficult for them. They suffer DM-1 on the following skills: Deception, Gambler, Persuade and Streetwise.",
					"**Structured Mind:** Bwaps have very structured minds, making some skills easier to learn than others. Whenever a Bwap acquires Admin, Advocate and Broker at level 0, it automatically becomes level 1 (making it impossible for a Bwap to have Admin 0 for example, only Admin 1 or more). Any further levels in these skills accumulate normally.",
				],
				new Characteristics(-4, 0, -4, 0, 0, 0),
			),
		);
	}
}
