<template>
	<div class="m-2">
		<p class="font-semibold">Character generator</p>
		<div class="flex">
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

				<br />
				<br />
				<div v-if="character.LifePath.length > 0">
					<p>Lifepath:</p>
					<p v-for="path in character.LifePath" class="max-w-lg">{{ path }}</p>
				</div>
			</div>
			<div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md" v-if="character.Name">
				<h2 class="text-2xl font-bold mb-4">{{ character.Name }}</h2>
				<div class="mb-4">
					<p class="text-gray-700"><span class="font-semibold">Age:</span> {{ character.Age }}</p>
					<p class="text-gray-700"><span class="font-semibold">Race:</span> {{ Race[character.Race] }}</p>
					<p class="text-gray-700" v-if="character.HomeWorld">
						<span class="font-semibold">Home World:</span> {{ character.HomeWorld }}
					</p>
				</div>
				<div class="mb-4" v-if="character.Characteristics">
					<h3 class="text-xl font-semibold mb-2">Characteristics</h3>
					<ul class="grid grid-cols-2 gap-4">
						<li class="text-gray-600">
							<span class="font-semibold">Strength:</span> {{ character.Characteristics.Strength }}
						</li>
						<li class="text-gray-600">
							<span class="font-semibold">Dexterity:</span> {{ character.Characteristics.Dexterity }}
						</li>
						<li class="text-gray-600">
							<span class="font-semibold">Endurance:</span> {{ character.Characteristics.Endurance }}
						</li>
						<li class="text-gray-600">
							<span class="font-semibold">Intellect:</span> {{ character.Characteristics.Intellect }}
						</li>
						<li class="text-gray-600">
							<span class="font-semibold">Education:</span> {{ character.Characteristics.Education }}
						</li>
						<li class="text-gray-600">
							<span class="font-semibold">Social Standing:</span> {{ character.Characteristics.SocialStanding }}
						</li>
						<li class="text-gray-600">
							<span class="font-semibold">Psionics:</span> {{ character.Characteristics.Psionics }}
						</li>
					</ul>
				</div>
				<div class="mb-4" v-if="character.Skills.length > 0">
					<h3 class="text-xl font-semibold mb-2">Skills</h3>
					<ul class="list-disc list-inside">
						<li v-for="(skill, index) in character.Skills" :key="index" class="text-gray-600">
							<span class="font-semibold">{{ skill.Name }}:</span> Level {{ skill.Level }}
						</li>
					</ul>
				</div>
				<div>
					<h3 class="text-xl font-semibold mb-2" v-if="character.Terms.length > 0">Terms</h3>
					<div v-for="(term, index) in character.Terms" :key="index" class="mb-4 p-4 border border-gray-200 rounded">
						<p>
							<span class="font-semibold">Term {{ term.Number }}:</span>
						</p>
						<p class="ml-4"><span class="font-semibold">Age:</span> {{ term.Age }}</p>
						<p v-if="term.Career" class="ml-4"><span class="font-semibold">Career:</span> {{ term.Career }}</p>
						<p v-if="term.Qualified !== undefined" class="ml-4">
							<span class="font-semibold">Qualified:</span> {{ term.Qualified ? "Yes" : "No" }}
						</p>
						<p v-if="term.Assignment" class="ml-4">
							<span class="font-semibold">Assignment:</span> {{ term.Assignment }}
						</p>
						<p v-if="term.SelectedTrainingTable !== undefined" class="ml-4">
							<span class="font-semibold">Selected Training Table:</span> {{ term.SelectedTrainingTable }}
						</p>
						<p v-if="term.Survived !== undefined" class="ml-4">
							<span class="font-semibold">Survived:</span> {{ term.Survived ? "Yes" : "No" }}
						</p>
						<p v-if="term.Advanced !== undefined" class="ml-4">
							<span class="font-semibold">Advanced:</span> {{ term.Advanced ? "Yes" : "No" }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Race } from "#imports";

const characterStore = useCharacterStore();
const character = computed(() => characterStore.character);
const characterInput = computed(() => characterStore.characterInput);
const currentStageId = computed(() => character.value.currentStageId);

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
	}
});
</script>
