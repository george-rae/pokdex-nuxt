<script setup lang="ts">
	definePageMeta({
		middleware: ["generations"],
	});

	const pokedex = usePokedexStore();
	const ID = pokedex.getPokedexID;
	const pokedexLabel = pokedex.getPokedexLabel;
	const pokemons = pokedex.getPokemon;

	const isString = typeof ID === "string";
</script>

<template>
	<main class="pokedex">
		<header class="pokedex__header">
			<h1 class="pokedex__title" @click="goTo('index')">
				{{ pokedexLabel }}
				<span v-if="!isString">(Gen {{ ID }})</span>
			</h1>
			<Menu />
		</header>
		<section class="pokedex__cards">
			<Card
				v-for="(pokemon, index) in pokemons"
				:pokemon="pokemon"
				:class="{
					active: index < 12,
				}"
				:key="index"
				@click="goTo('pokemon-name', { name: pokemon.pokemon_species.name })" />
		</section>
	</main>
</template>

<style lang="scss" scoped>
	.pokedex {
		height: 100vh;
		width: 100%;
		overflow: hidden;

		@include flex-y;

		&__header {
			height: max-content;
			padding: $header-padding;

			font-size: $font--title;
			font-weight: 700;
			text-transform: capitalize;
			color: var(--theme-colour);

			transition: all 0.3s ease-in-out;
			cursor: pointer;

			@include flex-x(space-between, center);

			span {
				font-size: clamp($font--body, 0.5em, $font--medium);
			}
		}

		&__cards {
			display: grid;
			grid-auto-rows: 25vh;
			overflow: auto;
		}

		@media screen and (min-width: 700px) {
			&__cards {
				grid-template-columns: repeat(2, 1fr);
			}
		}

		@media screen and (min-width: 1024px) {
			&__cards {
				grid-auto-rows: 40vh;
				grid-template-columns: repeat(3, 1fr);
			}
		}

		@media screen and (min-width: 1800px) {
			&__cards {
				grid-template-columns: repeat(4, 1fr);
			}
		}
	}
</style>
