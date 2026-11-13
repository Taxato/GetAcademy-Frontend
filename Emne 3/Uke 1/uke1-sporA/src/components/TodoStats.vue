<template>
  <p>
    {{
      total === 0
        ? "Ingen oppgaver"
        : total === 1
          ? "Én oppgave"
          : `${total} oppgaver, ${done} ferdig`
    }}
  </p>
</template>

<script setup lang="ts">
defineProps<{ total: number; done: number }>();
</script>
