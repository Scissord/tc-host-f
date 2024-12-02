<script setup>
const props = defineProps({
  script: Array,
  texts: Array,
  chapters: Array,
  isScriptEditable: Boolean,
  handlePressAnswer: Function,
  handleChangeButtonWay: Function,
  handleAddAnswer: Function,
  handleSaveAnswer: Function,
  handleDestroyAnswer: Function,
  handleChangeEditor: Function
});
</script>

<template>
  <div class="flex items-center gap-3">
    <h2
      class="text-lg font-semibold"
    >
      Ответы
    </h2>
    <Icon
      v-if="script[0].id && isScriptEditable"
      :icon="['far', 'square-plus']"
      class="text-lg text-green-500 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
      @click="handleAddAnswer"
    />
  </div>
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
    <div
      v-if="isScriptEditable"
      class="flex items-center gap-3"
    >
      <Input
        :id="answer.id"
        v-model="answer.content"
        type="text"
        placeholder="Название ответа..."
        className="text-md w-[200px]"
      />
      <vSelect
        label="content"
        v-model="answer.next_text_id"
        :reduce="(option) => option.id"
        :options="texts"
        placeholder="Куда..."
        class="min-w-[300px]"
      />
    </div>
    <div
      className="flex items-center gap-3"
    >
      <Icon
        v-if="!isScriptEditable"
        :icon="['fas', 'pen-to-square']"
        class="text-lg text-blue-500 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
        @click="handleChangeEditor()"
      />
      <Icon
        v-else
        :icon="['fas', 'floppy-disk']"
        class="text-lg text-blue-500 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
        @click="handleSaveAnswer(answer)"
      />
      <Icon
        :icon="['fas', 'delete-left']"
        class="text-lg text-red-500 cursor-pointer hover:text-gray-400 transition duration-300 ease-in-out"
        @click="handleDestroyAnswer(answer)"
      />
    </div>
  </div>
</template>