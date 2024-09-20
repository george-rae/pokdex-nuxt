import type Details from "@/types/details";
import { fetchData } from "@/utils/helpers";

export const useDetailsStore = defineStore("details", {
	state: (): Details => ({
		name: "",
		id: 0,
		evolution_chain: "",
		details: [],
	}),
	getters: {
		getCurrentName: (state) => state.name,
		getDetails: (state) => state.details,
	},
	actions: {
		/**
		 * A further wrapping and mutation of returned fetched API data for assinging a specific pokemon to the state.
		 *
		 * @example <caption>Usage usually occurs after a pokemon has been chosen with another call, so is normally either `callback` or later on</caption>
		 * details.assignPokemon(name);
		 */
		async assignPokemon(name: string): Promise<void> {
			// need to get the species first as some pokemon returned from `pokedex` call
			// do not match their name in the API calls for /pokemon/{name}...
			const species: any = await fetchData("pokemon-species", name);
			const APIName: string = species.varieties[0].pokemon.name;
			this.name = APIName;
			this.evolution_chain = species.evolution_chain.url;
		},
		/**
		 * A further wrapping and mutation of returned fetched API data of all pokemon details.
		 *
		 * @example <caption>Destructured asynchronous call to get the pokemon types</caption>
		 * const { types } = await store.fetchDetails(props.name as string);
		 */
		async fetchDetails(pokemonName: string) {
			const details: any = await fetchData("pokemon", pokemonName);
			const target = { name: details.name, id: details.id, details };
			Object.assign(this, target);

			return details;
		},
	},
});
