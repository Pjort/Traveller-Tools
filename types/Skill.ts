export class Skill {
	Name: string;
	Level: number;

	constructor(name: string, level: number) {
		this.Name = name;
		this.Level = level;
	}

	toString(): string {
		return `${this.Name}: ${this.Level}`;
	}
}
