<template>
	<div>
		<h1 class="p-2">Select Assignment</h1>
		<div class="p-2">
			<div v-for="assignment in assignments" :key="assignment.Id">
				<input type="radio" v-model="selectedAssignment" :value="assignment.Id" :id="assignment.Name" />
				<label :for="assignment.Name">{{ " " + assignment.Name }}</label>
			</div>
		</div>
		<button class="p-2 bg-slate-400" @click="ApplyInput">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const assignments = computed(() => characterStore.getCurrentCareer?.Assignments);
const currentTermString = computed(() => characterStore.getCharacterInput.TermsString);
const selectedAssignment = ref<number>(0);

const updateTermString = () => {
	let termString = currentTermString.value + selectedAssignment.value.toString();
	characterStore.updateTermsString(termString);
};

watch(selectedAssignment, () => {
	updateTermString();
});

const ApplyInput = () => {
	characterStore.parseCharacter();
};
</script>
