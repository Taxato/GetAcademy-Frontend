<template>
	<ul>
		<todo-item
			v-for="task in tasks"
			:key="task.id"
			:task="task" />
	</ul>
</template>

<script setup lang="ts">
import { tasks } from "@/api";
import TodoItem from "./TodoItem.vue";
</script>
