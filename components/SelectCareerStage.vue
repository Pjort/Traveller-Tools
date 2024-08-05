<template>
	<div>
		<h1 class="p-2">Select Career</h1>
		<div class="p-2">
			<div v-for="career in careers" :key="career.Id">
				<input type="radio" v-model="selectedCareer" :value="career.Id" :id="career.Name" />
				<label :for="career.Name">{{ " " + career.Name }}</label>
			</div>
		</div>
		<button @click="ApplyInput" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const careers = computed(() => CareersDb.GetCareers());
const selectedCareer = ref<string | null>(null);

const updateTermString = () => {
	let termString = selectedCareer.value ? selectedCareer.value.toString().padStart(2, "0") : "";
	characterStore.updateTermsString(termString);
};

watch(selectedCareer, () => {
	updateTermString();
});

const ApplyInput = () => {
	characterStore.parseCharacter();
};
</script>
