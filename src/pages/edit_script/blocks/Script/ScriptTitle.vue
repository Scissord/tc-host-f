<script setup>
defineProps({
  script: Array,
  isScriptEditable: Boolean,
  handleSaveTextName: Function,
  handleChangeEditor: Function,
})
</script>

<template>
  <div
    v-if="!isScriptEditable"
    class="flex items-center gap-3"
  >
    <h1
      class="text-xl font-bold"
    >
      {{ script[0].content }}
    </h1>
    <Icon
      :icon="['fas', 'pen-to-square']"
      class="text-lg text-blue-500 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
      @click="handleChangeEditor"
    />
  </div>

  <div
    v-else
    class="flex items-center gap-3"
  >
    <Input
      :id="script[0].id"
      type="text"
      v-model="script[0].content"
      placeholder="Название подраздела..."
      className="text-md w-[300px]"
    />
    <Icon
      :icon="['fas', 'floppy-disk']"
      class="text-lg text-blue-500 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
      @click="handleSaveTextName(script[0])"
    />
  </div>
</template>
