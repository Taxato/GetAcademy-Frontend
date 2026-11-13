<template>
	<li>
		<h2>{{ task.name }}</h2>
		<p v-if="task.comment">{{ task.comment }}</p>
	</li>
</template>

<script setup lang="ts">
import type { Task } from "@/api";

defineProps<{
	task: Task;
}>();
</script>
