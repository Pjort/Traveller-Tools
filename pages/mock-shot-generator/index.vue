<template>
	<div>
		<h2 class="text-xl font-semibold mb-4">Generate Mock Shot</h2>
		<ApiKeyInput />
		<div class="mb-4 mt-8">
			<label for="prompt" class="block text-sm font-medium text-gray-700">Shot Description</label>
			<textarea
				v-model="prompt"
				id="prompt"
				rows="4"
				class="mt-1 p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
				placeholder="Describe the person you want to generate a mock shot of..."
			></textarea>
		</div>
		<div class="flex gap-2">
			<button
				@click="generateImage"
				class="px-4 py-2 rounded mb-4 mr-2 transition-colors duration-200"
				:class="{
					'bg-blue-500 text-white hover:bg-blue-600': apiKeyStore.apiKey && !isLoading,
					'bg-gray-300 text-gray-500 cursor-not-allowed': !apiKeyStore.apiKey || isLoading,
				}"
				:disabled="!apiKeyStore.apiKey || isLoading"
			>
				{{ isLoading ? "Generating..." : "Generate Image" }}
			</button>

			<button
				@click="copyPromptToClipboard"
				class="px-4 py-2 rounded mb-4 ml-2 transition-colors duration-200 bg-green-500 text-white hover:bg-green-600 flex items-center"
			>
				<svg class="mr-2 fill-white" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24">
					<path
						d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 12H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1zm0-3H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z"
					/>
				</svg>
				Copy Prompt
				<p v-if="promptCopied" class="text-green-500 bg-black rounded-md p-2 mt-16 absolute">Copied!</p>
			</button>
		</div>
		<div v-if="imageUrl" class="mt-4">
			<img :src="imageUrl" alt="Generated Mock Shot" class="max-w-full h-auto rounded-lg shadow-lg" />
		</div>
		<div v-if="error" class="mt-4 text-red-500">
			{{ error }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useApiKeyStore } from "#imports";

const apiKeyStore = useApiKeyStore();
const prompt = ref("");
const imageUrl = ref("");
const isLoading = ref(false);
const error = ref("");

const promptCopied = ref(false);

function getPromptText() {
	return `Generate an image for a bounty hunter mark in the Traveller RPG universe:
  - Face only, with a blank or intense stare
  - Conveys seriousness and determination
  - Cold, unyielding eyes reflecting a hardened demeanor
  - Dark yet cartoonish style

  Additional details: ${prompt.value}`;
}

function copyPromptToClipboard() {
	navigator.clipboard.writeText(getPromptText()).then(() => {
		promptCopied.value = true;
		setTimeout(() => {
			promptCopied.value = false;
		}, 1000);
	});
}

async function generateImage() {
	if (!apiKeyStore.apiKey) {
		error.value = "Please enter an API key first.";
		return;
	}

	isLoading.value = true;
	error.value = "";

	try {
		const response = await fetch("https://api.openai.com/v1/images/generations", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKeyStore.apiKey}`,
			},
			body: JSON.stringify({
				model: "dall-e-3",
				prompt: getPromptText(),
				n: 1,
				quality: "standard",
				size: "1024x1024",
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to generate image");
		}

		const data = await response.json();
		imageUrl.value = data.data[0].url;
	} catch (e) {
		error.value = "An error occurred while generating the image.";
	} finally {
		isLoading.value = false;
	}
}
</script>
