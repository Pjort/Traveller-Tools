<template>
	<h1 class="text-3xl font-bold mb-6 text-center">Welcome to Traveller Tools</h1>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<NuxtLink
			v-for="page in pages"
			:key="page.path"
			:to="page.path"
			class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
		>
			<h2 class="text-xl font-semibold mb-2">{{ page.title }}</h2>
			<p class="text-gray-600">{{ page.description }}</p>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
const pages = [
	{
		title: "Character Creator",
		path: "/character-creator",
		description: "Create and customize your character. Traveller Mongoose 2nd Edition style.",
	},
];
</script>
