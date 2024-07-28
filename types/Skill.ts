export class Skill {
	Name: string;
	Level: number;

	constructor(name: string, level: number) {
		this.Name = name;
		this.Level = level;
	}

	ToString(): string {
		return `${this.Name}: ${this.Level}`;
	}
}
