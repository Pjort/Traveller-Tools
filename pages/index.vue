<template>
	<div class="m-2">
		<p class="font-semibold">Character generator</p>
		<div>
			<CharacterStage v-if="currentStageId === 1" />
			<CharacteristicsStage v-if="currentStageId === 2" />
			<BackgroundSkillsStage v-if="currentStageId == 3" />
			<SelectCareerStage v-if="currentStageId == 4" />
			<RollQualificationStage v-if="currentStageId == 5" />
			<SelectAssignmentStage v-if="currentStageId == 6" />
			<SelectTrainingTableStage v-if="currentStageId == 7" />
			<RollTrainingTableStage v-if="currentStageId == 8" />
			<RollSurvivalStage v-if="currentStageId == 9" />
			<RollEventStage v-if="currentStageId == 10" />
			<SelectDraftOrDriftStage v-if="currentStageId == 60" />
			<RollDraftStage v-if="currentStageId == 61" />
		</div>
		<br />
		<br />
		<p>Name: {{ character.Name }}</p>
		<p>Age: {{ character.Age }}</p>
		<p>Race: {{ Race[character.Race] }}</p>
		<p>Home World: {{ character.HomeWorld }}</p>
		<p>Characteristics: {{ character.Characteristics }}</p>
		<p>Skills: {{ character.Skills }}</p>
		<p>Terms: {{ character.Terms }}</p>
		<br />
		<br />
		<p>Lifepath:</p>
		<p v-for="path in character.LifePath">{{ path }}</p>
	</div>
</template>

<script lang="ts" setup>
import { Race } from "#imports";

const characterStore = useCharacterStore();
const character = computed(() => characterStore.character);
const currentStageId = computed(() => character.value.currentStageId);

onMounted(() => {
	// Get Name, Race and Home World from params
	const params = new URLSearchParams(window.location.search);
	const name = params.get("name") ?? "";
	const race: number = parseInt(params.get("race") ?? "0");
	const homeWorld = params.get("homeWorld") ?? "";
	const characteristicsString = params.get("characteristics") ?? "";
	const backgroundSkillsString = params.get("backgroundSkills") ?? "";
	const termString = params.get("terms") ?? "";

	if (race) {
		characterStore.updateRace(race);
	}
	if (homeWorld != "") {
		characterStore.updateHomeWorld(homeWorld);
	}

	if (characteristicsString != "") {
		characterStore.updateCharacteristicsString(characteristicsString);
	}

	if (backgroundSkillsString != "") {
		characterStore.updateBackgroundSkillsString(backgroundSkillsString);
	}

	if (termString != "") {
		characterStore.updateTermsString(termString);
	}

	if (name != "") {
		characterStore.updateName(name);
		characterStore.parseCharacter();
	}
});
</script>
