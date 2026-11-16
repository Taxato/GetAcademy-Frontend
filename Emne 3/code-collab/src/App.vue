<template>
	<div class="app-layout">
		<app-header
			v-model:user-name="userName"
			class="app-header" />
		<text-editor
			class="app-editor"
			:user-name="userName" />
		<assistant-panel class="app-assistant" />
		<app-footer
			app-name="Code Collab"
			:year="2026"
			class="app-footer" />
	</div>
	<!-- <click-counter
		:initial="10"
		@inc="n => console.log(n)" />
	<click-counter :initial="15" /> -->
</template>

<script setup lang="ts">
import { ref } from "vue";

import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import TextEditor from "./components/TextEditor.vue";
import AssistantPanel from "./components/AssistantPanel.vue";
// import ClickCounter from "./components/ClickCounter.vue";

const userName = ref("");
</script>

<style scoped>
.app-layout {
	display: grid;
	grid-template-columns: 1fr 300px;
	grid-template-rows: auto 1fr auto;
	min-height: 100vh;
	gap: 1px;
	background: #ddd;
}
.app-header,
.app-footer {
	grid-column: 1 / -1;
}
</style>
