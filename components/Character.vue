<template>
	<div class="p-6 bg-white rounded-lg shadow-md" v-if="character.Name">
		<h2 class="text-2xl font-bold mb-4">{{ character.Name }}</h2>
		<div class="mb-4">
			<p class="text-gray-700"><span class="font-semibold">Age:</span> {{ character.Age }}</p>
			<p class="text-gray-700"><span class="font-semibold">Race:</span> {{ Race[character.Race] }}</p>
			<p class="text-gray-700" v-if="character.HomeWorld"><span class="font-semibold">Home World:</span> {{ character.HomeWorld }}</p>
		</div>
		<div class="mb-4" v-if="character.Characteristics">
			<h3 class="text-xl font-semibold mb-2">Characteristics</h3>
			<ul class="grid grid-cols-2 gap-4">
				<li class="text-gray-600">
					<span class="font-semibold">Strength:</span> {{ character.Characteristics.Strength }} (DM:
					{{ createDiceModifierString(character.Characteristics.Strength) }})
				</li>
				<li class="text-gray-600">
					<span class="font-semibold">Intellect:</span> {{ character.Characteristics.Intellect }} (DM:
					{{ createDiceModifierString(character.Characteristics.Intellect) }})
				</li>
				<li class="text-gray-600">
					<span class="font-semibold">Dexterity:</span> {{ character.Characteristics.Dexterity }} (DM:
					{{ createDiceModifierString(character.Characteristics.Dexterity) }})
				</li>
				<li class="text-gray-600">
					<span class="font-semibold">Education:</span> {{ character.Characteristics.Education }} (DM:
					{{ createDiceModifierString(character.Characteristics.Education) }})
				</li>
				<li class="text-gray-600">
					<span class="font-semibold">Endurance:</span> {{ character.Characteristics.Endurance }} (DM:
					{{ createDiceModifierString(character.Characteristics.Endurance) }})
				</li>
				<li class="text-gray-600">
					<span class="font-semibold">Social St:</span> {{ character.Characteristics.SocialStanding }} (DM:
					{{ createDiceModifierString(character.Characteristics.SocialStanding) }})
				</li>
				<li class="text-gray-600">
					<span class="font-semibold">Psionics:</span> {{ character.Characteristics.Psionics }} (DM:
					{{ createDiceModifierString(character.Characteristics.Psionics) }})
				</li>
			</ul>
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
			<p class="text-xl ml-2">{{ "CR" + character.Cash }}</p>
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
				<p v-if="term.Rank" class="ml-4"><span class="font-semibold">Title:</span> {{ term.Rank.Title }}</p>
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
const characterStore = useCharacterStore();
const character = computed(() => characterStore.character);

const calculateDiceModifier = (value: number): number => {
	// 0 is -3
	// 1-2 is -2
	// 3-5 is -1
	// 6-8 is 0
	// 9-11 is +1
	// 12-14 is +2
	// 15+ is +3

	if (value <= 0) return -3;
	if (value <= 2) return -2;
	if (value <= 5) return -1;
	if (value <= 8) return 0;
	if (value <= 11) return 1;
	if (value <= 14) return 2;
	if (value <= 15) return 3;

	return -3;
};

const createDiceModifierString = (value: number): string => {
	const modifier = calculateDiceModifier(value);
	if (modifier > 0) return `+${modifier}`;
	return modifier.toString();
};
</script>
