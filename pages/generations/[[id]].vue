<script setup lang="ts">
	definePageMeta({
		middleware: ["generations"],
	});

	const pokedex = usePokedexStore();
	const pokemons = pokedex.getPokemon;
</script>

<template>
	<main class="pokedex">
		<header class="pokedex__header">
			<h1 @click="goTo('index')" class="pokedex__title">PokeDex</h1>
		</header>
		<section class="pokedex__cards">
			<Card v-for="pokemon in pokemons" :pokemon="pokemon" />
		</section>
	</main>
</template>

<style lang="scss" scoped>
	.pokedex {
		@include flex-y;
		height: 100vh;
		overflow: hidden;

		&__header {
			height: max-content;
			padding: 24px;

			font-size: 45px;
			font-weight: 700;
			color: var(--theme-colour);

			cursor: pointer;
			transition: all 0.3s ease-in-out;
		}

		&__cards {
			overflow: auto;
		}
	}
</style>
