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

	const card = ref<Element | null>(null);
	const active = ref<boolean>(false);

	onMounted(async () => {
		const observer = new IntersectionObserver(
			(card) => {
				const { isIntersecting, target } = card[0];
				if (isIntersecting) target.classList.add("active");
			},
			{ threshold: 0 }
		);
		observer.observe(card.value as Element);
	});
</script>

<template>
	<article
		class="card"
		:class="[
			{ active: active },
			`card--${type}`,
			`card--${pokemon.pokemon_species.name}`,
		]"
		ref="card">
		<hgroup class="card__info">
			<h2 class="card__name">{{ pokemon.pokemon_species.name }}</h2>
			<h3 class="card__id">Region ID: #{{ pokemon.details.id }}</h3>
			<span v-if="pokemon.details.is_legendary" class="card__legendary"
				>Legendary</span
			>
		</hgroup>
		<div class="card__types">
			<p
				v-for="type in pokemon.details.types"
				:key="type.type.name"
				:class="type.type.name">
				{{ type.type.name }}
			</p>
		</div>
		<img
			:src="`/pokemon/image--${pokemon.pokemon_species.name}@2x.png`"
			:alt="`${pokemon.details.id} sprite`" />
		<span class="card__entry">Entry: #{{ pokemon.entry_number }}</span>
	</article>
</template>

<style lang="scss">
	@use "sass:color";

	@mixin background {
		background-repeat: no-repeat;
		background-position: 75px -50px, 25% 25%;
		background-size: auto 150%;
	}

	.theme--dark {
		.card {
			@each $type-primary, $colour-primary in $types {
				// If there is only one type.
				&--#{$type-primary} {
					background: url("/type-icons/#{$type-primary}.svg"),
						linear-gradient(
							225deg,
							color.scale(rgba($colour-primary, 0.8), $lightness: -10%) 25%,
							color.scale(rgba($colour-primary, 0.8), $lightness: -35%) 60%,
							color.scale(rgba($colour-primary, 0.8), $lightness: -75%)
						);
					@include background;

					.list-item__entry {
						color: var(--theme-colour);
					}
				}

				// If there is more than one type
				@each $type-secondary, $colour-secondary in $types {
					&--#{$type-primary}-#{$type-secondary} {
						background: url("/type-icons/#{$type-primary}.svg"),
							linear-gradient(
								225deg,
								color.scale(rgba($colour-primary, 0.8), $lightness: -10%),
								color.scale(rgba($colour-secondary, 0.8), $lightness: -50%)
							);
						@include background;

						.list-item__entry {
							color: var(--theme-colour);
						}
					}
				}
			}
		}
	}

	.card {
		position: relative;

		@include flex-y(space-between);
		padding: $spacing--l $spacing--m;

		overflow: hidden;
		cursor: pointer;
		opacity: 0;

		transition: all 0.3s ease-in-out;

		&.active {
			animation: fadeIn 450ms linear 1 forwards;

			transition: all 0.3s ease-in-out;

			@for $i from 1 through 12 {
				&:nth-child(#{$i}) {
					animation-delay: 100ms * $i;
				}
			}
		}

		@each $type-primary, $colour-primary in $types {
			// If there is only one type.
			&--#{$type-primary} {
				--card-colour: #{color.scale($colour-primary, $lightness: -25%)};
				background: url("/type-icons/#{$type-primary}.svg"),
					linear-gradient(
						225deg,
						color.scale($colour-primary, $lightness: 10%) 25%,
						$colour-primary 60%,
						color.scale($colour-primary, $lightness: -25%)
					);
				@include background;

				.list-item__entry {
					color: $colour-primary;
				}
			}

			// If there is more than one type
			@each $type-secondary, $colour-secondary in $types {
				&--#{$type-primary}-#{$type-secondary} {
					--card-colour: #{color.scale($colour-secondary, $lightness: -25%)};
					background: url("/type-icons/#{$type-primary}.svg"),
						linear-gradient(225deg, $colour-primary, $colour-secondary);
					@include background;

					.list-item__entry {
						color: $colour-secondary;
					}
				}
			}
		}

		&__info {
			position: relative;

			display: grid;
			grid-template: repeat(3, 1fr);
			gap: $spacing--s;
			width: 50%;

			z-index: 3;
		}

		&__name {
			font-size: $font--title;
			font-weight: 700;
			color: #e6e6e6;
			text-transform: capitalize;
			text-shadow: var(--card-colour) 2px 2px 5px;
		}

		&__id {
			font-size: $font--body;
			font-weight: 700;
			color: #e6e6e6;

			text-shadow: var(--card-colour) 2px 2px 10px;
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
			gap: $spacing--xs;

			p {
				padding: 5px 10px;
				border-radius: 7.5px;

				color: #fff;
				font-size: 16px;
				font-weight: 500;
				text-transform: capitalize;

				@each $type-primary, $colour-primary in $types {
					&.#{$type-primary} {
						background: color.scale($colour-primary, $lightness: -20%);
					}
				}
			}
		}

		&__legendary {
			font-size: $font--body;
			font-weight: 700;
			color: #fff;

			animation: spooky 2500ms ease-in-out infinite 1500ms;
		}

		img {
			position: absolute;
			top: 50%;
			right: 16px;

			height: 90%;
			width: auto;

			z-index: 2;

			transform: scale(0.9) translateY(-50%);
			transition: all 0.3s ease-in-out;
		}

		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;

			height: 100%;
			width: 100%;

			background: rgba(0, 0, 0, 0.2);
			opacity: 0;
			z-index: -1;
			transition: opacity 0.3s ease-in-out;
		}

		&:hover {
			img {
				transform: scale(1) translateY(-50%);
				transition: all 0.3s;
			}

			&::before {
				opacity: 1;
				transition: opacity 0.3s ease-in-out;
			}
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
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
