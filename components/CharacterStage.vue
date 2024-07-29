<template>
	<div>
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
	</div>
</template>

<script lang="ts" setup>
const characterInputStore = useCharacterInputStore();
const name = computed({
	get: () => characterInputStore.characterInput.Name,
	set: (value) => characterInputStore.updateName(value),
});

const homeWorld = computed({
	get: () => characterInputStore.characterInput.HomeWorld,
	set: (value) => characterInputStore.updateHomeWorld(value ?? ""),
});

const race = computed({
	get: () => characterInputStore.characterInput.Race,
	set: (value) => characterInputStore.updateRace(value),
});
</script>
