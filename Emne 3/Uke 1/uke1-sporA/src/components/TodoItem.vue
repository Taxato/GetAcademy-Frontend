<script setup lang="ts">
import type { Task } from '../types'
import AppButton from './AppButton.vue'

defineProps<{
    task: Task
}>()
const emit = defineEmits<{
    toggle: [id: number]
    remove: [id: number]
    edit: [id: number]
}>()
</script>

<template>
    <input 
        type="checkbox" 
        :checked="task.done" 
        @change="emit('toggle', task.id)" 
    />
    <li :class="{ done: task.done }">{{ task.id }}: {{ task.text }} </li>
    <button @click="emit('remove', task.id)">Slett</button>
    <button @click="emit('edit', task.id)">Rediger</button>
    <AppButton signal="remove" @remove="emit('remove', task.id)">Slett</AppButton>
    <AppButton signal="edit" @edit="emit('edit', task.id)">Rediger</AppButton>
</template>
<style scoped>
li.done {
    text-decoration: line-through;
}
</style>