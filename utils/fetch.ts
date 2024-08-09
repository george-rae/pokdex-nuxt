/**
 * An API wrapper for niceifying a fetch to the PokeAPI
 *
 * @example <caption>Example usage of fetchData, usually in a more specific function to manipulate the data, such as assignPokemon</caption>
 * const pokemon: any = await fetchData("pokedex", ID);
 * @param {string} category the category/initial url scope to search
 * @param {string | number} term the term in which to search, i.e. name of pokemon
 * @returns {string[]} `JSON` structure to filter from the API endpoint
 */
async function fetchData(
  category: string,
  term: string | number
): Promise<any> {
  const data: any = await fetch(
    `https://pokeapi.co/api/v2/${category}/${term}`
  ).then((response) => response.json());
  return data;
}

export default fetchData;
