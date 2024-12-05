<script setup>
const props = defineProps({
  chapterItem: Object,
  handleChangeScript: Function,
  handleOpenChapter: Function,
  handleEditChapter: Function,
  handleSaveChapterName: Function,
  handleDestroyChapter: Function
})
</script>

<template>
  <div v-if="!chapterItem.isEditable" class="flex items-center justify-between gap-3">
    <p
      :class="[
        'text-md whitespace-nowrap p-2 rounded-lg transition-colors duration-300 ease-in-out overflow-hidden font-bold select-none w-full',
        chapterItem.name && 'hover:bg-gray-300 cursor-pointer'
      ]"
      @click="handleOpenChapter(chapterItem)"
    >
      {{ chapterItem.name }}
    </p>
    <div class="flex items-center gap-3">
      <Icon
        :icon="['fas', 'pen-to-square']"
        class="text-md text-blue-500 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
        @click="handleEditChapter(chapterItem.id)"
      />
      <Icon
        :icon="['fas', 'delete-left']"
        class="text-md text-red-500 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
        @click="handleDestroyChapter(chapterItem.id)"
      />
    </div>

  </div>

  <div v-else class="flex items-center justify-between gap-3">
    <Input
      :id="chapterItem.id"
      type="text"
      v-model="chapterItem.name"
      placeholder="Название раздела..."
      className="text-md"
    />
    <div class="flex items-center gap-3">
      <Icon
        :icon="['fas', 'floppy-disk']"
        class="text-md text-blue-500 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
        @click="handleSaveChapterName(chapterItem)"
      />
      <Icon
        :icon="['fas', 'delete-left']"
        class="text-md text-red-500 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
        @click="handleDestroyChapter(chapterItem.id)"
      />
    </div>
  </div>

  <div
    v-if="chapterItem.isMenuOpen"
    v-for="text in chapterItem.texts"
    :key="text.id"
    class="flex flex-col gap-3"
  >
    <p
      :class="[
        'whitespace-nowrap p-2 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer overflow-hidden text-sm select-none hover:bg-gray-200 h-8 flex items-center',
        text.content ? '' : 'border border-slate-200'
      ]"
      @click="handleChangeScript(text)"
    >
      {{ text.content }}
    </p>
  </div>
</template>
