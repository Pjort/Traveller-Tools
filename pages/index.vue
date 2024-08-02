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
		<p>TermsString: {{ characterStore.getCharacterInput.TermsString }}</p>
		<p>Terms: {{ character.Terms }}</p>
		<br />
		<br />
		<p>Lifepath: <p v-for="path in character.LifePath">{{ path }}</p></p>
	</div>
</template>

<script lang="ts" setup>
import { Race } from "#imports";


const characterStore = useCharacterStore();
const character =  computed(() => characterStore.character);
const currentStageId = computed(() => character.value.currentStageId);



// characterInput.CharacteristicsString = "11111111111100";
// characterInput.BackgroundSkillsString = "010203";
// characterInput.TermsString = "013412408NT011221112";

// character.value = CharacterUtilities.ParseCharacter(characterInput);


</script>
