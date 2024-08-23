<template>
	<div class="pb-5">
		<p class="text-2xl font-semibold mb-2">Character creator</p>
		<div class="md:flex">
			<div class="px-4 pt-2 pb-4 bg-white rounded-lg shadow-md max-w-2xl w-full mb-4">
				<CharacterStage v-if="currentStageId === 1" />
				<RollCharacteristicsStage v-if="currentStageId === 2" />
				<BackgroundSkillsStage v-if="currentStageId == 3" />
				<SelectCareerStage v-if="currentStageId == 4" />
				<RollQualificationStage v-if="currentStageId == 5" />
				<SelectAssignmentStage v-if="currentStageId == 6" />
				<SelectTrainingTableStage v-if="currentStageId == 7" />
				<RollTrainingTableStage v-if="currentStageId == 8" />
				<RollSurvivalStage v-if="currentStageId == 9" />
				<RollEventStage v-if="currentStageId == 10" />
				<RollAdvancementStage v-if="currentStageId == 11" />
				<SelectMusterOutOrNot v-if="currentStageId == 12" />
				<RollMusterOut v-if="currentStageId == 13" />
				<RollMishapStage v-if="currentStageId == 65" />
				<SelectDraftOrDriftStage v-if="currentStageId == 60" />
				<RollDraftStage v-if="currentStageId == 61" />

				<div class="p-3 pl-5 my-5 bg-slate-200 rounded-lg shadow-md" v-if="lastestLifePath.length != 0">
					<div v-for="path in lastestLifePath" :key="path" class="prose mx-auto mt-1" v-html="renderMarkdown(path)"></div>
				</div>

				<div class="hidden md:block pt-4" v-if="character.LifePath.length > 0">
					<p class="text-2xl font-semibold my-5">Life summary:</p>
					<div v-for="path in character.LifePath" :key="path" class="prose mx-auto mt-1" v-html="renderMarkdown(path)"></div>
				</div>
			</div>
			<div class="w-full max-w-lg mx-auto">
				<Character />
			</div>

			<div class="block md:hidden" v-if="character.LifePath.length > 0">
				<div v-for="path in character.LifePath" :key="path" class="prose max-w-lg mx-auto mt-1" v-html="renderMarkdown(path)"></div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Race } from "#imports";
import { marked } from "marked";

const characterStore = useCharacterStore();
const character = computed(() => characterStore.character);
const characterInput = computed(() => characterStore.characterInput);
const currentStageId = computed(() => character.value.currentStageId);
const lastestLifePath = computed(() => characterStore.getLastestLifePath);

const renderMarkdown = (markdown: string) => {
	return marked(markdown);
};

const updateURL = () => {
	const url = new URL(window.location.href);
	if (characterInput.value.Name != "") url.searchParams.set("name", characterInput.value.Name);
	if (characterInput.value.Race != 0) url.searchParams.set("Race", characterInput.value.Race.toString());
	if (characterInput.value.HomeWorld != null && characterInput.value.HomeWorld != "")
		url.searchParams.set("homeWorld", characterInput.value.HomeWorld);
	if (characterInput.value.CharacteristicsString != null && characterInput.value.CharacteristicsString != "")
		url.searchParams.set("characteristics", characterInput.value.CharacteristicsString);
	if (characterInput.value.BackgroundSkillsString != null && characterInput.value.BackgroundSkillsString != "")
		url.searchParams.set("backgroundSkills", characterInput.value.BackgroundSkillsString);
	if (characterInput.value.TermsString != null && characterInput.value.TermsString != "")
		url.searchParams.set("terms", characterInput.value.TermsString);
	window.history.replaceState({}, "", url);
};

watch(characterInput, updateURL, { deep: true });

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
	} else {
		// If no name is provided, start at the beginning
		characterStore.reset();
	}
});
</script>
