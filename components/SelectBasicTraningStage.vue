<template>
	<div>
		<h1 class="text-2xl font-bold mb-4">Select Basic Traning</h1>

		<div class="p-2">
			<div v-for="reward in serviceSkills" :key="reward.Id">
				<input type="radio" v-model="selectedSkill" :value="reward.Id" :id="reward.Description" />
				<label class="ml-3" :for="reward.Description">{{ reward.Description }} 0 </label>
			</div>
		</div>
		<button @click="ApplyInput" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const serviceSkills = computed(() => characterStore.getCurrentCareer?.TrainingTables.find((t) => t.Id === 2)?.Rewards);
const currentTermString = computed(() => characterStore.getCharacterInput.TermsString);
const selectedSkill = ref<number | null>(null);

const ApplyInput = () => {
	if (!selectedSkill.value) return;
	let termString = currentTermString.value + selectedSkill.value.toString();
	characterStore.updateTermsString(termString);
	characterStore.parseCharacter();
};
</script>
