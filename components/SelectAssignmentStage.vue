<template>
	<div>
		<h1 class="text-2xl font-bold mb-4">Select Assignment</h1>

		<div class="p-2">
			<div v-for="assignment in assignments" :key="assignment.Id">
				<input type="radio" v-model="selectedAssignment" :value="assignment.Id" :id="assignment.Name" />
				<label :for="assignment.Name"
					>{{
						" " +
						assignment.Name +
						" (" +
						assignment.SurvivalCheck.CharacteristicsType +
						" " +
						assignment.SurvivalCheck.TargetValue +
						"+, " +
						assignment.AdvancementCheck.CharacteristicsType +
						" " +
						assignment.AdvancementCheck.TargetValue +
						"+)"
					}}
					<p class="text-sm mb-3 text-slate-700">
						{{ assignment.Description }}
					</p>
				</label>
			</div>
		</div>
		<button @click="ApplyInput" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const assignments = computed(() => characterStore.getCurrentCareer?.Assignments);
const currentTermString = computed(() => characterStore.getCharacterInput.TermsString);
const selectedAssignment = ref<number | null>(null);

const ApplyInput = () => {
	if (!selectedAssignment.value) return;
	let termString = currentTermString.value + selectedAssignment.value.toString();
	characterStore.updateTermsString(termString);
	characterStore.parseCharacter();
};
</script>
