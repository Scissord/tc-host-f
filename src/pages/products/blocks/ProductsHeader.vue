<script setup>
defineProps({
  handleAddProduct: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="flex items-center justify-between bg-zinc-600 text-white px-6 py-4 rounded">
    <h1 class="text-2xl font-semibold">
      <span class="font-bold">Продукты</span>
    </h1>
    <div class="flex gap-2">
      <button
        @click="handleAddProduct"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
      >
        + Добавить Продукт
      </button>
    </div>
  </div>
</template>