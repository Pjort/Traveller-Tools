<template>
	<div>
		<h1 class="text-2xl font-bold mb-4">Roll Draft</h1>

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

const updateTermString = () => {
	let termString = currentTermString.value + roll.value.toString();
	if (roll.value === 4 || roll.value === 6) termString += "1"; // If the roll is Merchant or Agent, then select assigment 1 (Merchant marine or Law enforcement)
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
