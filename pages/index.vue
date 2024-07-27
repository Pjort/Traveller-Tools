<template>
	<div class="m-2">
		<p class="font-semibold">Character generator</p>
		<p>Name: {{ results.Name }}</p>
		<p>Age: {{ results.Age }}</p>
		<p>Race: {{ Race[results.Race] }}</p>
		<p>Home World: {{ results.HomeWorld }}</p>
		<p>Characteristics: {{ results.Characteristics }}</p>
		<p>Skills: {{ results.Skills }}</p>
		<p>Terms: {{ results.Terms }}</p>
		<br />
		<br />
		<p>Lifepath: {{ results.LifePath }}</p>
	</div>
</template>

<script lang="ts" setup>
import { CharacterInput, CharacterUtilities, Race } from "#imports";

let characterInput: CharacterInput = new CharacterInput();

characterInput.Name = "John";
characterInput.Race = Race.Human;
characterInput.HomeWorld = "Terra";
characterInput.CharacteristicsString = "11111111111100";
characterInput.BackgroundSkillsString = "010203";
characterInput.TermsString = "013412408NT011221112";

const results = CharacterUtilities.ParseCharacter(characterInput);
</script>
