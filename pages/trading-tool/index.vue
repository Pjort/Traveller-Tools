<template>
	<div class="container mx-auto">
		<h1 class="text-2xl font-bold mb-4">Trading tool</h1>

		<LocationSection title="From" v-model:uwpCode="fromUwpCode" v-model:worldName="fromWorldName" @findUWP="findFromUWP" />

		<LocationSection title="To" v-model:uwpCode="toUwpCode" v-model:worldName="toWorldName" @findUWP="findToUWP" />

		<div class="mb-4 max-w-md">
			<label class="block text-sm font-medium text-gray-700">Steward Level</label>
			<input
				type="number"
				v-model="stewardLevel"
				min="0"
				max="16"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2 bg-white"
				placeholder="Enter level"
			/>
		</div>

		<div class="mb-4 max-w-md">
			<label class="block text-sm font-medium text-gray-700">Broker, Carouse or Streetwise Level + DM</label>
			<input
				type="number"
				v-model="brokerLevel"
				min="0"
				max="16"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2 bg-white"
				placeholder="Enter parsecs"
			/>
		</div>

		<div class="mb-4 max-w-md">
			<label class="block text-sm font-medium text-gray-700">Number of Parsecs</label>
			<input
				type="number"
				v-model="parsecs"
				min="1"
				max="6"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-2 bg-white"
				placeholder="Enter parsecs"
			/>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			<div class="mb-4">
				<label class="block text-sm font-medium text-gray-700">High Passage</label>
				<LightDiceInput v-model="highPassageRoll" :numDice="2" />
			</div>

			<div class="mb-4">
				<label class="block text-sm font-medium text-gray-700">Middle Passage</label>
				<LightDiceInput v-model="middlePassageRoll" :numDice="2" />
			</div>

			<div class="mb-4">
				<label class="block text-sm font-medium text-gray-700">Basic Passage</label>
				<LightDiceInput v-model="basicPassageRoll" :numDice="2" />
			</div>

			<div class="mb-4">
				<label class="block text-sm font-medium text-gray-700">Low Passage</label>
				<LightDiceInput v-model="lowPassageRoll" :numDice="2" />
			</div>
		</div>
		<div class="mt-8">
			<h2 class="text-xl font-semibold mb-4">Passenger Traffic Results</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<div class="bg-white p-4 rounded-lg shadow">
					<h3 class="text-lg font-medium text-gray-800 mb-2">High Passage</h3>
					<div class="text-2xl font-bold text-blue-600">{{ highPassengerTrafix }}D</div>
				</div>

				<div class="bg-white p-4 rounded-lg shadow">
					<h3 class="text-lg font-medium text-gray-800 mb-2">Middle Passage</h3>
					<div class="text-2xl font-bold text-green-600">{{ middlePassengerTrafix }}D</div>
				</div>

				<div class="bg-white p-4 rounded-lg shadow">
					<h3 class="text-lg font-medium text-gray-800 mb-2">Basic Passage</h3>
					<div class="text-2xl font-bold text-yellow-600">{{ basicPassengerTrafix }}D</div>
				</div>

				<div class="bg-white p-4 rounded-lg shadow">
					<h3 class="text-lg font-medium text-gray-800 mb-2">Low Passage</h3>
					<div class="text-2xl font-bold text-red-600">{{ lowPassengerTrafix }}D</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { MapUtilities, TradingUtilities } from "#imports";

const fromUwpCode = ref("");
const fromWorldName = ref("");
const toUwpCode = ref("");
const toWorldName = ref("");
const stewardLevel = ref(0);
const brokerLevel = ref(0);
const parsecs = ref(1); // Added parsecs with default value of 1

const highPassageRoll = ref(0);
const middlePassageRoll = ref(0);
const basicPassageRoll = ref(0);
const lowPassageRoll = ref(0);

const highPassengerTrafix = computed(() => {
	return TradingUtilities.SeekingPassengers(
		highPassageRoll.value,
		stewardLevel.value,
		brokerLevel.value,
		parsecs.value,
		fromUwpCode.value,
		true,
		false,
	);
});

const middlePassengerTrafix = computed(() => {
	return TradingUtilities.SeekingPassengers(
		middlePassageRoll.value,
		stewardLevel.value,
		brokerLevel.value,
		parsecs.value,
		fromUwpCode.value,
		false,
		false,
	);
});

const basicPassengerTrafix = computed(() => {
	return TradingUtilities.SeekingPassengers(
		basicPassageRoll.value,
		stewardLevel.value,
		brokerLevel.value,
		parsecs.value,
		fromUwpCode.value,
		false,
		false,
	);
});

const lowPassengerTrafix = computed(() => {
	return TradingUtilities.SeekingPassengers(
		lowPassageRoll.value,
		stewardLevel.value,
		brokerLevel.value,
		parsecs.value,
		fromUwpCode.value,
		false,
		true,
	);
});

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
