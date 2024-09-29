<template>
	<div>
		<h1 class="text-2xl font-bold mb-4">Basic Information</h1>

		<div class="space-y-4">
			<div class="md:flex block items-center">
				<label for="name" class="w-28 md:mr-0 mr-3">Name:</label>
				<input id="name" class="bg-slate-200 px-2 py-1 rounded mr-2" type="text" v-model="name" placeholder="Name" />
				<button @click="GenerateName" class="bg-blue-500 text-white px-3 py-1 ml-0 md:ml-3 mt-3 md:mt-0 rounded hover:bg-blue-600">
					Generate
				</button>
			</div>
			<div class="md:flex block items-center">
				<label for="homeWorld" class="w-28">Home World:</label>
				<input id="homeWorld" class="bg-slate-200 px-2 py-1 rounded mr-2" type="text" v-model="homeWorld" placeholder="Home World" />
				<button @click="RandomHomeWorld" class="bg-blue-500 text-white px-3 py-1 ml-0 md:ml-3 mt-3 md:mt-0 rounded hover:bg-blue-600">
					Random
				</button>
			</div>
			<div class="flex items-center">
				<label for="race" class="w-28">Race:</label>
				<select id="race" v-model="race" class="bg-slate-200 px-2 py-1 rounded">
					<option value="1">Human</option>
					<option value="2">Aslan</option>
					<option value="3">Vargr</option>
				</select>
			</div>
		</div>
		<button @click="ApplyInput" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mt-4">Apply</button>
	</div>
</template>

<script lang="ts" setup>
const characterStore = useCharacterStore();
const name = computed({
	get: () => characterStore.characterInput.Name,
	set: (value) => characterStore.updateName(value),
});

const homeWorld = computed({
	get: () => characterStore.characterInput.HomeWorld,
	set: (value) => characterStore.updateHomeWorld(value ?? ""),
});

const race = computed({
	get: () => characterStore.characterInput.RaceId,
	set: (value) => characterStore.updateRace(value),
});

const ApplyInput = () => {
	if (!name.value) return;
	characterStore.parseCharacter();
};

const GenerateName = () => {
	name.value = NameGenerator.generateFullName();
};

const RandomHomeWorld = async () => {
	homeWorld.value = await MapUtilities.randomSubSectorName();
};
</script>
