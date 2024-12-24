<script setup lang="ts">
	definePageMeta({
		middleware: ["generations"],
	});

	const pokedex = usePokedexStore();
	const ID = pokedex.getPokedexID;
	const pokedexLabel = pokedex.getPokedexLabel;
	const pokemons = pokedex.getPokemon;

	const isString = typeof ID === "string";

	provide("genPokemon", pokemons);
</script>

<template>
	<main class="pokedex">
		<Navigation>
			<h1 class="title" @click="goTo('index')">
				{{ pokedexLabel }}
				<span v-if="!isString">(Gen {{ ID }})</span>
			</h1>
		</Navigation>
		<section class="cards">
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
	.navigation {
		span {
			font-size: clamp($font--body, 0.5em, $font--medium);
		}
	}

	.pokedex {
		height: 100vh;
		width: 100%;
		overflow: hidden;

		@include flex-y;
	}

	.cards {
		display: grid;
		grid-auto-rows: 25vh;
		overflow: auto;
	}

	@media screen and (min-width: 700px) {
		.cards {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media screen and (min-width: 1024px) {
		.cards {
			grid-auto-rows: 40vh;
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media screen and (min-width: 1400px) {
		.pokedex {
			display: grid;
			grid-template-columns: 70vw 30vw;
		}

		.cards {
			grid-auto-rows: 30vh;
			order: 1;
		}

		.navigation {
			order: 2;
		}
	}

	@media screen and (min-width: 1800px) {
		.cards {
			grid-auto-rows: 40vh;
		}
	}

	@media screen and (min-width: 1920px) {
		.pokedex {
			grid-template-columns: 80vw 20vw;
		}

		.cards {
			grid-template-columns: repeat(4, 1fr);
			grid-auto-rows: 35vh;
		}
	}
</style>
