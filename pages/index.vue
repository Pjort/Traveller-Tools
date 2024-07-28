<template>
	<div class="m-2">
		<p class="font-semibold">Character generator</p>
		<div>
			<h1 class="p-2">{{ currentStage?.Title }}</h1>

			<div v-if="currentStageId == 1">
				<div class="p-2">
					Name: <input class="bg-slate-200" type="text" v-model="characterInput.Name" placeholder="Name" />
				</div>
				<div class="p-2">
					Home world:<input
						class="bg-slate-200"
						type="text"
						v-model="characterInput.HomeWorld"
						placeholder="Home World"
					/>
				</div>
				<div class="p-2">
					Race:
					<select name="race" id="" v-model="characterInput.Race">
						<option value="0">Human</option>
						<option value="1">Aslan</option>
						<option value="2">Vargr</option>
					</select>
				</div>
			</div>

			<div v-if="currentStageId == 2">
				<div class="p-2">
					Strength:
					<input
						class="bg-slate-200"
						type="number"
						v-model.number="characteristics.Strength"
						placeholder="Strength"
						min="0"
						max="15"
					/>
				</div>
				<div class="p-2">
					Dexterity:
					<input
						class="bg-slate-200"
						type="number"
						v-model.number="characteristics.Dexterity"
						placeholder="Dexterity"
						min="0"
						max="15"
					/>
				</div>
				<div class="p-2">
					Endurance:
					<input
						class="bg-slate-200"
						type="number"
						v-model.number="characteristics.Endurance"
						placeholder="Endurance"
						min="0"
						max="15"
					/>
				</div>
				<div class="p-2">
					Intellect:
					<input
						class="bg-slate-200"
						type="number"
						v-model.number="characteristics.Intellect"
						placeholder="Intelligence"
						min="0"
						max="15"
					/>
				</div>
				<div class="p-2">
					Education:
					<input
						class="bg-slate-200"
						type="number"
						v-model.number="characteristics.Education"
						placeholder="Education"
						min="0"
						max="15"
					/>
				</div>
				<div class="p-2">
					Social Standing:
					<input
						class="bg-slate-200"
						type="number"
						v-model.number="characteristics.SocialStanding"
						placeholder="Social Standing"
						min="0"
						max="15"
					/>
				</div>
			</div>
			<div v-if="currentStageId == 3">
				<div class="p-2">
					<div v-for="skill in backgroundSkills" :key="skill.Id">
						<input type="checkbox" v-model="selectedBackgroundSkills" :value="skill.Id"> {{ skill.Name }} </input>
					</div>
				</div>
			</div>

			<button class="p-2 bg-slate-400" @click="ApplyInput">Apply</button>
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
import { Character, CharacterInput, Characteristics, Race, SkillDbRecord, StagesDb } from "#imports";

let characterInput: CharacterInput = new CharacterInput();

const character = ref(new Character(""));
const currentStageId = computed(() => character.value.currentStageId);
const currentStage = computed(() => StagesDb.GetStageById(currentStageId.value));
const characteristics = ref(new Characteristics());
const backgroundSkills = computed(() => SkillsDb.GetBackgroundSkills());
const selectedBackgroundSkills = ref<typeof SkillDbRecord[]>([]);

// characterInput.CharacteristicsString = "11111111111100";
// characterInput.BackgroundSkillsString = "010203";
// characterInput.TermsString = "013412408NT011221112";

// character.value = CharacterUtilities.ParseCharacter(characterInput);

const ApplyInput = () => {
	if (currentStageId.value == 2) {
		characterInput.CharacteristicsString = characteristics.value.ToParsingString();
	}
	let backgroundSkillsString: string = "";
	if (currentStageId.value == 3) {
		for (let skillId of selectedBackgroundSkills.value) {
			backgroundSkillsString += skillId.toString().padStart(2,"0");
		}
		characterInput.BackgroundSkillsString = backgroundSkillsString;
	}
	character.value = CharacterUtilities.ParseCharacter(characterInput);
};
</script>
