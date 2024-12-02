<script setup>
import { computed, watch } from 'vue';
import EditArea from './Script/EditArea.vue'
import ScriptAnswers from './Script/ScriptAnswers.vue';
import ScriptTitle from './Script/ScriptTitle.vue';

const props = defineProps({
  script: Array,
  texts: Array,
  chapters: Array,
  isScriptEditable: Boolean,
  handleChangeEditor: Function,
  handleSaveTextName: Function,
  handleAddAnswer: Function,
  handleChangeButtonWay: Function,
  handlePressAnswer: Function,
  handleDestroyText: Function,
  handleSaveAnswer: Function,
  handleDestroyAnswer: Function,
})
</script>

<template>
  <div class="h-full rounded-lg bg-white w-3/4 border flex flex-col gap-3 px-4 py-4 relative">
    <div v-if="script.length > 0" class="flex flex-col gap-6 py-4 px-2">
      <EditArea
        :script="script"
        :isScriptEditable="isScriptEditable"
        :handleChangeEditor="handleChangeEditor"
        :handleDestroyText="handleDestroyText"
      />
      <ScriptTitle
        :script="script"
        :isScriptEditable="isScriptEditable"
        :handleChangeEditor="handleChangeEditor"
        :handleSaveTextName="handleSaveTextName"
      />
      <ScriptAnswers
        :texts="texts"
        :script="script"
        :chapters="chapters"
        :handleChangeButtonWay="handleChangeButtonWay"
        :handleAddAnswer="handleAddAnswer"
        :isScriptEditable="isScriptEditable"
        :handlePressAnswer="handlePressAnswer"
        :handleSaveAnswer="handleSaveAnswer"
        :handleDestroyAnswer="handleDestroyAnswer"
        :handleChangeEditor="handleChangeEditor"
      />
    </div>
    <p v-else class="text-xl font-bold">
      Выберите сценарий
    </p>
  </div>
</template>
