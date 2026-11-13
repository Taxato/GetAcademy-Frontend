<template>
  <div class="counter">
    <p>Teller: {{ count }}</p>
    <button @click="increment">+{{ step }}</button>
    <button @click="decrement">-{{ step }}</button>
    <button @click="reset">Nullstill</button>
    <input v-model.number="step" type="number" name="step" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
const step = ref(1);

function increment() {
  count.value += step.value;
}

function decrement() {
  count.value -= step.value;
}

function reset() {
  count.value = 0;
}
</script>

<style scoped>
.counter {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  max-width: 260px;
}
</style>
