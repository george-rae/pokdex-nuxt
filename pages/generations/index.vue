<script setup lang="ts">
	definePageMeta({
		middleware: ["generations"],
	});

	const pokedex = usePokedexStore();
	const pokemons = pokedex.getPokemon;
</script>

<template>
	<main class="pokedex">
		<Card v-for="pokemon in pokemons" :pokemon="pokemon" />
	</main>
</template>
