<script setup>
import { ref } from "vue";

// Sample tag data
const tags = ref([
  { label: "Обработка", count: 23, color: "bg-blue-200 text-blue-800" },
  { label: "Обработка (новые)", count: 3, color: "bg-green-200 text-green-800" },
  { label: "Обработка (новые рус.яз)", count: 0, color: "bg-gray-200 text-gray-800" },
  { label: "Обработка (выделенный)", count: 0, color: "bg-gray-200 text-gray-800" },
  { label: "Обработка (WhatsApp)", count: 0, color: "bg-gray-200 text-gray-800" },
  { label: "Перезвон", count: 124, color: "bg-yellow-200 text-yellow-800" },
  { label: "Перезвон (рус.яз)", count: 5, color: "bg-yellow-200 text-yellow-800" },
  { label: "Недозвон", count: 5007, color: "bg-red-200 text-red-800" },
  { label: "Недозвон (рус.яз)", count: 2, color: "bg-red-200 text-red-800" },
  { label: "Подтвержден КД", count: 438, color: "bg-green-200 text-green-800" },
  { label: "Пред.подтвержден КД", count: 303, color: "bg-blue-200 text-blue-800" },
  { label: "Готов к передаче КД", count: 4, color: "bg-gray-200 text-gray-800" },
  { label: "Отправлен КД", count: 270, color: "bg-yellow-200 text-yellow-800" },
  { label: "Оплачен КД", count: 1598, color: "bg-green-200 text-green-800" },
  { label: "Возврат", count: 2158, color: "bg-red-200 text-red-800" },
  { label: "Дубль", count: 15429, color: "bg-gray-200 text-gray-800" },
  { label: "Спам/ошибки", count: 8860, color: "bg-gray-200 text-gray-800" },
  
]);

</script>

<template>
  <div class="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg shadow">
    <div
      v-for="(tag, index) in tags"
      :key="index"
      class="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
      :class="tag.color"
    >
      <span>{{ tag.label }}</span>
      <span class="bg-white px-2 py-0.5 rounded-full text-xs font-bold">
        {{ tag.count }}
      </span>
    </div>
  </div>
</template>
