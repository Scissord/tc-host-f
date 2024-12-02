<script setup>
import LeadVertexData from './Tabs/LeadVertexData.vue';
import ScriptData from './Tabs/ScriptData.vue';
defineProps({
  tab: Object,
  tabs: Array,
  order: Object,
  order_id: [String, Number],
  isOrderLoading: Boolean,
  handleSaveOrder: Function,
  script: Array,
  chapters: Array,
  isChaptersLoading: Boolean,
  handleOpenChapter: Function,
  handleTextPress: Function
})
</script>

<template>
  <div class="h-full w-1/4 bg-white border border-slate-200 rounded-lg p-4 overflow-y-auto">
    <div class="flex items-center justify-center gap-6">
      <div
        v-for="t in tabs"
        :key="t.id"
        :class='["border-b-2 cursor-pointer select-none hover:text-gray-300 transition-colors duration-300 ease-in-out", tab.id === t.id ? "border-blue-500" : "border-slate-200"]'
        @click="tab.id = t.id"
      >
        {{t.label}}
      </div>
    </div>
    <!-- Leadvertex -->
    <LeadVertexData
      v-if="tab.id === 1 && !isOrderLoading && Object.keys(order).length > 0"
      :order="order"
      :order_id="order_id"
      :handleSaveOrder="handleSaveOrder"
    />
    <Loader v-if="tab.id === 1 && isOrderLoading && Object.keys(order).length === 0"/>
    <!-- Скрипт -->
    <ScriptData
      v-if="tab.id === 2 && !isChaptersLoading && chapters.length > 0"
      :script="script"
      :chapters="chapters"
      :handleOpenChapter="handleOpenChapter"
      :handleTextPress="handleTextPress"
    />
    <Loader v-if="tab.id === 2 && isChaptersLoading && chapters.length === 0"/>
  </div>
</template>
