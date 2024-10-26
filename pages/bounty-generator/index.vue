<template>
	<div class="container mx-auto p-4">
		<h1 class="text-2xl font-bold mb-4">Bounty Generator</h1>

		<ApiKeyInput />

		<div class="mb-4">
			<label for="priority" class="block text-sm font-medium text-gray-700">Priority</label>
			<select
				v-model="priority"
				id="priority"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white px-3 py-2"
			>
				<option value="(★) Low">(★) Low</option>
				<option value="(★★) Mid">(★★) Mid</option>
				<option value="(★★★) High">(★★★) High</option>
				<option value="(★★★★) Critical">(★★★★) Critical</option>
			</select>
		</div>

		<div class="mb-4">
			<label for="reputation" class="block text-sm font-medium text-gray-700">Required Reputation</label>
			<input
				v-model.number="reputation"
				type="number"
				id="reputation"
				min="0"
				max="9"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2"
			/>
		</div>
		<div class="mb-4">
			<label for="markName" class="block text-sm font-medium text-gray-700">Mark's Name (Optional)</label>
			<input
				v-model="markName"
				type="text"
				id="markName"
				placeholder="Specify a name for the target"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2"
			/>
		</div>
		<div class="mb-4">
			<label for="backgroundInfo" class="block text-sm font-medium text-gray-700">Background Information (Optional)</label>
			<textarea
				v-model="backgroundInfo"
				id="backgroundInfo"
				rows="3"
				placeholder="Add any additional context about the bounty (e.g., location, involved parties, etc.)"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2"
			></textarea>
		</div>

		<div class="flex">
			<button
				@click="generateBounty"
				class="px-4 py-2 rounded mb-4 mr-2 transition-colors duration-200"
				:class="{
					'bg-blue-500 text-white hover:bg-blue-600': apiKeyStore.apiKey && !isLoading,
					'bg-gray-300 text-gray-500 cursor-not-allowed': !apiKeyStore.apiKey || isLoading,
				}"
				:disabled="!apiKeyStore.apiKey || isLoading"
			>
				{{ bounty ? "Generate new bounty" : "Generate Bounty" }}
			</button>

			<button
				@click="copyPromptToClipboard"
				class="px-4 py-2 rounded mb-4 ml-2 transition-colors duration-200 bg-green-500 text-white hover:bg-green-600 flex items-center"
			>
				<svg class="mr-2 fill-white" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24">
					<path
						d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 12H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z"
					/>
				</svg>
				Copy Prompt
				<p v-if="promptCopied" class="text-green-500 bg-black rounded-md p-2 mt-16 absolute">Copied!</p>
			</button>

			<button
				@click="copyToClipboard"
				class="px-4 py-2 rounded mb-4 ml-6 mr-2 transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600 flex items-center"
				v-if="bounty"
			>
				<svg
					class="mr-2 fill-white"
					fill="#000000"
					version="1.1"
					id="Capa_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					width="16px"
					height="16px"
					viewBox="0 0 93.842 93.843"
					xml:space="preserve"
				>
					<g>
						<path
							d="M74.042,11.379h-9.582v-0.693c0-1.768-1.438-3.205-3.206-3.205h-6.435V3.205C54.819,1.437,53.381,0,51.614,0H42.23
        c-1.768,0-3.206,1.438-3.206,3.205V7.48H32.59c-1.768,0-3.206,1.438-3.206,3.205v0.693h-9.582c-2.393,0-4.339,1.945-4.339,4.34
        v73.785c0,2.394,1.946,4.34,4.339,4.34h54.238c2.394,0,4.339-1.946,4.339-4.34V15.719C78.38,13.324,76.434,11.379,74.042,11.379z
        M32.617,25.336h28.61c1.709,0,3.102-1.391,3.102-3.1v-3.438h7.554l0.021,68.164l-49.939,0.021V18.801h7.554v3.436
        C29.517,23.945,30.907,25.336,32.617,25.336z"
						/>
					</g>
				</svg>
				Copy Markdown
				<p v-if="copied" class="text-green-500 bg-black rounded-md p-2 mt-16 absolute">Copied!</p>
			</button>
		</div>
		<div v-if="isLoading" class="flex justify-center items-center py-4">
			<div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
		</div>
		<div v-else-if="bounty" class="bg-white shadow-md rounded-lg overflow-hidden p-5 w-full">
			<div class="prose max-w-none" v-html="renderMarkdown(bounty)"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { marked } from "marked";
