<template>
	<div class="flex items-center py-2">
		<input class="px-2 py-1 rounded-l" type="number" :value="modelValue" @input="handleInput" placeholder="Roll result" min="1" :max="maxRoll" />
		<button @click="rollDice" class="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600 flex items-center">
			<span :class="{ 'animate-roll': isRolling }">🎲</span>
			<span class="ml-1">Roll {{ numDice }}D6</span>
		</button>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
	modelValue: number;
	numDice: number;
}>();

const emit = defineEmits<{
	(e: "update:modelValue", value: number): void;
}>();

const maxRoll = computed(() => props.numDice * 6);
const isRolling = ref(false);

function handleInput(event: Event) {
	const target = event.target as HTMLInputElement;
	if (target) {
		emit("update:modelValue", Number(target.value));
	}
}

function rollDice() {
	isRolling.value = true;
	setTimeout(() => {
		let result = 0;
		for (let i = 0; i < props.numDice; i++) {
			result += Math.floor(Math.random() * 6) + 1;
		}
		emit("update:modelValue", result);
		isRolling.value = false;
	}, 200);
}
</script>

<style scoped>
@keyframes roll {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}

.animate-roll {
	display: inline-block;
	animation: roll 0.2s linear;
}
</style>
