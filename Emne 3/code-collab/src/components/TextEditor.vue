<template>
	<main>
		<editor-toolbar
			:char-count="charCount"
			:user-name="userName" />
		<textarea
			v-model="text"
			placeholder="Skriv koden din her..." />
	</main>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import EditorToolbar from "./EditorToolbar.vue";

defineProps<{ userName: string }>();

const text = ref("");
const charCount = computed(() => text.value.length);
</script>
