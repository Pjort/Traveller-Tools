<template>
	<div>
		<h1 class="p-2">Roll Survival</h1>

		<div class="p-2">
			<p class="p-2">
				Requires: {{ currentAssignment?.SurvivalCheck.CharacteristicsType }}
				{{ currentAssignment?.SurvivalCheck.TargetValue }}+
			</p>
			<div class="p-2">
				Roll:
				<input class="bg-slate-200" type="number" v-model.number="roll" placeholder="2D" min="0" max="15" />
			</div>
		</div>
		<button class="p-2 bg-slate-400" @click="ApplyInput">Apply</button>
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
