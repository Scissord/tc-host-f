<script setup>
defineProps({
  handleAddCities: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center justify-between bg-zinc-600 text-white px-6 py-4 rounded">
      <h1 class="text-2xl font-semibold">
        Города
      </h1>
      <div class="flex gap-2">
        <button
          @click="handleAddCity"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          + Добавить Город
        </button>
      </div>
    </div>
</template>