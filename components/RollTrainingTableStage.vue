<template>
	<div>
		<h1 class="p-2">Roll Training table</h1>

		<div class="p-2">
			<DiceInput v-model="roll" :numDice="1" />
		</div>
		<button @click="ApplyInput" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Apply</button>

		<div class="overflow-x-auto mt-6">
			<table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
				<thead class="bg-gray-100">
					<tr>
						<th class="px-4 py-2 text-left">Roll</th>
						<th class="px-4 py-2 text-left">Reward</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="reward in trainingTable.Rewards" :key="reward.Id" class="border-t">
						<td class="px-4 py-2 w-24">{{ reward.Id }}</td>
						<td class="px-4 py-2">{{ reward.Description }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const currentTermString = computed(() => characterStore.getCharacterInput.TermsString);
const roll: Ref<number> = ref(0);
const selectedTrainingTable: Ref<number> = computed(() => parseInt(characterStore.getCharacterInput.TermsString?.slice(-1) || "1") - 1);
const trainingTable = computed(() => characterStore.getCurrentCareer?.TrainingTables[selectedTrainingTable.value] ?? { Rewards: [] });

const updateTermString = () => {
	let termString = currentTermString.value + roll.value.toString();
	characterStore.updateTermsString(termString);
};

const ApplyInput = () => {
	if (roll.value < 1 || roll.value > 6) {
		alert("Roll must be between 1 and 6");
		return;
	}
	updateTermString();
	characterStore.parseCharacter();
};
</script>
