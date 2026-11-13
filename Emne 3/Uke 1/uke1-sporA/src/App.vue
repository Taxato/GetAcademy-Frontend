<script setup lang="ts">
import AppCounter from './components/AppCounter.vue'
import TodoList from './components/TodoList.vue'
import AppHeader from './components/AppHeader.vue'
import AppBox from './components/AppBox.vue'
</script>

<template>
  <AppHeader />
 <main>
  <AppCounter />
    <TodoList />
    <AppBox>
      <p>Dette er innholdet i boksen.</p>
    </AppBox> 
    <AppBox>
      <p>Dette er en annen boks med innhold.</p>
    </AppBox>
 </main>
</template>

<style scoped>
</style>
