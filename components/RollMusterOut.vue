<template>
	<div class="container mx-auto p-4">
		<h1 class="text-2xl font-bold mb-4">Mustering Out Benefits</h1>

		<div class="p-2">
			<div v-for="choice in choices" :key="choice.key">
				<input type="radio" v-model="selectedChoice" :value="choice.key" :id="choice.key" />
				<label :for="choice.key">{{ " " + choice.value }}</label>
			</div>
		</div>
		<div class="mt-4">
			<DiceInput v-model="roll" :numDice="1" />
		</div>
		<button @click="ApplyInput" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
			Apply
		</button>
		<div class="overflow-x-auto mt-6">
			<table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
				<thead class="bg-gray-100">
					<tr>
						<th class="px-4 py-2 text-left">Roll</th>
						<th class="px-4 py-2 text-left">Cash</th>
						<th class="px-4 py-2 text-left">Benefit</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="benefit in musterOutTable" :key="benefit.Id" class="border-t">
						<td class="px-4 py-2">{{ benefit.Id }}</td>
						<td class="px-4 py-2">CR {{ benefit.Cash }}</td>
						<td class="px-4 py-2">
							<div v-for="(reward, index) in benefit.Benefits" :key="index">
								{{ reward.Description }}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const termsCount = computed(() => characterStore.getCharacter.Terms.length);
const currentTermString = computed(() => characterStore.getCharacterInput.TermsString);
const roll: Ref<number> = ref(0);
const benefitRollsLeft = computed(() => characterStore.getAmountOfBenefitRollsLeft);
const musterOutTable = computed(() => characterStore.getCurrentCareer?.MusterOutTable);

const choices: { key: string; value: string }[] = [
	{ key: "1", value: "Cash" },
	{ key: "2", value: "Benefits" },
];
const selectedChoice = ref<string | null>(null);

if (benefitRollsLeft.value < 1) {
	if (termsCount.value >= 4) {
		characterStore.updateTermsString(currentTermString.value + "A");
	} else {
		characterStore.updateTermsString(currentTermString.value + "NT");
	}
	characterStore.parseCharacter();
}

const updateTermString = () => {
	let termString = (currentTermString.value ?? "") + selectedChoice.value?.toString() + roll.value.toString().padStart(1, "0");
	characterStore.updateTermsString(termString);

	// Reset roll
	roll.value = 0;
};

const ApplyInput = () => {
	if (roll.value < 1 || roll.value > 7 || !selectedChoice.value) {
		alert("Cash or Benefits must be selected and Roll must be between 1 and 7");
		return;
	}
	updateTermString();
	if (benefitRollsLeft.value - 1 < 1) {
		if (termsCount.value >= 4) {
			characterStore.updateTermsString(currentTermString.value + "A");
		} else {
			characterStore.updateTermsString(currentTermString.value + "NT");
		}
	}
	characterStore.parseCharacter();
};
</script>
