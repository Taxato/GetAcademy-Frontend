<template>
	<main>
		<h1>Counter:</h1>
		<h2>{{ counter }}</h2>
		<button @click="counter++">Increase counter</button>
	</main>
</template>

<script setup lang="ts">
import { ref } from "vue";

const counter = ref(0);
</script>
