<script setup lang="ts">
	import { usePokedexStore } from "~/stores/pokedex";
	import generations from "~/config/generations";

	usePokedexStore().$reset();
</script>

<template>
	<main class="generations">
		<h2 class="generations__header">Choose your Gen</h2>
		<ul class="generations__list">
			<li
				class="generations__item"
				:class="`generations__item--${generation.slug}`"
				v-for="generation in generations"
				:key="generation.label"
				@click="
					$router.push({
						name: 'generations-id',
						params: { id: generation.ID },
					})
				">
				<p class="generations__label">
					{{ generation.label }}
				</p>
				<img
					:src="`/generations/generation--${generation.slug}@2x.png`"
					:alt="`Generation ${generation.slug}`" />
			</li>
		</ul>
	</main>
</template>

<style lang="scss" scoped>
	.generations {
		@include flex-y;
		gap: 24px;
		padding: 48px 24px;

		&__header {
			color: transparent;
			font-size: clamp(24px, 10vw, 48px);
			font-weight: bold;
			text-align: center;

			background: var(--theme-gradient-text);
			-webkit-background-clip: text;
			background-clip: text;
		}

		&__list {
			display: grid;
			gap: 24px;
		}

		&__item {
			position: relative;

			@include flex-y($align: center);
			height: clamp(150px, 25vh, 200px);
			padding: 12px;

			border-radius: 12px;
			background: var(--theme-background);
			box-shadow: 0px 0px 12px 1px var(--theme-box-shadow);
			overflow: hidden;
			opacity: 0;

			cursor: pointer;
			animation: fadeIn 500ms linear 1 forwards;
			transition: all 0.3s ease-in-out;

			img {
				width: 80%;
				height: auto;
				z-index: 1;

				transform: scale(1);
				transition: all 300ms ease-out;
			}

			&--national {
				img {
					width: 100%;
					margin-top: -12px;
				}
			}

			@for $i from 1 through 9 {
				&:nth-child(#{$i}) {
					animation-delay: 250ms * $i;
				}
			}

			&:hover {
				box-shadow: 0 0 6px 6px var(--theme-box-shadow);
				transition: all 0.3s ease-in-out;
				filter: brightness(0.85);

				img {
					transform: scale(1.1);
					transition: all 300ms ease-out;
				}
			}
		}

		&__label {
			color: var(--theme-colour);
			font-size: 24px;
			text-align: center;
		}

		@media screen and (min-width: 600px) {
			height: 100%;
			padding: 24px;

			&__list {
				grid-template-columns: repeat(2, 50%);
				justify-content: center;
			}
		}

		@media screen and (min-width: 900px) {
			&__list {
				grid-template-columns: repeat(3, 30%);
			}

			&__item img {
				width: 90%;
			}
		}

		@media screen and (min-width: 1200px) {
			@include flex-y(center, center);
			gap: 48px;
			&__list {
				max-width: 1200px;
			}

			&__item img {
				width: 80%;
			}
		}

		@media screen and (min-width: 2000px) {
			&__list {
				max-width: 1600px;
			}

			&__item {
				height: clamp(150px, 25vh, 350px);
				img {
					width: 90%;
				}
			}
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateY(24px);
		}
		100% {
			opacity: 1;
			transform: translateY(0px);
		}
	}
</style>
