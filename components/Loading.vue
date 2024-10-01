<script setup lang="ts">
	import { generateLetters } from "@/utils/helpers";
	import PokeBall from "./icons/PokeBall.vue";

	const loading = generateLetters("Loading...");
</script>

<template>
	<figure class="loading-background">
		<PokeBall />
		<figcaption>
			<span v-for="(letters, index) in loading" :key="index">
				{{ letters }}
			</span>
		</figcaption>
	</figure>
</template>

<style lang="scss" scoped>
	.loading-background {
		position: fixed;
		inset: 0;

		gap: 20px;
		height: 100%;
		width: 100%;

		opacity: 0;
		background: var(--theme-background);

		pointer-events: none;
		z-index: 10;
		transition: opacity 250ms ease-in-out 500ms;

		@include flex-y(center, center);

		.pokeball-icon {
			position: relative;

			height: clamp(75px, 20vw, 150px);
			width: clamp(75px, 20vw, 150px);

			opacity: 0;
			transition: opacity 250ms ease-in-out;
		}

		&.loading {
			opacity: 1;
			pointer-events: auto;
			z-index: 20;
			transition: opacity 250ms ease-in-out;

			figcaption,
			.pokeball-icon {
				opacity: 1;
				transition: opacity 250ms ease-in-out 250ms;
			}
		}

		figcaption {
			font-size: clamp(25px, 8vw, 125px);
			color: var(--theme-colour);
			font-weight: 700;

			opacity: 0;
			z-index: 10;

			transition: opacity 250ms ease-in-out;

			span {
				position: relative;
				top: 0;

				display: inline-block;
				margin-right: 10px;

				user-select: none;

				animation: sway 750ms linear infinite;

				&:last-child {
					margin-right: 0;
				}
			}

			@for $i from 1 to 11 {
				span:nth-child(#{$i}) {
					animation-delay: calc(#{$i * 50ms});
				}
			}
		}

		@media screen and (min-width: 320px) {
			figcaption {
				bottom: 15%;

				width: 100%;

				text-align: center;
			}
		}

		@media screen and (min-width: 1024px) {
			figcaption {
				bottom: 50%;
				right: 20px;

				width: 50%;

				transform: translateY(50%);
			}

			&.loading {
				z-index: 20;
			}
		}
	}

	// GENERIC KEYFRAMES
	@keyframes sway {
		25% {
			top: 0.25vh;
		}

		50% {
			top: 0px;
		}

		75% {
			top: -0.25vh;
		}

		100% {
			top: 0px;
		}
	}
</style>
