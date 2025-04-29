import { useDetailsStore } from "~/stores/details";

export default defineNuxtRouteMiddleware(async (to) => {
	const { name } = to.params;

	const details = useDetailsStore();
	const pokedex = usePokedexStore();

	const pokedexId = pokedex.getPokedexID;

	if (pokedexId === 0) {
		pokedex.changeGen("national");
		await pokedex.fetchPokemon("national");
	}

	await details
		.fetchDetails(name as string)
		.then(() => (loading.value = false));
});
