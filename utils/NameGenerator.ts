export class NameGenerator {
	private static consonants: string[] = [
		"b",
		"c",
		"d",
		"f",
		"g",
		"h",
		"j",
		"k",
		"l",
		"m",
		"n",
		"p",
		"r",
		"s",
		"t",
		"v",
		"w",
		"z",
		"ch",
		"sh",
		"th",
		"ph",
		"qu",
	];
	private static vowels: string[] = ["a", "e", "i", "o", "u", "y"];
	private static dipthongs: string[] = [
		"ae",
		"ai",
		"au",
		"ay",
		"ea",
		"ee",
		"ei",
		"eo",
		"eu",
		"ey",
		"ia",
		"ie",
		"io",
		"iu",
		"oa",
		"oe",
		"oi",
		"oo",
		"ou",
		"oy",
		"ua",
		"ue",
		"ui",
		"uo",
		"uy",
	];
	private static endings: string[] = [
		"n",
		"r",
		"s",
		"t",
		"x",
		"l",
		"k",
		"th",
		"nd",
		"rn",
		"st",
		"nx",
		"ck",
		"rt",
		"ns",
		"nt",
		"ll",
		"ss",
		"sh",
		"lk",
		"sk",
	];

	private static randomChoice<T>(arr: T[]): T {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	private static generateSyllable(): string {
		if (Math.random() < 0.7) {
			// 70% chance of consonant-vowel
			return this.randomChoice(this.consonants) + this.randomChoice(this.vowels);
		} else {
			// 30% chance of just vowel
			return this.randomChoice(this.vowels);
		}
	}

	public static generateName(): string {
		const nameLength = Math.floor(Math.random() * 3) + 2; // 2 to 4 syllables

		let name = "";
		for (let i = 0; i < nameLength; i++) {
			if (i === 0 && Math.random() < 0.3) {
				// 30% chance to start with a vowel
				name += this.randomChoice(this.vowels);
			} else if (i === nameLength - 1 && Math.random() < 0.4) {
				// 40% chance to end with a dipthong
				name += this.randomChoice(this.dipthongs);
			} else {
				name += this.generateSyllable();
			}
		}

		if (Math.random() < 0.3) {
			// 30% chance to add an ending
			name += this.randomChoice(this.endings);
		}

		return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	}

	public static generateFullName(): string {
		const firstName = this.generateName();
		if (Math.random() < 0.7) {
			// 70% chance of having a last name
			const lastName = this.generateName();
			return `${firstName} ${lastName}`;
		} else {
			return firstName;
		}
	}

	public static generateNames(count: number): string[] {
		return Array.from({ length: count }, () => this.generateFullName());
	}
}
