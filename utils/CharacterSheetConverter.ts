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
		markdown += "## Characteristics\n\n";
		for (let [key, value] of Object.entries(character.Characteristics)) {
			if (key == "SocialStanding") key = "Social Standing";
			markdown += `**${key}:** ${value}  (${CharacterUtilities.createDiceModifierString(value)})\n`;
		}
		markdown += "\n";

		// Skills
		markdown += "## Skills\n\n";
		for (const skill of character.Skills) {
			markdown += `- ${skill.Name}: ${skill.Level}\n`;
		}
		markdown += "\n";

		// Cash and Items
		markdown += `## Possessions\n\n`;
		markdown += `**Cash:** Cr${character.Cash}\n`;
		if (character.Items && character.Items.length > 0) {
			markdown += "**Items:**\n";
			for (const item of character.Items) {
				markdown += `- ${item.Description}\n`;
			}
		}

		// Terms
		markdown += "## Career Terms\n\n";
		for (const term of character.Terms) {
			markdown += `### Term ${term.Number} (Age ${term.Age})\n`;
			markdown += `**Career:** ${term.Career}\n`;
			markdown += `**Assignment:** ${term.Assignment}\n`;
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
