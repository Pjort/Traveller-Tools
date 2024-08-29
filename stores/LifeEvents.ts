import { Event } from "#imports";

export class LifeEvents {
	private static LifeEvents: Event[] = [];

	public static GetLifeEvents(): Event[] {
		return this.LifeEvents;
	}

	static {
		this.LifeEvents.push(new Event(2, "**Sickness or Injury:** You are injured or become sick. Roll on the Injury table (see page 49)."));
		this.LifeEvents.push(
			new Event(
				3,
				"**Birth or Death:** Someone close to you dies, like a friend or family member. Alternatively, someone close to you gives birth (or is born!). You are involved in some fashion (father or mother, relative, godparent and so forth)."
			)
		);
		this.LifeEvents.push(new Event(4, "**Ending of Relationship:** A romantic relationship involving you ends. Badly. Gain a Rival or Enemy."));
		this.LifeEvents.push(
			new Event(
				5,
				"**Improved Relationship:** A romantic relationship involving you deepens, possibly leading to marriage or some other emotional commitment. Gain an Ally."
			)
		);
		this.LifeEvents.push(new Event(6, "**New Relationship:** You become involved in a romantic relationship. Gain an Ally."));
		this.LifeEvents.push(new Event(7, "**New Contact:** You gain a new Contact."));
		this.LifeEvents.push(
			new Event(
				8,
				"**Betrayal:** You are betrayed in some fashion by a friend. If you have any Contacts or Allies, convert one into a Rival or Enemy. Otherwise, gain a Rival or an Enemy."
			)
		);
		this.LifeEvents.push(new Event(9, "**Travel:** You move to another world. You gain DM+2 to your next qualification roll."));
		this.LifeEvents.push(
			new Event(
				10,
				"**Good Fortune:** Something good happens to you; you come into money unexpectedly, have a lifelong dream come true, get a book published or have some other stroke of good fortune. Gain DM+2 to any one Benefit roll."
			)
		);
		this.LifeEvents.push(
			new Event(
				11,
				"**Crime:** You commit or are the victim (or are accused) of a crime. Lose one Benefit roll or take the Prisoner career in your next term."
			)
		);
		this.LifeEvents.push(
			new Event(
				12,
				"**Unusual Event:** Something weird happens. Roll 1D: 1 – **Psionics:** You encounter a Psionic institute. You may immediately test your Psionic Strength and, if you qualify, take the Psion career in your next term. See page 236 for more details. 2 – **Aliens:** You spend time among an alien species. Gain Science 1 and a Contact among an alien species. 3 – **Alien Artefact:** You have a strange and unusual device from an alien culture that is not normally available to humans. 4 – **Amnesia:** Something happened to you but you do not know what it was. 5 – **Contact with Government:** You briefly came into contact with the highest echelons of the Imperium – an Archduke or the Emperor, perhaps, or Imperial intelligence. 6 – **Ancient Technology:** You have something older than the Imperium or even something older than humanity."
			)
		);
	}
}
