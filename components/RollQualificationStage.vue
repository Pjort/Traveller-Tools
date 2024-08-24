<template>
	<div>
		<h1 class="text-2xl font-bold mb-4">Roll Qualifications</h1>

		<div class="p-2">
			<p class="p-2">
				Requires: {{ currentCareer?.QualificationCheck.CharacteristicsType }} {{ currentCareer?.QualificationCheck.TargetValue }}+
			</p>
			<DiceInput v-model="roll" :numDice="2" />
		</div>
		<button @click="ApplyInput" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const currentCareer = computed(() => characterStore.getCurrentCareer);
const currentTermString = computed(() => characterStore.getCharacterInput.TermsString);
const roll: Ref<number> = ref(0);

const updateTermString = () => {
	let termString = currentTermString.value + roll.value.toString().padStart(2, "0");
	characterStore.updateTermsString(termString);
};

const ApplyInput = () => {
	if (roll.value < 2 || roll.value > 12) {
		alert("Roll must be between 2 and 12");
		return;
	}
	updateTermString();
	characterStore.parseCharacter();
};
</script>
