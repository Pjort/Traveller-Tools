<template>
	<div>
		<h1 class="p-2">Roll Advancement</h1>

		<div class="p-2">
			<p class="p-2">
				Requires: {{ currentAssignment?.AdvancementCheck.CharacteristicsType }} {{ currentAssignment?.AdvancementCheck.TargetValue }}+
			</p>
			<DiceInput v-model="roll" :numDice="2" />
		</div>
		<button @click="ApplyInput" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const currentAssignment = computed(() => characterStore.getCurrentAssignment);
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
