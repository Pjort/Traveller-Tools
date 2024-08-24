<template>
	<div>
		<h1 class="text-2xl font-bold mb-4">Roll Characteristics</h1>

		<div>
			<div class="p-2">
				Strength:
				<DiceInput v-model="characteristics.Strength" :numDice="2" />
			</div>
			<div class="p-2">
				Dexterity:
				<DiceInput v-model="characteristics.Dexterity" :numDice="2" />
			</div>
			<div class="p-2">
				Endurance:
				<DiceInput v-model="characteristics.Endurance" :numDice="2" />
			</div>
			<div class="p-2">
				Intellect:
				<DiceInput v-model="characteristics.Intellect" :numDice="2" />
			</div>
			<div class="p-2">
				Education:
				<DiceInput v-model="characteristics.Education" :numDice="2" />
			</div>
			<div class="p-2">
				Social Standing:
				<DiceInput v-model="characteristics.SocialStanding" :numDice="2" />
			</div>
		</div>
		<button @click="ApplyInput" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characteristics = ref(new Characteristics(0, 0, 0, 0, 0, 0, 0));
const characterStore = useCharacterStore();

const updateCharacteristicsString = () => {
	characterStore.updateCharacteristicsString(characteristics.value.ToParsingString());
};

onMounted(() => {
	updateCharacteristicsString();
});

watch(
	characteristics,
	() => {
		updateCharacteristicsString();
	},
	{ deep: true }
);

const ApplyInput = () => {
	characterStore.parseCharacter();
};
</script>
