import { Skill } from "#imports";

export class DiceCheck {
	TargetValue: number;
	CharacteristicsType?: string;
	Skill?: Skill;

	constructor(targetValue: number, characteristicsType?: string, skill?: Skill) {
		this.TargetValue = targetValue;
		this.CharacteristicsType = characteristicsType;
		this.Skill = skill;
	}

	static fromCharacteristicsAndSkill(targetValue: number, characteristicsType: string, skill: Skill): DiceCheck {
		return new DiceCheck(targetValue, characteristicsType, skill);
	}

	static fromCharacteristics(targetValue: number, characteristicsType: string): DiceCheck {
		return new DiceCheck(targetValue, characteristicsType);
	}

	static fromSkill(targetValue: number, skill: Skill): DiceCheck {
		return new DiceCheck(targetValue, undefined, skill);
	}
}
