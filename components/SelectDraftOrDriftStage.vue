<template>
	<div>
		<h1 class="p-2">Select Career</h1>
		<div class="p-2">
			<div v-for="choice in choices" :key="choice.id">
				<input type="radio" v-model="selectedChoice" :value="choice.id" :id="choice.id" />
				<label :for="choice.id">{{ " " + choice.value }}</label>
			</div>
		</div>
		<button class="p-2 bg-slate-400" @click="ApplyInput">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const currentTermString = computed(() => characterStore.getCharacterInput.TermsString);

const choices: { id: string; value: string }[] = [
	{ id: "1", value: "Submit to Draft" },
	{ id: "2", value: "Become a Drifter" },
];
const selectedChoice = ref<string | null>(null);

const ApplyInput = () => {
	if (!selectedChoice.value) return;
	let termString = currentTermString.value + selectedChoice.value.toString();
	characterStore.updateTermsString(termString);
	characterStore.parseCharacter();
};
</script>
