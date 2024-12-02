<script setup>
defineProps({
  script: Array,
  chapters: Array,
  handleOpenChapter: Function,
  handleTextPress: Function
});
</script>

<template>
  <div class="flex flex-col gap-4 mt-4 overflow-y-auto">
    <div
      v-for="chapterItem in chapters"
      :key="chapterItem.id"
      class="flex flex-col gap-3 overflow-hidden border border-slate-200 rounded-lg p-3"
    >
      <p
        class="font-semibold text-md overflow-hidden whitespace-nowrap px-4 py-2 border border-slate-200 rounded-lg cursor-pointer hover:bg-gray-300 transition duration-300 ease-in-out select-none"
        @click="handleOpenChapter(chapterItem)"
        >
        {{ chapterItem.name }}
      </p>
      <div
        v-if="chapterItem.isMenuOpen"
        v-for="text in chapterItem.texts"
        :key="text.id"
        class="flex flex-col gap-3"
      >
        <p
          :class="[
            'whitespace-nowrap px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out cursor-pointer overflow-hidden text-sm select-none hover:bg-gray-200 h-10 flex items-center',
            script.length > 0 && script[0].id === text.id ? 'bg-gray-300' : '',

          ]"
          @click="handleTextPress(text)"
        >
          {{ text.content }}
        </p>
      </div>
    </div>
  </div>

</template>
