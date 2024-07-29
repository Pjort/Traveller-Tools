<template>
	<div class="m-2">
		<p class="font-semibold">Character generator</p>
		<div>
			<CharacterStage v-if="currentStageId === 1" />
			<CharacteristicsStage v-if="currentStageId === 2" />
			<BackgroundSkillsStage v-if="currentStageId == 3" />

			
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
