<template>
	<div>
		<h1 class="p-2">Muster out (Rolls left: {{ benefitRollsLeft }})</h1>
		<div class="p-2">
			<div v-for="choice in choices" :key="choice.key">
				<input type="radio" v-model="selectedChoice" :value="choice.key" :id="choice.key" />
				<label :for="choice.key">{{ " " + choice.value }}</label>
			</div>
		</div>
		<div class="p-2">
			<DiceInput v-model="roll" :numDice="1" />
		</div>
		<button @click="ApplyInput" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const currentTermString = computed(() => characterStore.getCharacterInput.TermsString);
const roll: Ref<number> = ref(0);
const benefitRollsLeft = computed(() => characterStore.getAmountOfBenefitRollsLeft);

const choices: { key: string; value: string }[] = [
	{ key: "1", value: "Cash" },
	{ key: "2", value: "Benefits" },
];
const selectedChoice = ref<string | null>(null);

if (benefitRollsLeft.value < 1) {
	characterStore.updateTermsString(currentTermString.value + "NT");
	characterStore.parseCharacter();
}

const updateTermString = () => {
	if (roll.value < 1 || roll.value > 7 || !selectedChoice.value) {
		alert("Roll must be between 1 and 7, and Cash or Benefits must be selected.");
		return;
	}

	let termString = currentTermString.value + selectedChoice.value.toString() + roll.value.toString().padStart(1, "0");
	characterStore.updateTermsString(termString);

	// Reset roll
	roll.value = 0;
	// Reset selected choice
	selectedChoice.value = null;
};

const ApplyInput = () => {
	updateTermString();
	characterStore.parseCharacter();
};

watch(benefitRollsLeft, (newValue) => {
	if (newValue < 1) {
		characterStore.updateTermsString(currentTermString.value + "NT");
		characterStore.parseCharacter();
	}
});
</script>
