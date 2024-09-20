import { usePokedexStore } from "~/stores/pokedex";

export default defineNuxtRouteMiddleware(async (to) => {
	const { id } = to.params;

	const pokedex = usePokedexStore();
	pokedex.changeGen(id as string);

	await pokedex.fetchPokemon(id as string);
});
