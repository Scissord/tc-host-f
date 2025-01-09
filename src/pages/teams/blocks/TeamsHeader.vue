<script setup>
defineProps({
  handleAddTeam: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div
    class="flex items-center justify-between bg-zinc-600 text-white px-6 py-4 rounded shadow"
  >
    <h1 class="text-2xl font-semibold">Команды</h1>
    <div class="flex gap-2">
      <button
        @click="handleAddTeam"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
      >
        + Добавить Команду Отдела
      </button>
    </div>
  </div>
</template>
