<script setup lang="ts">
	import type { Pokemon } from "~/types/pokemon";
	import Return from "~/components/icons/Return.vue";

	definePageMeta({
		middleware: ["pokemon"],
	});

	const store = useDetailsStore();
	const details: ComputedRef<Pokemon> = computed(() => store.details);

	const type =
		details.value.types.length > 1
			? `${details.value.types[0].type.name}-${details.value.types[1].type.name}`
			: details.value.types[0].type.name;

	function playCry() {
		try {
			const cry = new Audio(details.value.cries.latest);
			cry.volume = 0.25;

			cry.load();
			cry.play();
		} catch (e) {
			window.alert(JSON.stringify(e, ["message", "arguments", "type", "name"]));
		}
	}
</script>

<template>
	<main class="pokemon" :class="`pokemon--${type}`">
		<header class="pokemon__heading">
			<Return @pointerup="goBack()" />
			<Menu :white="true" />
		</header>
		<section class="pokemon__main" :class="`pokemon__main--${type}`">
			<div class="pokemon__info">
				<hgroup>
					<h1 class="pokemon__name">{{ details.name }}</h1>
					<div class="pokemon__types">
						<p
							class="pokemon__type"
							v-for="type in details.types"
							:key="type.type.name"
							:class="`pokemon__type--${type.type.name}`">
							{{ type.type.name }}
						</p>
					</div>
				</hgroup>

				<div class="pokemon__minor">
					<p class="pokemon__id">#{{ details.id }}</p>
					<button type="button" class="pokemon__cry" @pointerup="playCry()">
						<p>Cry</p>
						<svg
							id="play-button"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 38 38">
							<path
								d="m6,6l26,13.08-26,12.92V6m0-6c-1.09,0-2.19.3-3.15.89C1.08,1.98,0,3.92,0,6v26c0,2.08,1.07,4.01,2.84,5.1.96.6,2.06.9,3.16.9.91,0,1.83-.21,2.67-.63l26-12.92c2.04-1.01,3.32-3.09,3.33-5.36,0-2.27-1.27-4.35-3.3-5.37L8.7.64c-.85-.43-1.77-.64-2.7-.64h0Z"
								stroke-width="0"
								stroke="#fff"
								fill="#fff" />
						</svg>
					</button>
				</div>
			</div>
			<img
				class="pokemon__image"
				:src="`https://pokedex-images.lon1.cdn.digitaloceanspaces.com/pokemon/image--${details.name}@2x.png`"
				:alt="`${details.name} sprite`" />
		</section>

		<Tabs :info="store" :details="details" />
	</main>
	<img
		class="background-pokeball"
		src="https://pokedex-images.lon1.cdn.digitaloceanspaces.com/icons/pokeball--loading.svg"
		alt="Pokeball icon" />
</template>

<style lang="scss">
	@use "sass:color";

	body > div {
		min-height: 100vh;

		@include flex-y(center, center);
	}

	@mixin background($direction: to left) {
		@each $type-primary, $colour-primary in $types {
			// If there is only one type.
			&--#{$type-primary} {
				.pokemon__main {
					background-image: url("https://pokedex-images.lon1.cdn.digitaloceanspaces.com/icons/#{$type-primary}.svg");
				}

				--background: #{linear-gradient(
						$direction,
						color.scale(rgba($colour-primary, 0.8), $lightness: -10%) 25%,
						color.scale(rgba($colour-primary, 0.8), $lightness: -35%) 60%,
						color.scale(rgba($colour-primary, 0.8), $lightness: -75%)
					)};
			}

			// If there is more than one type
			@each $type-secondary, $colour-secondary in $types {
				&--#{$type-primary}-#{$type-secondary} {
					.pokemon__main {
						background-image: url("https://pokedex-images.lon1.cdn.digitaloceanspaces.com/icons/#{$type-primary}.svg");
					}

					--background: #{linear-gradient(
							$direction,
							color.scale(rgba($colour-primary, 0.8), $lightness: -10%),
							color.scale(rgba($colour-secondary, 0.8), $lightness: -50%)
						)};
				}
			}
		}
	}

	.pokemon {
		max-height: 100vh;

		background: var(--background);
		overflow: hidden;

		@include background;
		@include flex-y;

		&__main {
			gap: $spacing;
			padding: $spacing $spacing 0;
			z-index: 2;

			background-position: -100% 0%;
			background-size: 110%;
			background-repeat: no-repeat;

			@include flex-y;
		}

		&__heading {
			height: max-content;
			padding: $spacing;

			color: var(--theme-colour);
			font-weight: 700;
			@include flex-x(space-between, center);
		}

		&__info {
			@include flex-x(space-between);

			hgroup {
				gap: $spacing--s;
				@include flex-y;
			}
		}

		&__name {
			font-size: $font--title;
			font-weight: 700;
			color: #fff;
			text-transform: capitalize;
		}

		&__types {
			gap: $spacing--xs;
			@include flex-x($align: center);
		}

		&__type {
			padding: 5px 10px;
			border-radius: 7.5px;

			color: #fff;
			font-size: 16px;
			font-weight: 500;
			text-transform: capitalize;

			@each $type-primary, $colour-primary in $types {
				&--#{$type-primary} {
					background: color.scale($colour-primary, $lightness: -20%);
				}
			}
		}

		&__minor {
			@include flex-y(space-between, flex-end);
		}

		&__id {
			font-size: $font--heading;
			color: #fff;
			font-weight: 700;
		}

		&__cry {
			gap: $spacing--xs;
			width: $spacing;

			background: transparent;
			border: 0;

			cursor: pointer;
			z-index: 20;

			@include flex-y(center, center);

			p {
				font-size: $font--body;
				font-weight: 700;
				color: #fff;
			}

			svg {
				height: $spacing--s;
				width: auto;
			}
		}

		&__image {
			width: clamp(250px, 60%, 350px);
			margin: 0 auto -#{$spacing--xl};
		}

		@media screen and (min-width: 700px) {
			&__image {
				margin: -#{$spacing--xl * 3} auto -#{$spacing--xl};
			}
		}

		@media screen and (min-width: 1024px) {
			flex-direction: row;
			width: clamp(1024px, 100%, 1280px);
			height: clamp(700px, 100vh - ($spacing * 3), 850px);
			min-height: 0;

			border-radius: $spacing;
			box-shadow: 2px 2px 10px 5px rgba(66, 66, 66, 0.1);
			overflow: hidden;

			@include background(to bottom);

			&__heading {
				position: absolute;
				left: 0;
				right: 0;

				z-index: 10;

				.menu__button.white {
					color: var(--theme-colour);
				}
			}

			&__main {
				flex: 0 0 clamp(400px, 40%, 550px);
				gap: $spacing--l * 2;
				padding: $spacing--l * 2 $spacing--l $spacing--l;

				background-position: left 350px;
				background-size: 150%;
			}

			&__image {
				width: clamp(300px, 100%, 450px);
				margin: 0 auto;
			}
		}

		@media screen and (min-width: 1800px) {
		}
	}
</style>
