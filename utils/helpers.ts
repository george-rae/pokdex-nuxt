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

export function goTo(
	route: string,
	params?: { [key: string]: number | string }
) {
	const router = useRouter();
	const { currentRoute } = router;
	const isCurrentRoute =
		currentRoute.value.name === route &&
		currentRoute.value.params.id === params?.id;

	if (isCurrentRoute) return;

	loading.value = true;
	router.push({ name: route, params: params });
}
