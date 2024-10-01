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
		class="menu__button"
		:class="{ active: menuOpen, white: white }"
		@click="menuOpen = !menuOpen">
		<span class="bun bun--top"></span>
		<span class="bun bun--bottom"></span>
	</button>
	<nav class="menu__container" :class="{ active: menuOpen }">
		<ul class="menu__list">
			<li
				class="menu__list-item"
				v-for="(generation, key) in generations"
				@click="goTo('generations-id', { id: key })">
				{{ generation.label }}
			</li>
		</ul>
	</nav>
</template>

<style lang="scss" scoped>
	.menu {
		&__button {
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

		&__container {
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

				.menu__list {
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

			@include flex-y(center);

			&-item {
				display: block;
				text-align: left;
				cursor: pointer;
			}
		}

		@media screen and (min-width: 1100px) {
			&__container.active {
				width: 50vw;
			}
		}

		@media screen and (min-width: 1800px) {
			&__container.active {
				width: 25vw;
			}
		}
	}
</style>
