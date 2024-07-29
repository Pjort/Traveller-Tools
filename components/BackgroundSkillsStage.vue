<template>
	<div>
		<h1 class="p-2">Background Skill</h1>
		<div class="p-2">
			<div v-for="skill in backgroundSkills" :key="skill.Id">
				<input type="checkbox" v-model="selectedBackgroundSkills" :value="skill.Id" :id="skill.Name" />
				<label :for="skill.Name">{{ " " + skill.Name }}</label>
			</div>
		</div>
		<button class="p-2 bg-slate-400" @click="ApplyInput">Apply</button>
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
