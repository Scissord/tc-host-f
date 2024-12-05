<script setup>
import ChapterItem from './Chapters/ChapterItem.vue';

const props = defineProps({
  good: Object,
  goods: Array,
  handleChangeGood: Function,
  chapters: Array,
  handleChangeScript: Function,
  handleOpenChapter: Function,
  handleAddChapter: Function,
  handleEditChapter: Function,
  handleSaveChapterName: Function,
  handleDestroyChapter: Function,
  handleAddText: Function,
});
</script>

<template>
  <div class="h-full rounded-lg bg-white w-1/4 border flex flex-col gap-3 px-4 py-4 overflow-y-auto">
    <div class="flex items-center gap-3 w-full">
      <div class="w-full">
        <vSelect
          label="good_name"
          v-model="good.good_id"
          :reduce="(option) => option.good_id"
          :options="goods"
          placeholder="Выберите..."
        />
      </div>

      <Icon
        :icon="['far', 'square-plus']"
        class="text-md text-green-500 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
        @click="handleAddChapter"
      />
    </div>

    <div
      v-for="chapterItem in chapters"
      :key="chapterItem.id"
      class="border border-slate-200 rounded-lg p-3 flex flex-col gap-3"
    >
      <ChapterItem
        :chapterItem="chapterItem"
        :handleChangeScript="handleChangeScript"
        :handleOpenChapter="handleOpenChapter"
        :handleEditChapter="handleEditChapter"
        :handleSaveChapterName="handleSaveChapterName"
        :handleDestroyChapter="handleDestroyChapter"
      />
      <div
        v-if="chapterItem.isMenuOpen"
        class="cursor-pointer rounded-full bg-gray-100 hover:bg-gray-300 w-full flex items-center justify-center transition duration-300 ease-in-out py-2"
        @click="handleAddText(chapterItem.id)"
      >
        <Icon
          :icon="['fas', 'plus']"
          class="text-md text-black"
        />
      </div>
    </div>
  </div>
</template>
