import type {
	Details,
	FilteredMoves,
	Moves,
	MoveVersionGroup,
} from "~/types/pokemon";
import { fetchData } from "@/utils/helpers";

export const useDetailsStore = defineStore("details", {
	state: (): Details => ({
		evolution_chain: "",
		details: {
			abilities: [],
			base_experience: 0,
			cries: {
				latest: "",
				legacy: "",
			},
			game_indices: [],
			height: 0,
			held_items: [],
			id: 0,
			is_default: false,
			location_area_encounters: "",
			moves: [],
			name: "",
			order: 0,
			past_abilities: [],
			past_types: [],
			species: "",
			sprites: {
				back_default: "",
				back_female: null,
				back_shiny: "",
				back_shiny_female: null,
				front_default: "",
				front_female: null,
				front_shiny: "",
				front_shiny_female: null,
				other: {
					dream_world: {},
					home: {},
					"official-artwork": {},
				},
				versions: {},
			},
			stats: [],
			types: [],
			weight: 0,
		},
	}),
	actions: {
		/**
		 * A further wrapping and mutation of returned fetched API data of all pokemon details.
		 *
		 * @example <caption>Destructured asynchronous call to get the pokemon types</caption>
		 * const { types } = await store.fetchDetails(props.name as string);
		 */
		async fetchDetails(name: string) {
			const pokedexStore = usePokedexStore();

			// need to get the species first as some pokemon returned from `pokedex` call
			// do not match their name in the API calls for /pokemon/{name}...
			const species = await fetchData("pokemon-species", name).then((value) => {
				return {
					name: value.varieties[0].pokemon.name,
					evolution_chain: value.evolution_chain.url,
				};
			});

			const APIName: string = species.name;
			this.evolution_chain = await fetchDirect(species.evolution_chain).then(
				(evoChain) => {
					const evolution_chain: any[] = [];
					const { chain } = evoChain;

					if (chain.evolves_to.length > 0) {
						console.log(chain.evolves_to);
						chain.evolves_to.map((evo1: any) => {
							console.log(evo1);

							evolution_chain.push({
								name: evo1.species.name,
								details: evo1.evolution_details,
							});
						});
					}

					return evolution_chain;
				}
			);

			const PokeDexID = pokedexStore.ID;
			// const PokeDexID = 1;
			const genName = getGenNameFromID(PokeDexID as number);

			await fetchData("pokemon", APIName)
				.then((details) => {
					let movesList: FilteredMoves[] = [];
					details.moves.forEach((move: Moves) => {
						// Group each move version by name
						const moveGroups = Object.groupBy(
							move.version_group_details,
							(obj: MoveVersionGroup) => obj.version_group.name
						);

						if (PokeDexID != 0) {
							const matchMoveToGen = moveGroups[genName];
							if (matchMoveToGen)
								movesList.push({ name: move.move.name, ...matchMoveToGen[0] });
						} else {
							const getFirst = Object.values(moveGroups)[0];
							if (getFirst)
								movesList.push({ name: move.move.name, ...getFirst[0] });
						}
					});

					details.moves = movesList;

					return details;
				})
				.then((value) => {
					Object.assign(this.details, value);
					loading.value = false;
				});
		},
	},
});
