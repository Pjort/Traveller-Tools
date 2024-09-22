<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Name Generator</h1>

        <button
            @click="generateNames"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 mb-4"
        >
            Generate 10 Names
        </button>

        <div
            v-if="names.length > 0"
            class="bg-white shadow-md rounded-lg overflow-hidden"
        >
            <ul class="divide-y divide-gray-200">
                <li
                    v-for="(name, index) in names"
                    :key="index"
                    class="px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                >
                    {{ name }}
                </li>
            </ul>
        </div>

        <p v-else class="text-gray-600 italic">
            Click the button above to generate names.
        </p>
    </div>
</template>

<script setup lang="ts">
import { NameGenerator } from "#imports";

const names = ref<string[]>([]);

function generateNames() {
    // Assuming your generateNames function is imported and available
    names.value = NameGenerator.generateNames(10);
}
</script>
