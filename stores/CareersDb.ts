import { Career, Agent } from "#imports";

export class CareersDb {
	private static careers: Career[] = [];

	public static GetCareers(): Career[] {
		return this.careers;
	}

	public static GetCareerById(id: number): Career | undefined {
		return this.careers.find((c) => c.Id === id);
	}

	static {
		this.careers.push(Agent)
	}
}
