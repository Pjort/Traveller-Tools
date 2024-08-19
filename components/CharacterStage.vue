<template>
	<div>
		<h1 class="p-2">Basic Information</h1>
		<div class="space-y-4">
			<div class="flex items-center">
				<label for="name" class="w-24">Name:</label>
				<input id="name" class="bg-slate-200 px-2 py-1 rounded" type="text" v-model="name" placeholder="Name" />
			</div>
			<div class="flex items-center">
				<label for="homeWorld" class="w-24">Home World:</label>
				<input id="homeWorld" class="bg-slate-200 px-2 py-1 rounded" type="text" v-model="homeWorld" placeholder="Home World" />
			</div>
			<div class="flex items-center">
				<label for="race" class="w-24">Race:</label>
				<select id="race" v-model="race" class="bg-slate-200 px-2 py-1 rounded">
					<option value="0">Human</option>
					<option value="1">Aslan</option>
					<option value="2">Vargr</option>
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
	get: () => characterStore.characterInput.Race,
	set: (value) => characterStore.updateRace(value),
});

const ApplyInput = () => {
	if (!name.value) return;
	characterStore.parseCharacter();
};
</script>
