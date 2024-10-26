<template>
	<div class="border rounded-md shadow-sm mb-4">
		<button @click="isExpanded = !isExpanded" class="w-full px-4 py-2 text-left flex justify-between items-center hover:bg-gray-50">
			<span class="font-medium">API Key Settings</span>
			<span class="transform transition-transform" :class="{ 'rotate-180': isExpanded }">▼</span>
		</button>
		<div v-show="isExpanded" class="px-4 py-3">
			<div>
				<label for="apiKey" class="block text-sm font-medium text-gray-700">OpenAI API Key</label>
				<p class="text-xs text-gray-500 mt-1 mb-2">
					Your API key is only stored in your browser's local cookies and is not sent or stored anywhere else. It's used client-side to make
					requests to OpenAI's API.
				</p>
				<div class="flex mt-1">
					<input
						@input="updateApiKey"
						type="password"
						id="apiKey"
						:value="apiKeyStore.apiKey"
						class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2"
						placeholder="Enter your OpenAI API key"
					/>
					<button
						@click="clearApiKey"
						class="bg-red-500 w-60 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200 ml-2"
					>
						Clear API Key
					</button>
				</div>
				<transition
					enter-active-class="transition-all duration-300 ease-out"
					leave-active-class="transition-all duration-300 ease-in"
					enter-from-class="opacity-0 max-h-0"
					enter-to-class="opacity-100 max-h-[500px]"
					leave-from-class="opacity-100 max-h-[500px]"
					leave-to-class="opacity-0 max-h-0"
				>
					<div>
						<label class="inline-flex items-center mt-2">
							<input type="checkbox" :checked="apiKeyStore.remember" @change="updateRememberMe" class="form-checkbox" />
							<span class="ml-2">Remember API Key</span>
						</label>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useApiKeyStore } from "#imports";

import { ref } from "vue";

const isExpanded = ref(false);

const apiKeyStore = useApiKeyStore();

onMounted(() => {
	apiKeyStore.loadApiKey();
});

function updateApiKey(event: Event) {
	const newApiKey = (event.target as HTMLInputElement).value;
	apiKeyStore.setApiKey(newApiKey);
}

function updateRememberMe(event: Event) {
	apiKeyStore.setRemember(!apiKeyStore.remember);
	apiKeyStore.setApiKey(apiKeyStore.apiKey);
}

function clearApiKey() {
	apiKeyStore.clearApiKey();
}
</script>
