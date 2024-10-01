<script lang="ts" setup>
	import type { Pokemon, Details } from "~/types/pokemon";
	import type { PropType } from "vue";

	defineProps({
		info: { type: Object as PropType<Pokemon>, required: true },
	});

	const store = useDetailsStore();
	const details: Details = store;

	const tabs = ["details", "stats", "evolution", "moves"];
	const tabActive: Ref<string> = ref("details");

	function toggleTabs(tabName: string) {
		tabActive.value = tabName;
	}
</script>

<template>
	<section class="pokemon__tabs">
		<div class="pokemon__tabs-groups">
			<button
				v-for="tab in tabs"
				type="button"
				class="pokemon__tab"
				:class="{ active: tabActive === tab }"
				@click="toggleTabs(tab)">
				{{ tab }}
			</button>
		</div>
		<div class="pokemon__tabs-sections">
			<article
				class="pokemon__section"
				:class="{ active: tabActive === 'details' }">
				<div class="scroll-group">
					<article class="pokemon__section-content">
						<h3>Description</h3>
						<p>{{ details.description }}</p>
					</article>
					<article class="pokemon__section-content">
						<h3>Abilities</h3>
						<div class="pokemon__abilities">
							<p v-for="(ability, index) in info.abilities">
								{{ ability.ability.name
								}}<span v-if="index !== info.abilities.length - 1">, </span>
							</p>
						</div>
					</article>
					<article class="pokemon__section-content">
						<h3>Height</h3>
						<p>{{ info.height / 10 }}m</p>
					</article>
					<article class="pokemon__section-content">
						<h3>Weight</h3>
						<p>{{ info.weight / 10 }}kg</p>
					</article>
				</div>
			</article>
			<article
				class="pokemon__section"
				:class="{ active: tabActive === 'stats' }">
				<div class="scroll-group">
					<p class="pokemon__stats" v-for="{ base_stat, stat } in info.stats">
						{{ stat.name }}: {{ base_stat }}
					</p>
				</div>
			</article>
			<article
				class="pokemon__section"
				:class="{ active: tabActive === 'evolution' }">
				<div class="scroll-group">
					<p class="pokemon__stats">
						{{ details.evolution_chain }}
					</p>
				</div>
			</article>
			<article
				class="pokemon__section"
				:class="{ active: tabActive === 'moves' }">
				<div class="scroll-group">
					<p class="pokemon__moves" v-for="move in info.moves">
						{{ move }}
					</p>
				</div>
			</article>
		</div>
	</section>
</template>

<style lang="scss" scoped>
	.pokemon {
		&__tabs {
			flex: 1;
			gap: $spacing;
			padding: $spacing--xl $spacing $spacing;

			background: var(--theme-background);
			border-radius: $spacing $spacing 0 0;

			@include flex-y;

			&-groups {
				padding: $spacing--s;

				border-bottom: 2px solid var(--theme-colour-washout);

				@include flex-x(space-between);
			}

			&-sections {
				position: relative;
				flex: 1;
			}
		}

		&__tab {
			font-size: $font--body;
			font-weight: 500;
			color: var(--theme-colour-washout);
			text-transform: capitalize;

			background: transparent;
			border: 0;

			transition: all 0.3s ease-in;
			cursor: pointer;

			&.active {
				color: var(--theme-colour);
				font-weight: 700;

				transition: all 0.3s ease-in;
			}
		}

		&__section {
			position: absolute;
			inset: 0;

			font-size: $font--body;

			opacity: 0;
			visibility: hidden;
			overflow: auto;

			transition: all 0.3s ease-in;

			&-content {
				display: grid;
				grid-template-columns: 30% 1fr;

				h3 {
					color: var(--theme-colour-washout);
				}

				p {
					display: inline;

					color: var(--theme-colour);
				}
			}

			&.active {
				opacity: 1;
				visibility: visible;
				transition: all 0.3s ease-in;
			}
		}
	}

	.scroll-group {
		gap: $spacing--s;
		@include flex-y;
	}
</style>
