<script setup lang="ts">
	import generations from "~/config/generations";
	loading.value = false;

	definePageMeta({
		layout: "gen-list",
	});
</script>

<template>
	<h1 class="generations__header">Choose your Gen</h1>
	<ul class="generations__list">
		<li
			class="generations__item"
			:class="`generations__item--${key}`"
			v-for="(value, key) in generations"
			:key="value.label"
			@click="goTo('generations-id', { id: key })">
			<p class="generations__label">
				{{ value.label }}
			</p>
			<img
				:src="`/generations/generation--${key}@2x.png`"
				:alt="`Generation ${key}`" />
		</li>
	</ul>
</template>

<style lang="scss">
	.generations {
		gap: $spacing--m;
		min-height: 100vh;
		padding: $spacing--xl $spacing--m;

		@include flex-y;

		&__header {
			color: transparent;
			font-size: $font--title;
			font-weight: bold;
			text-align: center;

			background: var(--theme-gradient-text);
			-webkit-background-clip: text;
			background-clip: text;
		}

		&__list {
			gap: $spacing--m;
			@include flex-x(center, center, wrap);
		}

		&__item {
			position: relative;

			flex: 0 0 100%;
			height: clamp(150px, 25vh, 220px);
			padding: $spacing--m;

			border-radius: $spacing--s;
			background: var(--theme-background);
			box-shadow: 0px 0px $spacing--s 1px var(--theme-box-shadow);
			overflow: hidden;
			opacity: 0;

			cursor: pointer;
			animation: fadeIn 500ms linear 1 forwards;
			transition: all 0.3s ease-in-out;

			@include flex-y($align: center);

			img {
				width: 90%;
				height: auto;
				z-index: 1;

				transform: scale(1);
				transition: all 300ms ease-out;
			}

			&--national {
				img {
					width: 100%;
					margin-top: -$spacing--s;
				}
			}

			@for $i from 1 through 12 {
				&:nth-child(#{$i}) {
					animation-delay: 100ms * $i;
				}
			}

			&:hover {
				box-shadow: 0 0 $spacing--xs $spacing--xs var(--theme-box-shadow);
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
			padding: $spacing--m;

			&__item {
				flex-basis: calc(50% - $spacing--s);
			}
		}

		@media screen and (min-width: 900px) {
			justify-content: center;
			align-items: center;

			&__item {
				flex-basis: calc(33% - 18px);

				img {
					width: 90%;
				}
			}
		}

		@media screen and (min-width: 1200px) {
			&__list {
				max-width: 1200px;
			}

			&__item img {
				width: 80%;
			}
		}

		@media screen and (min-width: 2000px) {
			&__list {
				max-width: 1400px;
			}

			&__item {
				height: clamp(150px, 25vh, 250px);
			}
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: translateY($spacing--m);
		}
		100% {
			opacity: 1;
			transform: translateY(0px);
		}
	}
</style>
