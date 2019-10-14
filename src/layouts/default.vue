<template>
	<div class="layout">
		<header>
			<h1>Using OpenApi For Testing</h1>
		</header>
		<main>
			<nuxt />
		</main>
	</div>
</template>

<style>
body {
	padding: 1rem 2rem;
	font-family: system-ui;
}
</style>

<style scoped>
.layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

main {
	flex-grow: 1;
}

h1 {
	font-size: 4rem;
	margin-top: 1rem;
}
</style>
