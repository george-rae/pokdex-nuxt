import { usePokedexStore } from "~/stores/pokedex";

export default defineNuxtRouteMiddleware(async (to) => {
	const { id } = to.params;
	const pokedexId = id === "" ? "national" : id;

	const pokedex = usePokedexStore();
	pokedex.changeGen(pokedexId as string);

	await pokedex.fetchPokemon(pokedexId as string);
});
