<script lang="ts" setup>
	import type { Pokemon, Details } from "~/types/pokemon";
	import type { PropType } from "vue";
	import { stats } from "~/config/constants";

	const props = defineProps({
		details: { type: Object as PropType<Pokemon>, required: true },
		info: { type: Object as PropType<Details>, required: true },
	});

	console.log(props.details);

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
				<hgroup class="pokemon__section-content">
					<h3>Species</h3>
					<p>{{ info.genus }}</p>
				</hgroup>
				<hgroup class="pokemon__section-content">
					<h3>Description</h3>
					<p>{{ info.description }}</p>
				</hgroup>
				<hgroup class="pokemon__section-content">
					<h3>Height</h3>
					<p>{{ details.height / 10 }}m</p>
				</hgroup>
				<hgroup class="pokemon__section-content">
					<h3>Weight</h3>
					<p>{{ details.weight / 10 }}kg</p>
				</hgroup>

				<h2 class="pokemon__subtitle">Abilities</h2>
				<hgroup
					class="pokemon__section-content"
					v-for="ability in details.abilities">
					<h3>{{ ability.name }}</h3>
					<p>{{ ability.effect }}</p>
				</hgroup>
			</article>
			<article
				class="pokemon__section pokemon__stats"
				:class="{ active: tabActive === 'stats' }">
				<div
					class="pokemon__section-content"
					v-for="{ base_stat, stat } in details.stats">
					<h3>{{ stats[stat.name].name }}</h3>
					<p>
						{{ base_stat }}
					</p>
					<div
						:style="`--stat: ${(base_stat / 160) * 100}%`"
						class="pokemon__stat"
						:class="stats[stat.name].class"></div>
				</div>
			</article>
			<article
				class="pokemon__section"
				:class="{ active: tabActive === 'evolution' }">
				<div
					class="pokemon__evolutions"
					v-if="info.evolution_chain.chain.evolves_to.length > 0"
					v-for="evolution in info.evolution_chain.chain.evolves_to">
					<figure class="pokemon__evolution">
						<img
							class="pokemon__evolution-image"
							:src="`https://pokedex-images.lon1.cdn.digitaloceanspaces.com/pokemon/image--${info.evolution_chain.chain.species.name}@2x.png`"
							:alt="info.evolution_chain.chain.species.name" />
						<figcaption class="pokemon__evolution-reason">
							<p class="name">{{ info.evolution_chain.chain.species.name }}</p>
							<p class="reason">Base Pokemon</p>
						</figcaption>
					</figure>

					<figure class="pokemon__evolution pokemon__evolution--next">
						<img
							class="pokemon__evolution-image"
							:src="`https://pokedex-images.lon1.cdn.digitaloceanspaces.com/pokemon/image--${evolution.species.name}@2x.png`"
							:alt="evolution.species.name" />
						<figcaption class="pokemon__evolution-reason">
							<p class="name">{{ evolution.species.name }}</p>
							<p class="reason" v-html="getLevelUpRequirements(evolution)"></p>
						</figcaption>
					</figure>

					<figure
						class="pokemon__evolution pokemon__evolution--next"
						v-if="evolution.evolves_to.length > 0"
						v-for="evo2 in evolution.evolves_to">
						<img
							class="pokemon__evolution-image"
							:src="`https://pokedex-images.lon1.cdn.digitaloceanspaces.com/pokemon/image--${evo2.species.name}@2x.png`"
							:alt="evo2.species.name" />
						<figcaption class="pokemon__evolution-reason">
							<p class="name">{{ evo2.species.name }}</p>
							<p class="reason" v-html="getLevelUpRequirements(evo2)"></p>
						</figcaption>
					</figure>
				</div>
				<p class="pokemon__nochain" v-else>
					This Pokemon does not have an evolution chain.
				</p>
			</article>
			<article
				class="pokemon__section pokemon__moves"
				:class="{ active: tabActive === 'moves' }">
				<section class="pokemon__move" v-for="move in details.moves">
					<h2 class="pokemon__move-name">{{ move.name }}</h2>
					<hgroup
						class="pokemon__section-content"
						v-for="info in Object.entries(move).filter(
							(entry) => entry[0] !== 'name'
						)">
						<h3 :class="`key key--${info[0]}`">{{ info[0] }}</h3>
						<p :class="`value value--${info[0]}`">{{ info[1] }}</p>
					</hgroup>
				</section>
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
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				gap: $spacing--m;
				padding: 0 $spacing--s;
			}

			&-sections {
				position: relative;
				flex: 1;
			}
		}

		&__tab {
			padding: $spacing--s 0;

			font-size: $font--medium;
			font-weight: 500;
			color: var(--theme-colour-washout);
			text-transform: capitalize;

			background: transparent;
			border: 0;
			border-bottom: 2px solid transparent;

			transition: all 0.3s ease-in;
			cursor: pointer;

			&.active {
				color: var(--theme-colour);

				border-bottom-color: var(--theme-colour);

				transition: all 0.3s ease-in;
			}
		}

		&__section {
			position: absolute;
			inset: 0;

			gap: $spacing--s;

			font-size: $font--body;

			opacity: 0;
			visibility: hidden;
			overflow: auto;
			pointer-events: none;

			transition: all 0.3s ease-in;
			@include flex-y;

			&-content {
				display: grid;
				grid-template-columns: 33% 1fr;

				h3 {
					padding-right: $spacing--s;
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
				pointer-events: all;
				transition: all 0.3s ease-in;
			}
		}

		&__subtitle {
			margin: $spacing--s 0 $spacing--xs;

			font-size: $font--medium;
			color: var(--theme-colour);
			font-weight: 700;
		}

		&__stats {
			gap: $spacing;

			& > .pokemon__section-content {
				grid-template-columns: 33% $spacing--l 1fr;
				align-items: center;

				p {
					font-weight: 700;
				}
			}
		}

		&__stat {
			width: 100%;
			height: $spacing--xs;

			border-radius: $spacing--xs;
			background: linear-gradient(
				to right,
				var(--bar-colour) var(--stat),
				#e6e6e6 var(--stat),
				#e6e6e6
			);

			@include flex-x(center, center);

			&.blue {
				--bar-colour: #5d9bd6;
			}
			&.green {
				--bar-colour: #3ebf74;
			}
			&.red {
				--bar-colour: #fb5656;
			}
		}

		&__evolutions {
			gap: $spacing;
			padding: $spacing 0;

			@include flex-y($align: center);
		}

		&__evolution {
			position: relative;

			display: grid;
			grid-template-columns: 50% 1fr;
			gap: $spacing;
			width: 90%;

			color: var(--theme-colour);

			&-image {
				width: 100%;
			}

			&-reason {
				gap: $spacing--s;

				@include flex-y(center);

				.name {
					font-size: $font--medium;
					font-weight: 700;
					text-transform: capitalize;
				}

				.reason {
					font-size: $font--body;
					color: var(--theme-colour-washout);
				}
			}

			&--next::before {
				content: "";

				position: absolute;
				bottom: 100%;
				left: 50%;

				width: 2px;
				height: $spacing--xl;

				background: #e6e6e6;
				transform: translate(-50%, 12px);
			}
		}

		&__nochain {
			padding: $spacing--l;

			font-size: $font--medium;
			font-weight: 500;
			color: var(--theme-colour-washout);
			text-align: center;
		}

		&__move {
			gap: $spacing--s;

			@include flex-y;

			&-name {
				padding-bottom: $spacing--s;

				font-size: $font--medium;
				font-weight: 700;
				color: var(--theme-colour);
			}

			.key,
			.value--class,
			.value--type {
				text-transform: capitalize;

				&--pp {
					text-transform: uppercase;
				}
			}

			& + & {
				padding-top: $spacing--s;
			}
		}
	}
</style>
