<template>
	<footer>{{ appName }} © {{ year }}</footer>
</template>

<script setup lang="ts">
defineProps<{ appName: string; year: number }>();
</script>
