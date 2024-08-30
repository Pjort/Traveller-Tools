import { useFetch } from "#app";

export class MapUtilities {
	private static API_URL = "https://travellermap.com/api/";

	public static async randomSubSectorName(): Promise<string> {
		const sectorName = await this.randomSectorName();
		const subsectors: SubSector[] = await this.fetchSubSectors(sectorName);
		const subsector: SubSector = subsectors[Math.floor(Math.random() * subsectors.length)];

		return `${subsector.Name} (${subsector.UWP})`;
	}

	public static async randomSectorName(): Promise<string> {
		const sectors = await this.fetchSectors();
		const sectorsNames = sectors.flatMap((sector) => sector.Names.map((name) => name.Text));
		const result = sectorsNames[Math.floor(Math.random() * sectorsNames.length)];

		return result;
	}

	public static async fetchSectors(): Promise<Sector[]> {
		try {
			const universe = await $fetch<UniverseResponse>(this.API_URL + "universe?milieu=M1105&tag=Official");

			if (!universe || !universe.Sectors) {
				throw new Error("No data returned from API");
			}

			return universe.Sectors;
		} catch (error) {
			console.error("Failed to fetch sectors:", error);
			throw new Error("Failed to fetch sectors");
		}
	}

	public static async fetchSubSectors(sectorName: string): Promise<SubSector[]> {
		try {
			const rawData = await $fetch<string>(this.API_URL + "sec?sector=" + sectorName + "&type=TabDelimited");

			// Parse the tab-delimited string into structured data
			const parsedData = this.parseTabDelimitedData(rawData);

			return parsedData;
		} catch (err) {
			console.error("Failed to fetch subsector data:", err);
			throw new Error("Failed to fetch subsector data");
		}
	}

	private static parseTabDelimitedData(rawData: string): SubSector[] {
		const lines = rawData.trim().split("\n");

		// Assuming the first line is a header and we skip it
		const result: SubSector[] = lines.slice(1).map((line) => {
			const fields = line.split("\t");

			return {
				Sector: fields[0],
				SS: fields[1],
				Hex: fields[2],
				Name: fields[3],
				UWP: fields[4],
				Bases: fields[5] || null,
				Remarks: fields[6],
				Zone: fields[7] || null,
				PBG: fields[8],
				Allegiance: fields[9],
				Stars: fields[10],
				Ix: fields[11],
				Ex: fields[12],
				Cx: fields[13],
				Nobility: fields[14] || null,
				W: parseInt(fields[15], 10),
				RU: parseInt(fields[16], 10),
			} as SubSector;
		});

		return result;
	}
}

interface SectorName {
	Text: string;
}

interface Sector {
	X: number;
	Y: number;
	Milieu: string;
	Abbreviation: string;
	Tags: string;
	Names: SectorName[];
}

interface UniverseResponse {
	Sectors: Sector[];
}

interface SubSector {
	Sector: string; // Sector name
	SS: string; // Subsector code
	Hex: string; // Hex coordinate
	Name: string; // System or planet name
	UWP: string; // Universal World Profile
	Bases: string | null; // Bases present (optional)
	Remarks: string; // Remarks
	Zone: string | null; // Travel zone (optional)
	PBG: string; // Population, Belts, and Gas Giants
	Allegiance: string; // Allegiance code
	Stars: string; // Star types
	Ix: string | number; // Importance value (Ix)
	Ex: string; // Economic extension (Ex)
	Cx: string; // Cultural extension (Cx)
	Nobility: string | null; // Nobility codes (optional)
	W: number; // World size
	RU: number; // Resource units
}
