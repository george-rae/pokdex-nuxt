import { usePokedexStore } from "~/stores/pokedex";

export default defineNuxtRouteMiddleware((to) => {
	const { id } = to.params;
	const genId = Number(id);

	const pokedex = usePokedexStore();
	pokedex.changeGen(genId);

	pokedex.fetchPokemon(genId);
});
