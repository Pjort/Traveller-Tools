<template>
	<div>
		<h1 class="p-2">Basic information</h1>
		<div class="p-2">Name: <input class="bg-slate-200" type="text" v-model="name" placeholder="Name" /></div>
		<div class="p-2">
			Home world:
			<input class="bg-slate-200" type="text" v-model="homeWorld" placeholder="Home World" />
		</div>
		<div class="p-2">
			Race:
			<select name="race" v-model="race">
				<option value="0">Human</option>
				<option value="1">Aslan</option>
				<option value="2">Vargr</option>
			</select>
		</div>
		<button class="p-2 bg-slate-400" @click="ApplyInput">Apply</button>
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
	characterStore.parseCharacter();
};
</script>
