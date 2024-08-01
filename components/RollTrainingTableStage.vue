<template>
	<div>
		<h1 class="p-2">Roll Training table</h1>

		<div class="p-2">
			<div class="p-2">
				Roll:
				<input class="bg-slate-200" type="number" v-model.number="roll" placeholder="1D" min="0" max="6" />
			</div>
		</div>
		<button class="p-2 bg-slate-400" @click="ApplyInput">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const currentCareer = computed(() => characterStore.getCurrentCareer);
const currentTermString = computed(() => characterStore.getCharacterInput.TermsString);
const roll: Ref<number> = ref(0);

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
