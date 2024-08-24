<template>
	<div class="p-6 bg-white rounded-lg shadow-md" v-if="character.Name">
		<div class="flex justify-between">
			<h2 class="text-2xl font-bold mb-4">{{ character.Name }}</h2>
			<button @click="copyToClipboard" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 h-8 flex items-center">
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
				Markdown
				<p v-if="copied" class="text-green-500 bg-black rounded-md p-2 mt-16 fixed">Copied!</p>
			</button>
		</div>

		<div class="mb-4">
			<p class="text-gray-700"><span class="font-semibold">Age:</span> {{ character.Age }}</p>
			<p class="text-gray-700"><span class="font-semibold">Race:</span> {{ Race[character.Race] }}</p>
			<p class="text-gray-700" v-if="character.HomeWorld"><span class="font-semibold">Home World:</span> {{ character.HomeWorld }}</p>
		</div>
		<div class="mb-4" v-if="character.Characteristics">
			<h3 class="text-xl font-semibold mb-2">Characteristics</h3>
			<ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<li class="text-gray-600 order-1 sm:order-1">
					<span class="font-semibold">Strength:</span> {{ character.Characteristics.Strength }} ({{
						CharacterUtilities.createDiceModifierString(character.Characteristics.Strength)
					}})
				</li>
				<li class="text-gray-600 order-4 sm:order-2">
					<span class="font-semibold">Intellect:</span> {{ character.Characteristics.Intellect }} ({{
						CharacterUtilities.createDiceModifierString(character.Characteristics.Intellect)
					}})
				</li>
				<li class="text-gray-600 order-2 sm:order-3">
					<span class="font-semibold">Dexterity:</span> {{ character.Characteristics.Dexterity }} ({{
						CharacterUtilities.createDiceModifierString(character.Characteristics.Dexterity)
					}})
				</li>
				<li class="text-gray-600 order-5 sm:order-4">
					<span class="font-semibold">Education:</span> {{ character.Characteristics.Education }} ({{
						CharacterUtilities.createDiceModifierString(character.Characteristics.Education)
					}})
				</li>
				<li class="text-gray-600 order-3 sm:order-5">
					<span class="font-semibold">Endurance:</span> {{ character.Characteristics.Endurance }} ({{
						CharacterUtilities.createDiceModifierString(character.Characteristics.Endurance)
					}})
				</li>
				<li class="text-gray-600 order-6 sm:order-6">
					<span class="font-semibold">Social St:</span> {{ character.Characteristics.SocialStanding }} ({{
						CharacterUtilities.createDiceModifierString(character.Characteristics.SocialStanding)
					}})
				</li>
				<li class="text-gray-600 order-7 sm:order-7">
					<span class="font-semibold">Psionics:</span> {{ character.Characteristics.Psionics }} ({{
						CharacterUtilities.createDiceModifierString(character.Characteristics.Psionics)
					}})
				</li>
			</ul>
		</div>
		<div class="mb-4" v-if="character.Traits.length > 0">
			<h3 class="text-xl font-semibold mb-2">Traits</h3>
			<div class="text-gray-700 prose" v-for="trait in character.Traits" :key="trait" v-html="renderMarkdown(trait)"></div>
		</div>
		<div class="mb-4" v-if="character.Skills.length > 0">
			<h3 class="text-xl font-semibold mb-2">Skills</h3>
			<ul class="list-disc list-inside ml-2">
				<li v-for="(skill, index) in character.Skills" :key="index" class="text-gray-600">
					<span class="font-semibold">{{ skill.Name }}:</span> Level {{ skill.Level }}
				</li>
			</ul>
		</div>
		<div class="flex" v-if="character.Terms.length > 0">
			<h3 class="text-xl font-semibold mb-2">Cash:</h3>
			<p class="text-xl ml-2">{{ "Cr" + character.Cash }}</p>
		</div>
		<div class="mb-4" v-if="character.Items.length > 0">
			<h3 class="text-xl font-semibold mb-2">Items:</h3>
			<p class="ml-2" v-for="item in character.Items">{{ item.Description }}</p>
		</div>
		<div>
			<h3 class="text-xl font-semibold mb-2" v-if="character.Terms.length > 0">Terms</h3>
			<div v-for="(term, index) in character.Terms" :key="index" class="mb-4 p-4 border border-gray-200 rounded">
				<p>
					<span class="font-semibold">Term {{ term.Number }}:</span>
				</p>
				<p class="ml-4"><span class="font-semibold">Age:</span> {{ term.Age }}</p>
				<p v-if="term.Career" class="ml-4"><span class="font-semibold">Career:</span> {{ term.Career }}</p>
				<p v-if="term.Qualified !== undefined" class="ml-4">
					<span class="font-semibold">Qualified:</span> {{ term.Qualified ? "Yes" : "No" }}
				</p>
				<p v-if="term.Assignment" class="ml-4"><span class="font-semibold">Assignment:</span> {{ term.Assignment }}</p>
				<p v-if="term.Rank" class="ml-4"><span class="font-semibold">Rank:</span> {{ term.Rank.Id }}</p>
				<p v-if="term.Rank && term.Rank?.Title != ''" class="ml-4"><span class="font-semibold">Title:</span> {{ term.Rank.Title }}</p>
				<p v-if="term.Survived !== undefined" class="ml-4"><span class="font-semibold">Survived:</span> {{ term.Survived ? "Yes" : "No" }}</p>
				<p v-if="term.Advanced !== undefined" class="ml-4"><span class="font-semibold">Advanced:</span> {{ term.Advanced ? "Yes" : "No" }}</p>
				<div v-if="term.MusterOutBenefits?.length ?? 0 > 0" class="ml-4">
					<span class="font-semibold">Muster Out Benefits:</span>
					<ul class="list-disc list-inside ml-4">
						<li v-for="(benefit, index) in term.MusterOutBenefits" :key="index">{{ benefit }}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { marked } from "marked";
const characterStore = useCharacterStore();
const character = computed(() => characterStore.character);
const renderMarkdown = (markdown: string) => {
	return marked(markdown);
};

const copied = ref(false);

const copyToClipboard = () => {
	navigator.clipboard
		.writeText(CharacterSheetConverter.toMarkdown(character.value))
		.then(() => {
			copied.value = true;
			setTimeout(() => {
				copied.value = false;
			}, 1000);
		})
		.catch((err) => console.error(err));
};
</script>
