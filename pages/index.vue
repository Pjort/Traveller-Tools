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
		description: "Create and generate your character using Traveller Mongoose 2nd Edition style.",
	},
	{
		title: "Name Generator",
		path: "/name-generator",
		description: "Generate random names for your characters.",
	},
	{
		title: "Bounty Generator",
		path: "/bounty-generator",
		description: "Generate random bounty contracts for your Traveller adventures using OpenAI. Requires your own API key.",
	},
];
</script>
