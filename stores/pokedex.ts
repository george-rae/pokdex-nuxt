import { defineStore } from "pinia";
import type { PokeState, PokemonList, MinorDetails } from "@/types/pokemon";
import { loading } from "@/composables/loading";
import generations from "~/config/generations";

export const usePokedexStore = defineStore("pokedex", {
	state: (): PokeState => ({
		ID: 1,
		pokemons: [],
		currentLength: 0,
		currentMax: 151,
	}),
	getters: {
		getPokedexID: (state) => state.ID,
		getPokedexLabel: (state) => generations[state.ID].label,
		getPokemon: (state) => state.pokemons,
	},
	actions: {
		/**
		 * Used to completely reset the pokedex state then change the generation to what was chosen.
		 *
		 * @example <caption>resets state and changes gen.</caption>
		 * pokedex.changeGen(ID as number);
		 */
		changeGen(gen: number | string): void {
			this.$reset();
			this.ID = gen;
		},
		/**
		 * A further wrapping and mutation of returned fetched API data list of all pokemon in the chosen gen.
		 * Loads all in the first load, then removes the state variable for loading once the promise resolves.
		 * The `getPokemon` getter can then be used to return the pinia variable this method applies to.
		 *
		 * @example <caption>Asynchronous fetching Pokemon</caption>
		 * await pokedex.fetchPokemon(pokedex.ID);
		 */
		async fetchPokemon(key: number | string = 1): Promise<void> {
			const ID = generations[key].ID;

			const pokemon = await fetchData("pokedex", ID).then(
				(value) => value.pokemon_entries
			);

			await Promise.all(
				pokemon.map(async (entry: PokemonList) => {
					// need to get the species first as some pokemon returned from `pokedex` call
					// do not match their name in the API calls for /pokemon/{name}...
					const species: { name: string; is_legendary: boolean } =
						await fetchData("pokemon-species", entry.pokemon_species.name).then(
							(value) => {
								return {
									name: value.varieties[0].pokemon.name,
									is_legendary: value.is_legendary,
								};
							}
						);

					const details: MinorDetails = await fetchData(
						"pokemon",
						species.name
					).then((detail) => {
						return {
							types: [...detail.types],
							id: detail.id,
							sprite: detail.sprites.other["official-artwork"].front_default,
							is_legendary: species.is_legendary,
						};
					});

					return { ...entry, details: details };
				})
			)
				.then((value) => (this.pokemons = value))
				.finally(() => (loading.value = false));
		},
	},
});
