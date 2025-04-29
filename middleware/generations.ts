import { usePokedexStore } from "~/stores/pokedex";

export default defineNuxtRouteMiddleware(async (to) => {
	const { id } = to.params;
	const pokedexId = id === "" ? "national" : (id as string);

	const parsedId = isNaN(parseFloat(pokedexId))
		? pokedexId
		: parseFloat(pokedexId);

	const pokedex = usePokedexStore();
	pokedex.changeGen(parsedId);

	await pokedex.fetchPokemon(parsedId).then(() => (loading.value = false));
});
