<script setup>
defineProps({
  value: {
    type: Number,
    required: true,
    default: 0,
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
  icon: {
    type: String,
    required: false,
    default: "fa-solid fa-lock",
  },
});
</script>

<template>
  <div class="flex items-center space-x-4">
    <!-- Icon Section -->
    <div class="text-cyan-600 text-4xl">
        <Icon :icon="icon" />
    </div>

    <!-- Content Section -->
    <div>
      <h4 class="text-xl font-bold text-gray-700">{{ value }}</h4>
      <p class="text-gray-500 text-sm">{{ title }}</p>
    </div>
  </div>
</template>
