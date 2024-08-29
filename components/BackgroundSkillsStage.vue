<template>
	<div>
		<h1 class="text-2xl font-bold mb-4">Background Skills</h1>

		<div class="p-2">
			<div v-for="skill in backgroundSkills" :key="skill.Id" class="mb-2">
				<input type="checkbox" v-model="selectedBackgroundSkills" :value="skill.Id" :id="skill.Name" />
				<label :for="skill.Name" class="ml-2">{{ skill.Name }}</label>
			</div>
		</div>
		<div class="flex">
			<button
				@click="ApplyInput"
				class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
				:disabled="selectedBackgroundSkills.length === 0"
			>
				Apply
			</button>
			<p class="ml-3 px-3 py-1" v-if="educationDM">Selections left: {{ 3 + educationDM - selectedBackgroundSkills.length }}</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const backgroundSkills = computed(() => SkillsDb.GetBackgroundSkills());
const selectedBackgroundSkills = ref<(typeof SkillDbRecord)[]>([]);
const educationDM = computed(() => CharacterUtilities.CalculateDiceModifier(characterStore.getCharacter.Characteristics?.Education ?? 0));

const updateBackgroundSkillsString = () => {
	let backgroundSkillsString = "";
	for (let skillId of selectedBackgroundSkills.value) {
		backgroundSkillsString += skillId.toString().padStart(2, "0");
	}
	characterStore.updateBackgroundSkillsString(backgroundSkillsString);
};

watch(selectedBackgroundSkills, () => {
	updateBackgroundSkillsString();
});

const ApplyInput = () => {
	characterStore.parseCharacter();
};
</script>
