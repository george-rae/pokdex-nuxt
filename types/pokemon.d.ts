// Generation list types
type GenerationsList = {
	[key: number | string]: Generation;
};

type Generation = {
	label: string;
	ID: number;
};

// Generic types
type NameURL = {
	name: string;
	url: string;
};

type PokemonGeneric = {
	[key: string]: string | number | boolean | NameURL<string, number>;
};

type DualLayerGeneric = {
	[key: string]: NameURL<string, number> | PokemonGeneric[];
};

// Specific types
type Types = {
	slot: string;
	type: NameURL;
};

type PastTypes = {
	generation: URLName;
	types: Types[];
};

type SpriteGeneric = {
	[key: string]: string | null;
};

type SpritesOther = {
	dream_world: SpriteGeneric;
	home: SpriteGeneric;
	"official-artwork": SpriteGeneric;
};

type SpritesVersions = {
	[key: string]: SpritesGeneric;
};

type SpritesVersion = {
	[key: string]: SpritesVersions;
};

type Sprites = {
	back_default: string;
	back_female: string | null;
	back_shiny: string;
	back_shiny_female: string | null;
	front_default: string;
	front_female: string | null;
	front_shiny: string;
	front_shiny_female: string | null;
	other: SpritesOther;
	versions: SpritesVersion;
};

interface Moves {
	name?: string;
	move: DualLayerGeneric;
	version_group_details: MoveVersionGroup[];
}

interface MoveVersionGroup {
	level_learned_at: number;
	move_learn_method: DualLayerGeneric;
	version_group: DualLayerGeneric;
}

export interface FilteredMoves extends MoveVersionGroup {
	name: string;
}

// State Type
export type PokeState = {
	ID: number | string;
	pokemons: PokemonList[];
	currentLength: number;
	currentMax: number;
};

// API Return value types
export type Pokedex = Ref<{
	id: number;
	name: string;
	is_main_series: boolean;
	description: PokemonGeneric[];
	names: PokemonGeneric[];
	pokemon_entries: PokemonList[];
	region: NameURL;
	version_groups: NameURL[];
}>;

export type PokemonList = {
	entry_number: number;
	pokemon_species: PokemonGeneric;
	details: MinorDetails;
};

export type Species = {
	id: number;
	name: string;
	order: number;
	gender_rate: number;
	capture_rate: number;
	base_happiness: number;
	is_baby: boolean;
	is_legendary: boolean;
	is_mythical: boolean;
	hatch_counter: number;
	forms_switchable: boolean;
	growth_rate: NameURL;
	pokedex_numbers: PokemonGeneric[];
	egg_groups: NameURL[];
	color: NameURL;
	shape: NameURL;
	evolves_from_species: NameURL;
	evolution_chain: { url: string };
	habitat: NameURL | null;
	generation: NameURL;
	names: PokemonGeneric[];
	flavour_text_entries: PokemonGeneric[];
	form_descriptions: PokemonGeneric[];
	genera: PokemonGeneric[];
	varieties: PokemonGeneric[];
};

export type MinorDetails = {
	id: number;
	sprite: string?;
	types: Types[];
	is_legendary: boolean;
};

export type Cries = {
	latest: string;
	legacy: string;
};

export interface Pokemon {
	abilities: PokemonGeneric[];
	base_experience: number;
	cries: Cries;
	game_indices: PokmeonGeneric[];
	height: number;
	held_items: DualLayerGeneric[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: FilteredMoves[];
	name: string;
	order: number;
	past_abilities: PokemonGeneric[];
	past_types: PastTypes[];
	species: URLName;
	sprites: Sprites;
	stats: PokemonGeneric[];
	types: Types[];
	weight: number;
}

export interface Details {
	evolution_chain: any;
	details: Pokemon;
}
