<script setup lang="ts">
	import generations from "~/config/generations";

	definePageMeta({
		middleware: ["generations"],
	});

	const menuOpen = ref(false);

	const pokedex = usePokedexStore();
	const ID = pokedex.getPokedexID;
	const pokemons = pokedex.getPokemon;
</script>

<template>
	<main class="pokedex">
		<header class="pokedex__header">
			<h1 class="pokedex__title" @click="goTo('index')">
				{{ ID !== "national" ? `Gen ${ID}` : ID }}
			</h1>
			<button
				type="button"
				class="pokedex__button"
				:class="{ active: menuOpen }"
				@click="menuOpen = !menuOpen">
				<span class="bun bun--top"></span>
				<span class="bun bun--bottom"></span>
			</button>
			<nav class="pokedex__menu" :class="{ active: menuOpen }">
				<ul class="pokedex__list">
					<li
						class="pokedex__list-item"
						v-for="(generation, key) in generations"
						@click="goTo('generations-id', { id: key })">
						{{ generation.label }}
					</li>
				</ul>
			</nav>
		</header>
		<section class="pokedex__cards">
			<Card
				v-for="(pokemon, index) in pokemons"
				:pokemon="pokemon"
				:class="{ active: index < 12 }"
				:key="index" />
		</section>
	</main>
</template>

<style lang="scss" scoped>
	.pokedex {
		@include flex-y;
		height: 100vh;
		overflow: hidden;

		&__header {
			@include flex-x(space-between, center);
			height: max-content;
			padding: $header-padding;

			font-size: $font--title;
			font-weight: 700;
			text-transform: capitalize;
			color: var(--theme-colour);

			transition: all 0.3s ease-in-out;
			cursor: pointer;
		}

		&__button {
			position: relative;

			@include flex-y($align: flex-end);
			height: $spacing--m;
			width: $spacing--l;
			padding: 0;

			background: transparent;
			border: 0;

			cursor: pointer;
			z-index: 10;

			.bun {
				position: absolute;
				top: 0;

				width: 100%;
				max-width: $spacing--l;
				height: $spacing--xs;

				background: var(--theme-colour);
				border-radius: $spacing--xs;

				transition: all 0.3s ease-out;

				&--bottom {
					top: calc(100% - $spacing--xs);

					max-width: $spacing--m;
				}
			}

			&.active {
				.bun {
					top: 9px;
					max-width: $spacing--l;

					transition: all 0.3s ease-out;
					transform: rotateZ(-45deg);

					&--bottom {
						transform: rotateZ(45deg);
					}
				}
			}
		}

		&__menu {
			position: fixed;
			top: $header-padding - $spacing--xs;
			right: $header-padding - $spacing--xs;
			bottom: calc(100% - $spacing--xs);

			width: 0vw;

			background: var(--theme-background);
			opacity: 0;

			z-index: 5;
			direction: rtl;
			overflow: hidden;
			pointer-events: none;

			border-radius: 50% 50% 0 50%;

			transition: all 0.4s ease-in;

			&.active {
				width: 100vw;
				top: 0;
				right: 0;
				bottom: 0;

				opacity: 1;
				border-radius: 0;
				pointer-events: auto;

				transition: all 0.5s ease-in-out;

				.pokedex__list {
					opacity: 1;
					transition-property: opacity, color;
					transition-timing-function: ease-in-out;
					transition-delay: 0.4s, 0s;
					transition-duration: 0.3s;
				}
			}
		}

		&__list {
			position: absolute;
			top: 50%;
			left: 50%;

			@include flex-y(center);
			height: 100%;
			width: 100%;
			gap: 20px;
			padding: 0 $spacing--xl;

			font-size: $font--heading;
			color: var(--theme-colour);

			opacity: 0;
			transform: translate(-50%, -50%);
			transition: all 0.1s ease-out;
			overflow: hidden;

			&-item {
				display: block;
				text-align: left;
				cursor: pointer;
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

		@media screen and (min-width: 1100px) {
			&__cards {
				grid-auto-rows: 35vh;
				grid-template-columns: repeat(3, 1fr);
			}
		}

		@media screen and (min-width: 1800px) {
			&__cards {
				grid-auto-rows: 35vh;
				grid-template-columns: repeat(4, 1fr);
			}
		}
	}
</style>
