<template>
	<div class="grid">
		<article v-for="pet in pets" :key="pets.id" data-testId="pet">
			<div class="media">
				<img
					:src="pet.image"
					:alt="`Photo of ${pet.name}`"
					class="image"
					data-testId="pet-image"
				/>
			</div>
			<h1 class="title" data-testId="pet-title">{{ pet.name }}</h1>
		</article>
	</div>
</template>

<script>
export default {
	async asyncData({ $axios }) {
		const pets = await $axios.$get(`pets`);
		return { pets };
	},
};
</script>

<style scoped>
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	grid-gap: 2rem;
}

.media {
	position: relative;
	padding-bottom: 66.66%;
	background-color: #eee;
}

.image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.title {
	font-size: 1.5rem;
}
</style>
