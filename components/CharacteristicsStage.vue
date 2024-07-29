<template>
	<div>
		<h1 class="p-2">Characteristics</h1>
		<div>
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
		<button class="p-2 bg-slate-400" @click="ApplyInput">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characteristics = ref(new Characteristics());

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
