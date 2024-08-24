<template>
	<div>
		<h1 class="text-2xl font-bold mb-4">Select Career</h1>

		<div class="p-2">
			<div v-for="career in careers" :key="career.Id">
				<input type="radio" v-model="selectedCareer" :value="career.Id" :id="career.Name" />
				<label :for="career.Name">{{
					" " + career.Name + " (" + career.QualificationCheck.CharacteristicsType + " " + career.QualificationCheck.TargetValue + "+)"
				}}</label>
			</div>
		</div>
		<button @click="ApplyInput" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const careers = computed(() => CareersDb.GetCareers());
const selectedCareer = ref<string | null>(null);
const currentTermString = computed(() => characterStore.getCharacterInput.TermsString);

const ApplyInput = () => {
	let termString = selectedCareer.value?.toString().padStart(2, "0");
	if (!termString) return;
	termString = currentTermString.value + termString;
	characterStore.updateTermsString(termString);
	characterStore.parseCharacter();
};
</script>
