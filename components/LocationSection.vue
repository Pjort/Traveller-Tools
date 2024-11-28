<template>
	<div class="mb-6">
		<h2 class="text-xl font-semibold mb-3">{{ title }}</h2>
		<div class="flex flex-wrap gap-4 mb-4 p-4 sm:p-0 bg-gray-50 sm:bg-transparent border border-gray-200 sm:border-0 rounded-lg sm:rounded-none">
			<div class="flex-1 min-w-[250px]">
				<label for="uwpCode" class="block text-sm font-medium text-gray-700">UWP Code</label>
				<input
					:value="uwpCode"
					@input="$emit('update:uwpCode', ($event.target as HTMLInputElement).value)"
					type="text"
					:id="uwpCode"
					placeholder="Enter UWP code (e.g., A867953-C)"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2 bg-white"
				/>
			</div>

			<div class="flex-1 min-w-[250px]">
				<label for="worldName" class="block text-sm font-medium text-gray-700">World Name (for search)</label>
				<input
					:value="worldName"
					@input="$emit('update:worldName', ($event.target as HTMLInputElement).value)"
					type="text"
					:id="worldName"
					placeholder="Search for world name"
					class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2 bg-white"
				/>
			</div>

			<div class="flex items-end">
				<button @click="$emit('findUWP')" class="px-4 py-2 rounded transition-colors duration-200 bg-blue-500 text-white hover:bg-blue-600">
					Find UWP
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	title: string;
	uwpCode: string;
	worldName: string;
}>();

defineEmits<{
	"update:uwpCode": [value: string];
	"update:worldName": [value: string];
	findUWP: [];
}>();
</script>
