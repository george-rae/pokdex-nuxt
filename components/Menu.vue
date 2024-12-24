<script setup lang="ts">
	import generations from "~/config/generations";

	defineProps({
		white: Boolean,
	});

	const menuOpen = ref(false);
</script>

<template>
	<button
		type="button"
		v-if="!isDesktop"
		:class="{ active: menuOpen, white: white }"
		@click="menuOpen = !menuOpen">
		<span class="bun bun--top"></span>
		<span class="bun bun--bottom"></span>
	</button>
	<div class="container" :class="{ active: menuOpen }">
		<Search />
		<ul>
			<h3 class="generations-list">Generations:</h3>
			<li
				v-for="(generation, key) in generations"
				@click="goTo('generations-id', { id: key })">
				{{ generation.label }}
			</li>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
	button {
		position: relative;

		height: $spacing--m;
		width: $spacing--l;
		padding: 0;

		color: var(--theme-colour);

		background: transparent;
		border: 0;

		cursor: pointer;
		z-index: 10;

		@include flex-y($align: flex-end);

		.bun {
			position: absolute;
			top: 0;

			width: 100%;
			max-width: $spacing--l;
			height: $spacing--xs;

			background: currentColor;
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

		&.white {
			color: #fff;

			&.active {
				color: var(--theme-colour);
			}
		}
	}

	.container {
		position: fixed;
		top: $header-padding - $spacing--xs;
		right: $header-padding - $spacing--xs;
		bottom: calc(100% - $spacing--xs);

		width: 0vw;
		gap: $spacing--m;
		padding: $spacing--l;

		background: var(--theme-background);
		opacity: 0;

		z-index: 5;
		overflow: hidden;
		pointer-events: none;

		border-radius: 50% 50% 0 50%;

		transition: all 0.4s ease-in;

		@include flex-y;

		& > * {
			opacity: 0;
			transition: opacity 0.1s ease-out;
		}

		&.active {
			width: 100vw;
			top: 0;
			right: 0;
			bottom: 0;

			opacity: 1;
			border-radius: 0;
			pointer-events: auto;

			transition: all 0.5s ease-in-out;

			& > * {
				opacity: 1;

				transition: opacity 0.4s ease-out 0.5s;
			}
		}
	}

	ul {
		gap: 20px;
		padding: 0;

		color: var(--theme-colour);

		overflow: hidden;

		@include flex-y(center);

		& > li {
			display: block;

			font-size: $font--medium;
			font-weight: 500;
			text-align: left;
			cursor: pointer;
		}
	}

	@media screen and (min-width: 1100px) {
		.container.active {
			width: 50vw;
		}
	}

	@media screen and (min-width: 1400px) {
		button {
			display: none;
			visibility: hidden;
		}

		.container {
			position: static;

			height: 100%;
			width: 100%;
			padding: 0;

			background: transparent;
			border-radius: 0;
			opacity: 1;

			& > * {
				opacity: 1;

				pointer-events: auto;
			}

			ul {
				position: static;
				padding: 0;

				justify-content: flex-start;

				transform: translate(0);
				opacity: 1;
			}

			&.active {
				width: 100%;
			}
		}
	}
</style>
