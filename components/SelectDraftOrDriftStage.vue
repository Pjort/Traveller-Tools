<template>
	<div>
		<h1 class="p-2">Select Career</h1>
		<div class="p-2">
			<div v-for="choice in choices" :key="choice.key">
				<input type="radio" v-model="selectedChoice" :value="choice.key" :id="choice.key" />
				<label :for="choice.key">{{ " " + choice.value }}</label>
			</div>
		</div>
		<button @click="ApplyInput" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const currentTermString = computed(() => characterStore.getCharacterInput.TermsString);

const choices: { key: string; value: string }[] = [
	{ key: "1", value: "Submit to Draft" },
	{ key: "2", value: "Become a Drifter" },
];
const selectedChoice = ref<string | null>(null);

const ApplyInput = () => {
	if (!selectedChoice.value) return;
	let termString = currentTermString.value + selectedChoice.value.toString();
	characterStore.updateTermsString(termString);
	characterStore.parseCharacter();
};
</script>
