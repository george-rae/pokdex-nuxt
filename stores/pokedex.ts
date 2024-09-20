import { defineStore } from "pinia";
import type { PokeState, Species, Pokemon, PokemonList } from "@/types/pokemon";
import { fetchData } from "@/utils/helpers";
import { loading } from "@/utils/loading";

export const usePokedexStore = defineStore("pokedex", {
	state: (): PokeState => ({
		ID: 2,
		pokemons: [],
		currentLength: 0,
		currentMax: 151,
		cardDetails: {
			types: [],
			sprite: "",
		},
	}),
	getters: {
		getPokedexID: (state) => state.ID,
		getPokemon: (state) => state.pokemons,
	},
	actions: {
		/**
		 * Used to completely reset the pokedex state then change the generation to what was chosen.
		 *
		 * @example <caption>resets state and changes gen.</caption>
		 * pokedex.changeGen(ID as number);
		 */
		changeGen(gen: number): void {
			loading.value = true;
			this.$reset();
			this.ID = gen;
		},
		/**
		 * A further wrapping and mutation of returned fetched API data list of all pokemon in the chosen gen.
		 * Loads 12 at a time, as loading all 151 in the first load of the page is very intensive, so loads on the fly.
		 *
		 * @example <caption>Asynchronous fetching Pokemon (12 at a time for purpose built lazy loading)</caption>
		 * await pokedex.fetchPokemon(pokedex.ID);
		 */
		async fetchPokemon(ID: number = 2): Promise<void> {
			const pokemon = await fetchData("pokedex", ID);

			const entries: PokemonList[] = pokemon.pokemon_entries;
			entries.map(async (entry) => {
				const details = await this.fetchMinorDetails(
					entry.pokemon_species.name
				);

				entry.details = details;
			});

			console.log(entries);

			// push the spread array to the state variable so the result can be cached with a getter.
			this.pokemons.push(...pokemon.pokemon_entries);
			loading.value = false;
		},
		/**
		 * A further wrapping and mutation of returned fetched API data for some small amount of details on the preview cards (Home View).
		 *
		 * @example <caption>Asynchronous fetching Pokemons minor details, so that it can be shown on the preview card</caption>
		 * const details = await pokedex.fetchMinorDetails(props.name);
		 * const { sprite, types, ID } = details;
		 */
		async fetchMinorDetails(pokemon: string): Promise<any> {
			// need to get the species first as some pokemon returned from `pokedex` call
			// do not match their name in the API calls for /pokemon/{name}...
			const species: Species = await fetchData("pokemon-species", pokemon);
			const APIName: string = species.varieties[0].pokemon.name;

			// use the filtered API name to make the fetch()
			const details: Pokemon = await fetchData("pokemon", APIName);

			return {
				types: [...details.types],
				id: details.id,
				sprite: details.sprites.other["official-artwork"].front_default,
				is_legendary: species.is_legendary,
			};
		},
	},
});
