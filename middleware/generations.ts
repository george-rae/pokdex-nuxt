import { usePokedexStore } from "~/stores/pokedex";

export default defineNuxtRouteMiddleware(async (to) => {
	const { id } = to.params;
	const pokedexId = id === "" ? "national" : id;

	const parsedId = isNaN(parseFloat(pokedexId as string))
		? (pokedexId as string)
		: parseFloat(pokedexId as string);

	const pokedex = usePokedexStore();
	pokedex.changeGen(parsedId);

	await pokedex.fetchPokemon(parsedId).then(() => (loading.value = false));
});
