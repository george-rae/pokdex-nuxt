// Generation list types
type Generation = {
  label: string;
  slug: number | string;
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

// State Type
export type PokeState = {
  ID: number;
  pokemons: PokemonList[];
  currentLength: number;
  currentMax: number;
  cardDetails: {
    types: list;
    sprite: string;
  };
};

// API Return value types
export type Pokedex = {
  id: number;
  name: string;
  is_main_series: boolean;
  description: PokemonGeneric[];
  names: PokemonGeneric[];
  pokemon_entries: PokemonList[];
  region: NameURL;
  version_groups: NameURL[];
};

export type PokemonList = {
  entry_number: number;
  pokemon_species: PokemonGeneric;
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

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weigth: number;
  abilities: PokemonGeneric[];
  forms: PokemonGeneric[];
  game_indicies: PokemonGeneric[];
  held_items: DualLayerGeneric[];
  location_area_encounters: string;
  moves: DualLayerGeneric[];
  species: URLName;
  sprites: Sprites;
  stats: PokemonGeneric[];
  types: Types[];
  past_types: PastTypes[];
};
