import { Race, type Character } from "#imports";

export class CharacterSheetConverter {
	static toMarkdown(character: Character): string {
		let markdown = "";

		// Basic Information
		markdown += `## ${character.Name}\n\n`;
		markdown += `**Race:** ${Race[character.Race]}\n`;
		if (character.HomeWorld) markdown += `**Home World:** ${character.HomeWorld || "N/A"}\n`;
		markdown += `**Age:** ${character.Age}\n\n`;

		if (!character.Characteristics) return markdown;

		// Characteristics
		markdown += "## Characteristics\n";
		for (let [key, value] of Object.entries(character.Characteristics)) {
			if (key == "SocialStanding") key = "Social Standing";
			if (value <= 0) continue;
			markdown += `- **${key}:** ${value}  (${CharacterUtilities.createDiceModifierString(value)})\n`;
		}
		markdown += "\n";

		// Traits
		if (character.Traits && character.Traits.length > 0) {
			markdown += "## Traits\n";
			for (const trait of character.Traits) {
				markdown += `- ${trait}\n`;
			}
			markdown += "\n";
		}

		// Skills
		markdown += "## Skills\n";
		for (const skill of character.Skills) {
			markdown += `- ${skill.Name}: ${skill.Level}\n`;
		}
		markdown += "\n";

		// Relations
		if (character.Relations && character.Relations.length > 0) {
			markdown += "## Relations\n";
			for (const relation of character.Relations) {
				markdown += `- ${relation.Amount}x ${relation.Description} (Term: ${relation.TermNumber})\n`;
			}
			markdown += "\n";
		}

		// Cash
		markdown += `## Cash:\n`;
		markdown += `Cr${character.Cash}\n\n`;

		// Items
		if (character.Items && character.Items.length > 0) {
			markdown += "## Items:\n";
			for (const item of character.Items) {
				markdown += `- ${item.Description}\n`;
			}
			markdown += "\n";
		}

		// Terms
		markdown += "## Career Terms\n\n";
		for (const term of character.Terms) {
			markdown += `### Term ${term.Number} (Age ${term.Age})\n`;
			markdown += `**Career:** ${term.Career}\n`;
			markdown += `**Assignment:** ${term.Assignment}\n`;
			markdown += `**Survived:** ${term.Survived ? "Yes" : "No"}\n`;
			if (term.Survived) markdown += `**Advanced:** ${term.Advanced ? "Yes" : "No"}\n`;
			if (term.Rank) {
				markdown += `**Rank:** ${term.Rank.Id}` + (term.Rank.Title && term.Rank.Title != "" ? ` - ${term.Rank.Title}` : "") + "\n";
				if (term.MusterOutBenefits) {
					markdown += `**Muster Out Benefits:** ${term.MusterOutBenefits.join(", ")}\n\n`;
				}
			}
		}

		// Life Path
		markdown += "\n\n";
		markdown += "## Life Path\n\n";
		for (const event of character.LifePath) {
			markdown += `${event}\n`;
		}
		markdown += "\n";

		return markdown;
	}
}
