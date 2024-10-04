import type {
	LangVerGeneric,
	PokemonGeneric,
	Pokemon,
	Moves,
} from "~/types/pokemon";
import { useItem } from "~/config/constants";

export function getEnFlavourText(
	arr: any[],
	returnVal: string = "flavor_text"
) {
	if (arr.length > 0) {
		const string = arr.filter(
			(value: LangVerGeneric) => value.language.name === "en"
		)[0][returnVal];

		return string.replace("", " ");
	} else return null;
}

export async function getFilteredAbilities(details: Pokemon) {
	let abilitiesList: PokemonGeneric[] = [];

	details.abilities.forEach(async (ability) => {
		const abilityInfo = await fetchDirect(ability.ability.url);

		const { names, effect_entries } = abilityInfo;
		const name = getEnFlavourText(names, "name");
		const effect = getEnFlavourText(effect_entries, "short_effect");

		abilitiesList.push({ name: name, effect: effect });
	});

	return abilitiesList;
}

export function getLevelUpRequirements(details: any) {
	const { evolution_details } = details;
	let req = "";

	const info = evolution_details[evolution_details.length - 1];

	switch (info.trigger.name) {
		case "level-up":
			if (info.time_of_day !== "")
				req = `Level up during the ${info.time_of_day}, with high friendship`;

			if (info.min_level) {
				req = `Level up to a minimum level of ${info.min_level}`;
			}

			if (info.known_move_type)
				req = `Level up after learning a ${info.known_move_type.name} move`;
			break;
		case "use-item":
			req = `Use ${useItem[info.item.name]}`;
	}

	return req;
}

export function getMoveLearnRequirements(method: string, level?: number) {
	switch (method) {
		case "level-up":
			return `Pokémon reaches level ${level}`;
		case "egg":
			return "Appears on a newly-hatched Pokémon, if the father had the same move";
		case "tutor":
			return "Can be taught at any time by an NPC";
		case "machine":
			return "Can be taught at any time by using a TM or HM";
		default:
			return "Method unknown";
	}
}
