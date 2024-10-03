/**
 * An API wrapper for niceifying a fetch to the PokeAPI
 *
 * @example <caption>Usually in a more specific function to manipulate the data, such as assignPokemon</caption>
 * const pokemon: any = await fetchData("pokedex", ID);
 */
export async function fetchData(
	category: string,
	term: string | number
): Promise<any> {
	const query = await $fetch(`https://pokeapi.co/api/v2/${category}/${term}`);
	return query;
}

/**
 * Lazy function wrapper for fetching a URL returned from previous fetch.
 *
 * THIS HOPEFULLY WILL BE REWORKED :COPIUM:
 */
export async function fetchDirect(url: string): Promise<any> {
	const query = await $fetch(url);
	return query;
}

/**
 * Splits letters into an iterable array.
 *
 * @example <caption>Example usage of generateLetters</caption>
 * generateLetters("Loading...");
 * // returns `["L", "o", "a", "d", "i", "n", "g", ".", ".", "."]`
 *
 */
export function generateLetters(letters: string) {
	return [...letters.split("")];
}

/**
 * Helper function which wrappers a router.push to helps remove erroneous issues.
 *
 * @example <caption>Typical function call for going to a specific pokedex entry</caption>
 * <Card v-for="(pokemon, index) in pokemons" v-on:click="goTo('pokemon-name', { name: pokemon.pokemon_species.name })" />
 */
export function goTo(
	route: string,
	params?: { [key: string]: number | string },
	resetId?: boolean
) {
	const router = useRouter();
	const { currentRoute } = router;
	const isCurrentRoute =
		currentRoute.value.name === route &&
		currentRoute.value.params.id === params?.id;

	if (isCurrentRoute) return;

	loading.value = true;
	if (resetId) usePokedexStore().$reset;
	router.push({ name: route, params: params });
}

export function goBack() {
	const router = useRouter();

	loading.value = true;
	router.back();
}

/**
 * Get what the internal API string name for the gen is based of ID value.
 * @example <caption>Getting the string name for Gen 2</caption>
 * const genName: string = getGenName(2);
 * // returns "gold-silver"
 */
export function getGenNameFromID(ID: number): string {
	const gens: { [key: number]: string } = {
		1: "red-blue",
		2: "gold-silver",
		3: "ruby-sapphire",
		4: "diamond-pearl",
		5: "black-white",
		6: "x-y",
		7: "sun-moon",
		8: "sword-shield",
		9: "scarlet-violet",
	};

	return gens[ID];
}
