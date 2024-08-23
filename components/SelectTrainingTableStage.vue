<template>
	<div class="container mx-auto p-4">
		<h1 class="text-2xl font-bold mb-4">Select Training Table</h1>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div
				v-for="table in trainingTables"
				:key="table.Id"
				@click="selectTable(table.Id)"
				class="bg-white shadow-md rounded-lg p-3 cursor-pointer hover:shadow-lg transition-shadow duration-200"
				:class="{ 'ring-2 ring-blue-500': selectedTrainingTable === table.Id }"
			>
				<h2 class="text-lg font-semibold mb-2">{{ table.Name }}</h2>
				<div class="text-gray-600 space-y-1 text-sm">
					<div v-for="reward in table.Rewards" :key="reward.Id" class="flex">
						<span class="w-4 flex-shrink-0 mr-2">{{ reward.Id }}:</span>
						<span>{{ reward.Description }}</span>
					</div>
				</div>
			</div>
		</div>
		<button @click="ApplyInput" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
			Apply
		</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const trainingTables = computed(() => characterStore.getCurrentCareer?.TrainingTables);
const currentTermString = computed(() => characterStore.getCharacterInput.TermsString);
const selectedTrainingTable = ref<number | null>(null);

function selectTable(id: number) {
	selectedTrainingTable.value = id;
}

const ApplyInput = () => {
	if (!selectedTrainingTable.value) return;
	let termString = currentTermString.value + selectedTrainingTable.value.toString();
	characterStore.updateTermsString(termString);
	characterStore.parseCharacter();
};
</script>
