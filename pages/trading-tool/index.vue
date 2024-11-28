<template>
	<div class="container mx-auto p-4">
		<h1 class="text-2xl font-bold mb-4">Trading tool</h1>

		<LocationSection title="From" v-model:uwpCode="fromUwpCode" v-model:worldName="fromWorldName" @findUWP="findFromUWP" />

		<LocationSection title="To" v-model:uwpCode="toUwpCode" v-model:worldName="toWorldName" @findUWP="findToUWP" />
		<br /><br />
		Work in progress... 🚧
	</div>
</template>

<script setup lang="ts">
import { MapUtilities } from "#imports";
import LocationSection from "~/components/LocationSection.vue";

const fromUwpCode = ref("");
const fromWorldName = ref("");
const toUwpCode = ref("");
const toWorldName = ref("");

const findFromUWP = async () => {
	fromUwpCode.value = "Loading...";
	const world = await MapUtilities.getWorldByName(fromWorldName.value);
	if (world?.Name) {
		fromWorldName.value = world.Name;
	}
	fromUwpCode.value = world?.Uwp ?? "Not found";
};

const findToUWP = async () => {
	toUwpCode.value = "Loading...";
	const world = await MapUtilities.getWorldByName(toWorldName.value);
	if (world?.Name) {
		toWorldName.value = world.Name;
	}
	toUwpCode.value = world?.Uwp ?? "Not found";
};
</script>
