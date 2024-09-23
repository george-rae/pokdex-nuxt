<script setup lang="ts">
	import generations from "~/config/generations";

	definePageMeta({
		middleware: ["generations"],
	});

	const menuOpen = ref(false);

	const pokedex = usePokedexStore();
	const pokemons = pokedex.getPokemon;
</script>

<template>
	<main class="pokedex">
		<header class="pokedex__header">
			<h1 class="pokedex__title" @click="goTo('/')">
				Gen {{ pokedex.getPokedexID }}
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
			<Card v-for="pokemon in pokemons" :pokemon="pokemon" />
		</section>
	</main>
</template>

<style lang="scss" scoped>
	.pokedex {
		$header-padding: 24px;

		@include flex-y;
		height: 100vh;
		overflow: hidden;

		&__header {
			@include flex-x(space-between, center);
			height: max-content;
			padding: $header-padding;

			font-size: 45px;
			font-weight: 700;
			color: var(--theme-colour);

			transition: all 0.3s ease-in-out;
		}

		&__button {
			position: relative;

			@include flex-y($align: flex-end);
			gap: 12px;
			height: 28px;
			width: 36px;
			padding: 0;

			font-size: 20px;
			font-weight: 700;

			background: transparent;
			border: 0;

			cursor: pointer;
			z-index: 10;

			.bun {
				$height: 6px;

				position: absolute;
				top: 0;

				width: 100%;
				max-width: 36px;
				height: $height;

				background: var(--theme-colour);
				border-radius: 5px;

				transition: all 0.3s ease-out;

				&--bottom {
					top: calc(100% - $height);

					max-width: 26px;
				}
			}

			&.active {
				.bun {
					top: 11px;
					right: 2px;
					max-width: 32px;

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
			top: $header-padding - 4px;
			right: $header-padding - 4px;
			bottom: calc(100% - 4px);

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
			padding: 24px 48px;

			font-size: 24px;
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
	}
</style>
