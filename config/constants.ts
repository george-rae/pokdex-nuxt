type StatsMap = {
	[key: string]: {
		name: string;
		class: string;
	};
};

export const stats: StatsMap = {
	hp: { name: "HP", class: "blue" },
	attack: { name: "Attack", class: "red" },
	defense: { name: "Defense", class: "green" },
	"special-attack": { name: "Special Attack", class: "red" },
	"special-defense": { name: "Special Defense", class: "green" },
	speed: { name: "Speed", class: "blue" },
};

export const useItem: { [key: string]: string } = {
	"water-stone": "Water Stone",
	"thunder-stone": "Thunder Stone",
	"fire-stone": "Fire Stone",
	"leaf-stone": "Leaf Stone",
	"ice-stone": "Ice Stone",
	"dawn-stone": "Dawn Stone",
};

export const targetMap: { [key: string]: string } = {
	"selected-pokemon": "Selected Pokemon",
	"entire-field": "Entire Field",
	"all-opponents": "All Opponents",
	user: "Self",
};
