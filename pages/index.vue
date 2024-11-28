<template>
	<h1 class="text-3xl font-bold mb-6 text-center">Welcome to Traveller Tools</h1>

	<h2 class="text-2xl font-semibold mb-4">Standard Tools</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
		<NuxtLink
			v-for="page in standardPages"
			:key="page.path"
			:to="page.path"
			class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
		>
			<h3 class="text-xl font-semibold mb-2">{{ page.title }}</h3>
			<p class="text-gray-600">{{ page.description }}</p>
		</NuxtLink>
	</div>

	<h2 class="text-2xl font-semibold mt-28 mb-4">AI-Powered Tools</h2>
	<p class="text-gray-600 mb-4">These tools require an OpenAI API key to function or creates a prompt for use in ChatGPT etc.</p>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<NuxtLink
			v-for="page in AIPages"
			:key="page.path"
			:to="page.path"
			class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
		>
			<h3 class="text-xl font-semibold mb-2">{{ page.title }}</h3>
			<p class="text-gray-600">{{ page.description }}</p>
		</NuxtLink>
	</div>
</template>

<script setup lang="ts">
const standardPages = [
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
		title: "Trading Tool",
		path: "/trading-tool",
		description: "Based on UWP codes find the possible passengers, cargo, and trade goods available.",
	},
];

const AIPages = [
	{
		title: "Bounty Generator",
		path: "/bounty-generator",
		description: "Generate random bounty contracts for your Traveller adventures using AI.",
	},
	{
		title: "Mock Shot Generator",
		path: "/mock-shot-generator",
		description: "Generate mock shots for your Traveller adventures using AI.",
	},
];
</script>
