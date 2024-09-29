<script setup lang="ts">
	import type { Pokemon, Details } from "~/types/pokemon";

	definePageMeta({
		middleware: ["pokemon"],
	});

	const store = useDetailsStore();
	const pokemon: Details = store;
	const details: Pokemon = store.details;

	function toggleCry() {
		const cry = new Audio(details.cries.latest);
		cry.volume = 0.25;
		cry.play();
	}
</script>

<template>
	<main class="pokemon">
		<h1 class="pokemon__name">{{ details.name }}</h1>
		<button type="button" @click="$router.back()">Back</button>

		<p>{{ pokemon.evolution_chain }}</p>
		<section class="pokemon__types">
			<p
				class="pokemon__type"
				v-for="type in details.types"
				:key="type.type.name"
				:class="`pokemon__type--${type.type.name}`">
				{{ type.type.name }}
			</p>
		</section>
		<p class="pokemon__stats" v-for="{ base_stat, stat } in details.stats">
			{{ stat.name }}: {{ base_stat }}
		</p>
		<p class="pokemon__moves" v-for="move in details.moves">
			{{ move }}
		</p>
		<p class="pokemon__cry" @click="toggleCry()">CRY</p>
	</main>
</template>
