<template>
	<div class="p-2">
		<div v-for="skill in backgroundSkills" :key="skill.Id">
			<input type="checkbox" v-model="selectedBackgroundSkills" :value="skill.Id" :id="skill.Name" />
			<label :for="skill.Name">{{ " " + skill.Name }}</label>
		</div>
	</div>
</template>

<script lang="ts" setup>
const characterInputStore = useCharacterInputStore();
const backgroundSkills = computed(() => SkillsDb.GetBackgroundSkills());
const selectedBackgroundSkills = ref<(typeof SkillDbRecord)[]>([]);

const updateBackgroundSkillsString = () => {
	let backgroundSkillsString = "";
	for (let skillId of selectedBackgroundSkills.value) {
		backgroundSkillsString += skillId.toString().padStart(2, "0");
	}
	characterInputStore.updateBackgroundSkillsString(backgroundSkillsString);
};

watch(selectedBackgroundSkills, () => {
	updateBackgroundSkillsString();
});
</script>
