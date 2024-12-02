<script setup>
defineProps({
  script: Array,
  handlePressAnswer: Function
})
</script>

<template>
  <div class="h-full w-3/4 bg-white border border-slate-200 rounded-lg p-4">
    <div v-if="script.length > 0" class="flex flex-col gap-6 py-4 px-2">
      <h1 class="text-xl font-bold">{{ script[0].content }}</h1>
      <h2
        class="text-lg font-semibold"
      >
        Ответы:
      </h2>
      <div
        v-for="(answer, index) in script[0].answers"
        :key="index"
        class="flex items-center gap-3"
      >
        <Button
          v-if="answer.id && !isScriptEditable"
          :text="answer.content"
          @click="handlePressAnswer(answer)"
        />
      </div>
    </div>
  </div>
</template>