import { ref, onMounted } from "vue";
import { useApiKeyStore } from "#imports";

const apiKeyStore = useApiKeyStore();
const bounty = ref("");
const isLoading = ref(false);
const priority = ref("(★) Low");
const reputation = ref(0);

const backgroundInfo = ref("");

const markName = ref("");

const copied = ref(false);

const promptCopied = ref(false);

function getPromptText() {
	return `Generate a bounty hunter contract in the Traveller universe with priority ${priority.value} and required reputation ${reputation.value}${backgroundInfo.value ? `. Additional context: ${backgroundInfo.value}` : ""}. For each contract, provide the following details in the specified format:

## Title: Wait until the end to give it a title, and make it a catchy one that gives a hint of the mark and the crime. \n
**Mark:** ${markName.value ? `${markName.value}` : "Generate a unique futuristic name for the target, using a combination of unusual syllables or symbols similar to names from Star Wars or Star Trek"} \n
**Wanted for:** Why the target is hunted \n
**Priority:** ${priority.value} \n
**Status:** Alive (usual for low and mid priority), Dead or Alive (usual for high priority), or Dead (usual for critical priority), there are expections to this if it fits the plot. \n
*Bounty:** The reward. For low priority: Cr4,000-30,000. For mid priority: Cr20,000-100,000. For high priority: Cr40,000-1,500,000. For critical priority: Cr1,000,000 to 5,000,000. \n
**Issuer:** Who is the contractor  \n
**Known associates:** Could be friends or family  \n

___
### Referee's information:
**Reputation:** ${reputation.value} \n
**Description:** A detailed description of the mark, including their physical appearance, notable traits, and any unique characteristics. Provide a comprehensive background on their criminal history, motivations, and the specific events that led to this bounty. Include information on their skills, preferred tactics, and any known weaknesses. Mention any relevant connections to criminal organizations, political entities, or other influential groups. Describe their typical behavior patterns, known hideouts, and any recurring associates. If applicable, detail any previous attempts to apprehend them and why they failed. Include any other pertinent information that could aid the bounty hunter in their pursuit, such as the mark's psychological profile, technological capabilities, or rumored plans. \n
**Suggested location:** Generate a specific and detailed location where the target might be found. This could be a remote space station, a bustling spaceport, an alien world with unique features, an asteroid mining colony, or any other interesting location in the Traveller universe. Include at least one distinctive aspect of the location that could play into the hunt.  \n

___
### Locations: List of 6 location, Each could have leads or information that are either proper leads or red herrings.

### Complications: List of 6 complications, things that can give a plot twist. The first one is always "Everything is as presented." but in some cases the second and third is as well.

Here is an example of a real contract:

## INTO THE WOODS
**Mark:** Dipa Garlow
**Wanted for:** Skipping bail
**Priority:** Low (★)
**Status:** Alive
**Bounty:** Cr8,000
**Issuer:** Bail Bondsman
**Known associates:** Zofia Garlow (wife), Cybele Garlow (daughter), various family friends, former co-workers at a pharmaceutical giant, suspected black market brokers at the downport.

## Referee’s information:
**Reputation:** 1
**Description:** Dipa Garlow skipped on the terms of his bail and missed his first appearance in court. A mid-ranking employee in a large, international pharmaceutical chain, he is accused of selling significant quantities of ‘spoiled’ or otherwise unsellable prescription narcotics to local brokers who would then ship them offworld for resale. He was last seen leaving his rented accommodation, presumably on his way to court except that he never showed up. The case is only a few hours old but the contract has already been passed on to the local bail bondsmen with a small reward for Dipa’s re-arrest.
**Suggested location:** A colony

## Locations:
1. Dipa’s Wife
   - Estranged since Dipa’s arrest and charge, Zofia put up a portion of their family home to pay his bail and she is furious at having him wreck their lives not once but twice.
   - She is as determined as the Travellers to send him back to court.
   - She has no idea where he is.
2. Fringe Relations
   - Dipa’s co-workers at the pharmaceuticals laboratory where he is, unsurprisingly, no longer an employee, do not know his location.
   - Family friends now want nothing to do with him.
3. The Brokers
   - If they can smuggle his drugs then perhaps, for enough Credits, they could smuggle him too. The Travellers will find no evidence of this, however.
   - One of the brokers, with half an eye on looking cooperative when this case eventually returns to trial, mentions that Dipa once talked about enjoying hunting and fishing.
   - With some pressure, the broker reveals that Dipa has a small cabin, somewhere in the wilderness beyond the edge of the colony but he knows nothing more about it.
4. Dipa’s Cabin
   - If the Travellers go to Zofia, they will return to find her frantic. She has just taken a call from Cybele’s school that said Dipa took their daughter about an hour ago.
   - The Travellers can check his current address and other possible whereabouts, but he has disappeared.
   - Fortunately, Dipa is no criminal mastermind and his vehicle has been flagged on just about every traffic camera between Cybele’s school and the edge of the colony – information that a quick stop at the Travellers’ employer should make readily available.
   - Zofia demands to go with the Travellers, offering to drive them to the cabin herself.
5. Beyond the Colony
   - The wildlife is large, abundant and frequently aggressive. The road stops well short of the cabin and the few man-made trails are shallow and hard to spot.
   - Survival skills are a must or, failing that, a local guide with good knowledge of the area.
   - Dipa has booby-trapped the approaches to his cabin. These will be meant for hunting, so pitfalls and bear traps, but enough to cause a nasty injury if the Travellers are incautious.

## Complications:
1) Everything is as presented.
2) Zofia is aware of the location of her husband and has been putting money aside to move their family out of the area and hopefully, to a better life.
3) As in 2 but the situation is a trap. Zofia and Dipa are attempting to isolate the Travellers to stop the group from tracking their family.
4) The corporation Dipa worked for has sent a team of field operatives after the man.
5) As in 3 but an opposing corporation has also sent a team of field operatives to recover Dipa. They are lobbying for the ability to sell out of date medicines to poorer systems.
6) Two hired thugs are seeking out Dipa, after he sold expired medication to their boss.

Now, generate a similar bounty hunter contract in the Traveller universe with the specified priority and reputation. Return it in a markdown format.`;
}

