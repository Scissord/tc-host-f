<script setup>
defineProps({
  script: Object,
  isScriptEditable: Boolean,
  handleChangeEditor: Function,
  handleDestroyText: Function
})
</script>

<template>
  <div class="absolute bg-white top-1 right-1 flex items-center justify-center gap-3 py-3 px-5">
    <Icon
      :icon="['fas', 'delete-left']"
      class="text-lg text-red-500 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
      @click="handleDestroyText(script[0])"
    />
  </div>
</template>