<template>
	<div>
		<h1 class="text-2xl font-bold mb-4">Background Skill</h1>

		<div class="p-2">
			<!-- TODO: Add the education calculation for how many maximum backgroundSkills can be taken -->
			<div v-for="skill in backgroundSkills" :key="skill.Id">
				<input type="checkbox" v-model="selectedBackgroundSkills" :value="skill.Id" :id="skill.Name" />
				<label :for="skill.Name">{{ " " + skill.Name }}</label>
			</div>
		</div>
		<button @click="ApplyInput" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const backgroundSkills = computed(() => SkillsDb.GetBackgroundSkills());
const selectedBackgroundSkills = ref<(typeof SkillDbRecord)[]>([]);

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
