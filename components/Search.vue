<script setup lang="ts">
	import type { PokemonList } from "~/types/pokemon";

	const pokemons: PokemonList[] | undefined = inject("genPokemon");
	const list: Ref<HTMLElement | null> = ref(null);
	const listOpen: Ref<Boolean> = ref(false);
	const currentSearch: Ref<{ search: String; length: Number }> = ref({
		search: "",
		length: 0,
	});

	function toggleList() {
		setTimeout(() => (listOpen.value = !listOpen.value), 150);
	}

	async function activateList(ev: Event) {
		const value = (<HTMLInputElement>ev.target).value.toLowerCase();

		const length = pokemons?.filter((p) =>
			p.pokemon_species.name.includes(value)
		).length;

		currentSearch.value = {
			search: value,
			length: length as number,
		};
	}
</script>

<template>
	<h3>Search for Pokemon:</h3>
	<div class="search">
		<input
			type="text"
			placeholder="e.g. Pikachu"
			ref="searchbar"
			@focus="toggleList"
			@input="(ev) => activateList(ev)"
			@blur="toggleList"
			:class="{ active: listOpen }" />
		<section class="pokemon-list" ref="list" :class="{ active: listOpen }">
			<figure
				v-for="(pokemon, index) in pokemons"
				v-show="pokemon.pokemon_species.name.includes(currentSearch.search)"
				:key="index"
				@click="goTo('pokemon-name', { name: pokemon.pokemon_species.name })">
				<img
					:src="`https://pokedex-images.lon1.cdn.digitaloceanspaces.com/pokemon/image--${pokemon.pokemon_species.name}@2x.png`" />
				<figcaption>
					{{ pokemon.pokemon_species.name }}: #{{ pokemon.details.id }}
				</figcaption>
			</figure>
			<figure v-if="currentSearch.length === 0">
				<figcaption>No Pokemon matches search, try again!</figcaption>
			</figure>
		</section>
	</div>
</template>

<style lang="scss" scoped>
	.search {
		position: relative;
	}

	input {
		width: 100%;
		padding: $spacing--s;

		color: var(--theme-colour);

		background: var(--theme-washout);
		border: 2px solid var(--theme-colour-washout);
		border-radius: 12px;

		user-select: none;
		outline: none;

		&::placeholder {
			color: var(--theme-colour-washout);
		}

		&.active {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
	}

	.pokemon-list {
		position: absolute;
		left: 0;
		right: 0;

		display: grid;
		grid-auto-rows: 125px;
		max-height: 500px;
		height: max-content;
		margin-top: -2px;

		color: var(--theme-colour);

		background: var(--theme-background);
		border: 2px solid var(--theme-colour-washout);
		border-bottom-left-radius: 12px;
		border-bottom-right-radius: 12px;
		opacity: 0;

		overflow: auto;
		z-index: 10;
		visibility: hidden;
		pointer-events: none;

		transition-property: visibility, opacity, pointer-events;
		transition-duration: 0.3s, 0.3s, 0;
		transition-delay: 0s, 0s, 0.5s;
		transition-timing-function: ease-in-out;

		figure {
			padding: $spacing--s;

			@include flex-x(space-between, center);

			img {
				max-height: 100%;
			}

			figcaption {
				font-size: $font--medium;
				font-weight: 500;
			}
		}

		&.active {
			opacity: 1;
			visibility: visible;
			pointer-events: auto;

			transition: all 0.3s ease-in;
		}
	}
</style>