function copyPromptToClipboard() {
	navigator.clipboard.writeText(getPromptText()).then(() => {
		promptCopied.value = true;
		setTimeout(() => {
			promptCopied.value = false;
		}, 1000);
	});
}

function copyToClipboard() {
	if (bounty.value) {
		navigator.clipboard.writeText(bounty.value).then(() => {
			copied.value = true;
			setTimeout(() => {
				copied.value = false;
			}, 1000);
		});
	}
}

onMounted(() => {
	apiKeyStore.loadApiKey();
});

async function generateBounty() {
	try {
		isLoading.value = true;
		const response = await fetch("https://api.openai.com/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKeyStore.apiKey}`,
			},
			body: JSON.stringify({
				model: "gpt-4o-mini",
				messages: [
					{
						role: "system",
						content: "You are an expert in the Traveller Mongoose 2ed universe and a skilled bounty hunter contract creator.",
					},
					{
						role: "user",
						content: getPromptText(),
					},
				],
				max_tokens: 2000,
			}),
		});

		const data = await response.json();
		bounty.value = data.choices[0].message.content;
		isLoading.value = false;
	} catch (error) {
		console.error("Error generating bounty:", error);
		bounty.value = "An error occurred while generating the bounty. Please try again.";
	}
}

function renderMarkdown(markdown: string) {
	return marked(markdown);
}
</script>
