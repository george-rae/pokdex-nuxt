import type {
	Details,
	FilteredMoves,
	Moves,
	MoveVersionGroup,
	Ability,
	LangVerGeneric,
	PokemonGeneric,
} from "~/types/pokemon";
import { fetchData } from "@/utils/helpers";

export const useDetailsStore = defineStore("details", {
	state: (): Details => ({
		evolution_chain: "",
		description: "",
		genus: "",
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
				const { flavor_text_entries, genera, varieties, evolution_chain } =
					value;

				return {
					name: varieties[0].pokemon.name,
					description: getEnFlavourText(flavor_text_entries, "flavor_text"),
					species: getEnFlavourText(genera, "genus"),
					evolution_chain: evolution_chain.url,
				};
			});

			this.description = species.description;
			this.genus = species.species;

			this.evolution_chain = await fetchDirect(species.evolution_chain);

			const APIName: string = species.name;
			const PokeDexID = pokedexStore.ID;
			const genName = getGenNameFromID(PokeDexID as number);

			await fetchData("pokemon", APIName)
				.then(async (details) => {
					let abilitiesList: PokemonGeneric[] = [];

					await Promise.all(
						details.abilities.map(async (ability: Ability) => {
							const abilityInfo = await fetchDirect(ability.ability.url);
							const { names, effect_entries } = abilityInfo;
							const name = getEnFlavourText(names, "name");
							const effect = getEnFlavourText(effect_entries, "short_effect");

							const details = { name: name, effect: effect };

							return details;
						})
					).then((value) => {
						value.forEach((value) => abilitiesList.push(value));

						details.abilities = abilitiesList;
					});

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
