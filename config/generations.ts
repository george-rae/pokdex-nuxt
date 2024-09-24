import type { GenerationsList } from "~/types/pokemon";

const generations: GenerationsList = {
	1: {
		label: "Red/Green/Blue",
		ID: 2,
	},
	2: {
		label: "Gold/Silver",
		ID: 3,
	},
	3: {
		label: "Ruby/Sapphire",
		ID: 4,
	},
	4: {
		label: "Diamond/Pearl",
		ID: 6,
	},
	5: {
		label: "Black/White",
		ID: 9,
	},
	6: {
		label: "X/Y",
		ID: 12,
	},
	7: {
		label: "Sun/Moon",
		ID: 21,
	},
	8: {
		label: "Sword/Shield",
		ID: 27,
	},
	legends: {
		label: "Legends: Arceus",
		ID: 30,
	},
	9: {
		label: "Scarlet/Violet",
		ID: 31,
	},
	national: {
		label: "National",
		ID: 1,
	},
};

export default generations;
