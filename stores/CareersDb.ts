import { Career, Agent, Army, Citizen, Drifter, Entertainer, Marine, Merchant, Navy, Noble, Rogue, Scholar, Scout, Prisoner } from "#imports";

export class CareersDb {
	private static careers: Career[] = [];

	public static GetCareers(): Career[] {
		return this.careers;
	}

	public static GetCareerById(id: number): Career | undefined {
		return this.careers.find((c) => c.Id === id);
	}

	public static GetCareerByName(name: string): Career | undefined {
		return this.careers.find((c) => c.Name === name);
	}

	static {
		this.careers.push(Agent);
		this.careers.push(Army);
		this.careers.push(Citizen);
		// this.careers.push(Drifter);
		// this.careers.push(Entertainer);
		// this.careers.push(Marine);
		// this.careers.push(Merchant);
		// this.careers.push(Navy);
		// this.careers.push(Noble);
		// this.careers.push(Rogue);
		// this.careers.push(Scholar);
		// this.careers.push(Scout);
		// this.careers.push(Prisoner);
	}
}
