<script setup lang="ts">
	import type { PropType } from "vue";
	import type { PokemonList } from "~/types/pokemon";

	const props = defineProps({
		pokemon: { type: Object as PropType<PokemonList>, required: true },
	});

	const type =
		props.pokemon.details.types.length > 1
			? `${props.pokemon.details.types[0].type.name}-${props.pokemon.details.types[1].type.name}`
			: props.pokemon.details.types[0].type.name;
</script>

<template>
	<article
		class="card"
		:class="`card--${type} card--${pokemon.pokemon_species.name}`">
		<section class="card__info">
			<h2 class="card__name">{{ pokemon.pokemon_species.name }}</h2>
			<h3 class="card__id">Region ID: #{{ pokemon.details.id }}</h3>
			<div class="card__types">
				<p v-for="type in pokemon.details.types" :key="type.type.name">
					{{ type.type.name }}
				</p>
			</div>
			<span v-if="pokemon.details.is_legendary" class="card__legendary"
				>Legendary</span
			>
		</section>
		<img
			:src="pokemon.details.sprite as string"
			:alt="`${pokemon.details.id} sprite`" />
		<span class="card__entry">Entry: #{{ pokemon.entry_number }}</span>
	</article>
</template>

<style lang="scss" scoped>
	@use "sass:color";

	.card {
		position: relative;

		padding: 32px 18px;

		filter: drop-shadow(0px 0px 10px var(--theme-box-shadow));
		// border-radius: 10px;
		box-shadow: 0 0 0 0 var(--theme-box-shadow);

		overflow: hidden;
		cursor: pointer;
		opacity: 0;

		animation: fadeIn 450ms linear 1 forwards;

		transition: all 0.3s ease-in-out;

		@for $i from 1 through 250 {
			&:nth-child(250n + #{$i}) {
				animation-delay: 100ms * $i;
			}
		}

		$types: (
			"normal": $colour-normal,
			"fire": $colour-fire,
			"water": $colour-water,
			"electric": $colour-electric,
			"grass": $colour-grass,
			"ice": $colour-ice,
			"fighting": $colour-fighting,
			"poison": $colour-poison,
			"ground": $colour-ground,
			"flying": $colour-flying,
			"psychic": $colour-psychic,
			"bug": $colour-bug,
			"rock": $colour-rock,
			"ghost": $colour-ghost,
			"dragon": $colour-dragon,
			"dark": $colour-dark,
			"steel": $colour-steel,
			"fairy": $colour-fairy,
		);

		@mixin background {
			background-repeat: no-repeat;
			background-position: 75px -50px, 25% 25%;
			background-size: auto 150%;
		}

		@each $type-primary, $colour-primary in $types {
			// If there is only one type.
			&--#{$type-primary} {
				background: url("/type-icons/#{$type-primary}.svg"),
					linear-gradient(
						225deg,
						color.scale($colour-primary, $lightness: 10%) 25%,
						$colour-primary 60%,
						color.scale($colour-primary, $lightness: -25%)
					);
				@include background;
				transition: all 0.3s ease-in-out;

				.list-item__entry {
					color: $colour-primary;
				}
			}

			// If there is more than one type
			@each $type-secondary, $colour-secondary in $types {
				&--#{$type-primary}-#{$type-secondary} {
					background: url("/type-icons/#{$type-primary}.svg"),
						linear-gradient(225deg, $colour-primary, $colour-secondary);
					@include background;
					transition: all 0.3s ease-in-out;

					.list-item__entry {
						color: $colour-secondary;
					}
				}
			}
		}

		&__info {
			position: relative;

			@include flex-y(space-between);
			gap: 10px;
			width: 50%;

			z-index: 3;
		}

		&__name {
			font-size: 24px;
			font-weight: 700;
			color: #fff;
			text-transform: capitalize;
		}

		&__id {
			font-size: 18px;
			font-weight: 700;
			color: #fff;
		}

		&__entry {
			position: absolute;
			top: 0;
			right: 0;

			padding: 5px 10px;
			border-bottom-left-radius: 5px;

			color: #333;
			font-size: 12px;
			font-weight: 300;

			background: rgba(255, 255, 255, 0.75);
		}

		&__types {
			@include flex-x($align: center);
			gap: 5px;
			margin-top: 25px;

			p {
				padding: 5px 10px;
				border-radius: 7.5px;

				color: #fff;
				font-size: 16px;
				font-weight: 500;
				text-transform: capitalize;

				background: rgba(255, 255, 255, 0.25);
			}
		}

		&__legendary {
			font-size: 22px;
			font-weight: 700;
			color: #fff;

			animation: spooky 2500ms ease-in-out infinite 1500ms;
		}

		img {
			position: absolute;
			top: 50%;
			right: 16px;

			height: 100%;
			width: auto;

			z-index: 2;

			transform: scale(1) translateY(-50%);
			transition: all 0.3s ease-in-out;
		}

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;

			height: 100%;
			width: 100%;

			background: rgba(0, 0, 0, 0.1);
			opacity: 0;
			z-index: -1;
			transition: opacity 0.3s ease-in-out;
		}

		&:hover {
			box-shadow: 0 0 5px 5px var(--theme-box-shadow);
			transition: all 0.3s ease-in-out;

			&::before {
				opacity: 1;
				transition: opacity 0.3s ease-in-out;
			}
		}

		@media screen and (min-width: 1600px) {
			img {
				right: -45px;
			}
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 0.8;
			transform: translateY(0px);
		}
	}

	@keyframes spooky {
		0% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0;
			transform: scale(0.9);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
