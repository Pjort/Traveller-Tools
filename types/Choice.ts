import { Reward } from "#imports";

export class Choice {
	Key: string;
	Name: string;
	Type: "input" | "select";
	Placeholder?: string;
	Options?: { label: string; value: number }[];
	Reward?: Reward;

	constructor(
		key: string,
		name: string,
		type: "input" | "select",
		placeholder: string = "",
		options: { label: string; value: number }[] = [],
		reward?: Reward
	) {
		this.Key = key;
		this.Name = name;
		this.Type = type;
		this.Placeholder = placeholder;
		this.Options = options;
		this.Reward = reward;
	}
}
