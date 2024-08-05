<template>
	<div>
		<h1 class="p-2">Select Training table</h1>
		<div class="p-2">
			<div v-for="trainingTable in trainingTables" :key="trainingTable.Id">
				<input type="radio" v-model="selectedTrainingTable" :value="trainingTable.Id" :id="trainingTable.Name" />
				<label :for="trainingTable.Name">{{ " " + trainingTable.Name }}</label>
			</div>
		</div>
		<button @click="ApplyInput" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const trainingTables = computed(() => characterStore.getCurrentCareer?.TrainingTables);
const currentTermString = computed(() => characterStore.getCharacterInput.TermsString);
const selectedTrainingTable = ref<number | null>(null);

const ApplyInput = () => {
	if (!selectedTrainingTable.value) return;
	let termString = currentTermString.value + selectedTrainingTable.value.toString();
	characterStore.updateTermsString(termString);
	characterStore.parseCharacter();
};
</script>
