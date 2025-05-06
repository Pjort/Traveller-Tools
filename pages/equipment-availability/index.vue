<template>
    <div class="container mx-auto mb-16 px-4">
        <h1 class="text-2xl md:text-3xl font-bold mb-4">Equipment Availability Calculator</h1>

        <p class="text-gray-600 mb-6 text-base">
            When a Traveller needs to check for the Availability of an item, this requires an Average (8+)
            Broker or Streetwise check with the modifiers below. For black market purchases, only Streetwise may be
            used.
        </p>

        <div class="max-w-4xl space-y-6">
            <!-- Standard Availability Factors -->
            <fieldset class="border border-gray-300 rounded-lg p-4 bg-white shadow">
                <legend class="font-semibold px-2 text-lg">Item &amp; Tech Details</legend>
                <div class="space-y-4">
                    <label class="flex items-center min-h-[2.5rem]">
                        <input type="checkbox" v-model="specialised" class="mr-2" />
                        <span>Item is highly specialised (−1)</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" v-model="military" class="mr-2" />
                        <span>Item reserved for military use (−2)</span>
                    </label>

                    <label class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
                        <span class="text-base md:w-72 whitespace-nowrap">Tech Level difference (item − world):</span>
                        <select v-model="tlDiff"
                            class="md:ml-2 w-full md:w-64 border rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-3">
                            <option value="0">0 or less (0)</option>
                            <option value="-1">1 above (−1)</option>
                            <option value="-2">3–4 above (−2)</option>
                            <option value="-4">5–9 above (−4)</option>
                            <option value="-6">10+ above (−6)</option>
                        </select>
                    </label>
                </div>
            </fieldset>

            <!-- Cost Adjustment -->
            <fieldset class="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <legend class="font-semibold px-2 text-lg">Cost Adjustment</legend>
                <div class="space-y-4">
                    <label class="flex items-center">
                        <input type="radio" v-model="costAdjustment" value="0" class="mr-2" checked />
                        <span>Listed price (0)</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" v-model="costAdjustment" value="1" class="mr-2" />
                        <span>Double price (+1)</span>
                    </label>
                    <label class="flex items-center">
                        <input type="radio" v-model="costAdjustment" value="2" class="mr-2" />
                        <span>Triple price (+2)</span>
                    </label>
                </div>
            </fieldset>

            <!-- World Factors -->
            <fieldset class="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <legend class="font-semibold px-2 text-lg">World Factors</legend>
                <div class="space-y-4">
                    <label class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
                        <span class="text-base md:w-72 whitespace-nowrap">Starport class:</span>
                        <select v-model="starport"
                            class="md:ml-2 w-full md:w-64 border rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-3">
                            <option value="0">Other (0)</option>
                            <option value="1">A or B (+1)</option>
                            <option value="-4">X (−4)</option>
                        </select>
                    </label>

                    <label class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
                        <span class="text-base md:w-72 whitespace-nowrap">Trade codes present (pick best):</span>
                        <select v-model="trade"
                            class="md:ml-2 w-full md:w-64 border rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-3">
                            <option value="0">None/neutral (0)</option>
                            <option value="2">Hi, Ht, In, Ri (+2)</option>
                            <option value="-2">Lt, Na, Ni, Po (−2)</option>
                        </select>
                    </label>

                    <label class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
                        <span class="text-base md:w-72 whitespace-nowrap">Population band:</span>
                        <select v-model="population"
                            class="md:ml-2 w-full md:w-64 border rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-3">
                            <option value="0">6–8 or 0 (0)</option>
                            <option value="-2">1–2 (−2)</option>
                            <option value="-1">3–5 (−1)</option>
                            <option value="1">9 (+1)</option>
                            <option value="2">10+ (+2)</option>
                        </select>
                    </label>

                    <label class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
                        <span class="text-base md:w-72 whitespace-nowrap">Referee fiat:</span>
                        <input type="number" v-model="refereeFiat"
                            class="md:ml-2 border rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-3 w-full md:w-64"
                            min="-3" max="3" step="1" />
                        <span class="ml-2 text-gray-600">(−3 to +3)</span>
                    </label>
                </div>
            </fieldset>

            <!-- Black Market -->
            <fieldset class="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <legend class="font-semibold px-2 text-lg">
                    <label class="flex items-center">
                        <input type="checkbox" v-model="useBlackMarket" class="mr-2" />
                        <span>Use Black Market rules</span>
                    </label>
                </legend>

                <div v-if="useBlackMarket" class="space-y-4 mt-4">
                    <label class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
                        <span class="text-base md:w-72 whitespace-nowrap">Law Level:</span>
                        <select v-model="lawLevel"
                            class="md:ml-2 w-full md:w-64 border rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-3">
                            <option value="2">0 (+2)</option>
                            <option value="1">1–3 (+1)</option>
                            <option value="0">4–6 (0)</option>
                            <option value="-1">7–9 (−1)</option>
                            <option value="-2">10+ (−2)</option>
                        </select>
                    </label>

                    <label class="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
                        <span class="text-base md:w-72 whitespace-nowrap">Item category:</span>
                        <select v-model="itemCategory"
                            class="md:ml-2 w-full md:w-64 border rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-3 py-3">
                            <option value="0">Category 3 - Paramilitary Use (0)</option>
                            <option value="4">Category 1 - Unrestricted (+4)</option>
                            <option value="2">Category 2 - Civilian Use (+2)</option>
                            <option value="-2">Category 4 - Military Use (−2)</option>
                            <option value="-4">Category 5 - Restricted Military (−4)</option>
                            <option value="-6">Prohibited Items (−6)</option>
                        </select>
                    </label>

                    <div class="mt-2 space-y-2">
                        <div class="text-base text-gray-600">
                            {{ categoryDescriptions[itemCategory] }}
                        </div>
                        <div class="font-semibold text-blue-600">
                            Price Multiplier: {{ blackMarketMultipliers[itemCategory] }}
                        </div>
                    </div>

                    <!-- Black Market Notes -->
                    <div class="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h3 class="font-semibold text-yellow-800 mb-2">Black Market Notes:</h3>
                        <ul class="list-disc list-inside space-y-1 text-yellow-700">
                            <li>Only Streetwise checks may be used for black market availability (never Broker)</li>
                            <li>A negative Effect of -2 or worse will result in attention from law enforcement</li>
                            <li>Prices are significantly higher than legal purchases (see multiplier above)</li>
                        </ul>
                    </div>
                </div>
            </fieldset>

            <!-- Results Section -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold mb-4">Results</h2>
                <div class="bg-white p-6 rounded-lg shadow">
                    <div class="space-y-2">
                        <div class="text-xl md:text-2xl font-bold text-blue-600 break-words">Total DM: {{ result.dm >= 0 ? '+' + result.dm : result.dm }}</div>
                        <div class="text-xl md:text-xl font-bold  text-blue-600 break-words">Required roll: {{ result.target === 13 ? 'Impossible' : result.target + '+' }} on 2D6 (≈ {{ (result.odds * 100).toFixed(1) }}% chance)</div>
                        <div class="text-xl md:text-xl font-semibold text-green-600 break-words" v-if="result.priceMultiplierText">{{ result.priceMultiplierText }}</div>
                    </div>
                    <p class="mt-4 text-base text-gray-600">
                        Note: Both +/-DMs from skill and stats should be added/substracted to the total DM. And are not included in the above
                        calculations.
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Form state
const specialised = ref(false)
const military = ref(false)
const tlDiff = ref('0')
const costAdjustment = ref('0')
const starport = ref('0')
const trade = ref('0')
const population = ref('0')
const refereeFiat = ref(0)
const useBlackMarket = ref(false)
const lawLevel = ref('0')
type CategoryKey = '4' | '2' | '0' | '-2' | '-4' | '-6'
const itemCategory = ref<CategoryKey>('0')

// Black market price multipliers
const blackMarketMultipliers: Record<CategoryKey, string> = {
    '4': 'x2',   // Category 1 (Unrestricted)
    '2': 'x3',   // Category 2 (Civilian Use)
    '0': 'x5',   // Category 3 (Paramilitary Use)
    '-2': 'x10', // Category 4 (Military Use)
    '-4': 'x20', // Category 5 (Restricted Military)
    '-6': 'x20 minimum'  // Prohibited Items
}

// Category descriptions
const categoryDescriptions: Record<CategoryKey, string> = {
    '4': 'Category 1 - Unrestricted: Melee weapons, non-lethal firearms, bows and archaic weapons',
    '2': 'Category 2 - Civilian Use: Revolvers, pistols, semi-automatic rifles, shotguns',
    '0': 'Category 3 - Paramilitary Use: Light automatic weapons, laser weapons, cloth armour, flak jackets',
    '-2': 'Category 4 - Military Use: Gauss weapons, combat rifles, support weapons, combat armour',
    '-4': 'Category 5 - Restricted Military: Plasma/fusion weapons, missiles, battle dress, combat robots',
    '-6': 'Prohibited: Nuclear weapons, antimatter systems, chemical/biological weapons'
}

// 2D6 probabilities for rolling X or higher
const rollProbs: { [key: number]: number } = {
    2: 1.000,  // automatic success
    3: 0.972,
    4: 0.917,
    5: 0.833,
    6: 0.722,
    7: 0.583,
    8: 0.417,
    9: 0.278,
    10: 0.167,
    11: 0.083,
    12: 0.028
}

const result = computed(() => {
    let dm = 0

    // Add DMs from checkboxes
    if (specialised.value) dm -= 1
    if (military.value) dm -= 2

    // Add other DMs
    dm += Number(tlDiff.value)
    dm += Number(costAdjustment.value)
    dm += Number(starport.value)
    dm += Number(trade.value)
    dm += Number(population.value)
    dm += Number(refereeFiat.value)

    // Black market extras
    if (useBlackMarket.value) {
        dm += Number(lawLevel.value)
        dm += Number(itemCategory.value)
    }

    // Required minimum roll on 2D6
    let target = 8 - dm
    if (target < 2) target = 2
    if (target > 12) target = 13 // impossible

    // Calculate probability
    let odds = target === 13 ? 0 : rollProbs[target] || 0

    // Calculate price multipliers
    const costMult = Number(costAdjustment.value) + 1
    const blackMarketMult = useBlackMarket.value ?
        Number(blackMarketMultipliers[itemCategory.value].replace('x', '').split(' ')[0]) : 1
    const totalMult = costMult * blackMarketMult

    // Create price text
    const priceMultiplierText = useBlackMarket.value ? 
        costMult === 1 ? `Price multiplier: ${blackMarketMultipliers[itemCategory.value]} (Black Market)` :
        `Price multiplier: x${costMult} × ${blackMarketMultipliers[itemCategory.value]} (Black Market) = x${totalMult}` : 
        totalMult > 1 ? `Price multiplier: x${totalMult}` : ''

    return { dm, target, odds, priceMultiplierText }
})
</script>
