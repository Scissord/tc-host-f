<script setup>
import { ref, toRaw, reactive, computed, watch, onMounted } from 'vue';
import { useGoods, useChapters, useTexts, useAnswers } from '@hooks';
import { useUserStore, useNotificationStore } from '@store'
import Chapters from './blocks/Chapters.vue';
import Script from './blocks/Script.vue';

const userStore = useUserStore();
const notification = useNotificationStore();

const {
  handleGetGoods,
  handleGetScript,
} = useGoods();

const {
  handleGetChapters,
  handleCreateChapter,
  handleUpdateChapter,
  handleDeleteChapter,
} = useChapters();

const {
  handleGetTexts,
  handleCreateTextName,
  handleUpdateTextName,
  handleDeleteText
} = useTexts();

const {
  handleCreateAnswer,
  handleUpdateAnswer,
  handleDeleteAnswer
} = useAnswers();

const good = reactive({});
const goods = reactive([]);

const chapters = reactive([]);
const texts = reactive([]);

const script = reactive([]);

const isScriptEditable = ref(false);

const handleChangeGood = async (val) => {
  const chaptersData = await handleGetChapters(val.good_id);
  chapters.splice(0, chapters.length, ...chaptersData);
  const textsData = await handleGetTexts(val.good_id);
  texts.splice(0, texts.length, ...textsData);
};

const handleChangeScript = async (val) => {
  if(val.id) {
    const data = await handleGetScript(val.id);
    script.splice(0, script.length, ...data);
    isScriptEditable.value = false;
  } else {
    script.splice(0, script.length, val);
    isScriptEditable.value = true;
  }
};

const handleAddChapter = () => {
  if(!good.good_id) return notification.show('Выберите продукт!', 'error');
  for(const chapter of chapters) {
    if(!chapter.id) {
      notification.show('Завершите создание предыдущего раздела!', 'error')
      return;
    }
  }
  chapters.unshift({
    id: null,
    name: null,
  });
};

const handleOpenChapter = (chapter) => {
  if(!chapter.id) return;
  chapter.isMenuOpen = !chapter.isMenuOpen
};

const handleEditChapter = (chapter_id) => {
  const index = chapters.findIndex((c) => c.id === chapter_id);
  if (index !== -1) {
    chapters[index].isEditable = !chapters[index].isEditable;
  }
};

const handleSaveChapterName = async (chapter) => {
  handleEditChapter(chapter.id);
  let data = null;
  if(!chapter.id) {
    data = await handleCreateChapter(chapter.name);
    chapters.shift();
    chapters.push(data);
  } else {
    data = await handleUpdateChapter(chapter.id, chapter.name);
  }
};

const handleDestroyChapter = async (chapter_id) => {
  const confirm = window.confirm('Вы уверены?')
  if (!confirm) return;

  if(!chapter_id) {
    chapters.splice(
      0,
      chapters.length,
      ...chapters.filter((chapter) => chapter.id !== null)
    );
  } else {
    await handleDeleteChapter(chapter_id);
    chapters.splice(
      0,
      chapters.length,
      ...chapters.filter((chapter) => chapter.id !== chapter_id)
    );
  }
};

const handleAddText = async (chapter_id) => {
  const currentChapter = chapters.find((c) => c.id === chapter_id);

  // validate should be in service;
  for(const chapter of chapters) {
    if (chapter.texts && Array.isArray(chapter.texts)) {
      for(const text of chapter.texts) {
        if(!text.id) {
          notification.show('Завершите создание предыдущего подраздела!', 'error')
          return;
        };
      };
    };
  };

  currentChapter.texts = currentChapter.texts || [];

  currentChapter.texts.push({
    id: null,
    chapter_id,
    content: "",
    department_id: userStore.data.department_id,
    good_id: good.good_id,
    queue_order: currentChapter.texts.length + 1,
    answers: [],
  });
};

const handleChangeEditor = async () => {
  isScriptEditable.value = !isScriptEditable.value;
};

const handleSaveTextName = async (val) => {
  let data;

  if (!val.id) {
    data = await handleCreateTextName({
      department_id: val.department_id,
      content: val.content,
      queue_order: val.queue_order,
      good_id: val.good_id,
      chapter_id: val.chapter_id
    });
  } else {
    data = await handleUpdateTextName({
      id: val.id,
      content: val.content,
      department_id: val.department_id,
      queue_order: val.queue_order,
      good_id: val.good_id,
      chapter_id: val.chapter_id
    });
  }

  texts.push(data);

  data.answers = val.answers;
  const currentChapter = chapters.find((c) => c.id === val.chapter_id);

  if (currentChapter) {
    const textIndex = currentChapter.texts.findIndex((text) => text.id === val.id);

    if (textIndex !== -1) {
      currentChapter.texts[textIndex] = data;
    } else {
      currentChapter.texts.push(data);
    }
  }
  script.splice(0, script.length, data);
  isScriptEditable.value = false;
};

const handleDestroyText = async (val) => {
  if(val.id) await handleDeleteText(val.id);
  const currentChapter = chapters.find((c) => c.id === val.chapter_id);
  if (currentChapter) {
    const textIndex = currentChapter.texts.findIndex((text) => text.id === val.id);

    if (textIndex !== -1) {
      currentChapter.texts.splice(textIndex, 1);
    }
  }
  script.splice(0, script.length);
  isScriptEditable.value = false;
};

const handleChangeButtonWay = (index, val) => {
  script[0].answers[index].next_text_id = val.id
};

const handlePressAnswer = async (val) => {
  if(!val.next_text_id) return notification.show('Укажите куда, должен вести ответ', 'error');
  const data = await handleGetScript(val.next_text_id);
  script.splice(0, script.length, ...data);
};

const handleAddAnswer = () => {
  const existingAnswer = script[0].answers.find(answer => answer.id === null);
  if (existingAnswer) return notification.show('Закончите редактировать предыдущий ответ!', 'error');

  script[0].answers.push({
    id: null,
    content: "",
    next_text_id: null,
    text_id: null
  });
};

const handleSaveAnswer = async (answer) => {
  let data = {};
  if(!answer.id) {
    data = await handleCreateAnswer({
      content: answer.content,
      next_text_id: answer.next_text_id,
      text_id: script[0].id
    });
    const currentAnswer = script[0].answers.find((a) => a.id === answer.id)
    currentAnswer.id = data.id;
  } else {
    data = await handleUpdateAnswer(answer.id, {
      content: answer.content,
      next_text_id: answer.next_text_id,
      text_id: answer.text_id
    });
  }
};

const handleDestroyAnswer = async (answer) => {
  if(answer.id) {
    await handleDeleteAnswer(answer.id);
  }

  script[0].answers = script[0].answers.filter((a) => a.id !== answer.id);
};

onMounted(async () => {
  const goodsData = await handleGetGoods();
  goods.splice(0, goods.length, ...goodsData);
});

watch(() => good, (newGood) => {
  if(newGood.good_id) {
    handleChangeGood(newGood);
  }
}, { deep: true });

// watch(() => texts, (newVal, oldVal) => {
//   console.log("newVal", newVal);
//   console.log("oldVal", oldVal);
// }, { deep: true });
</script>

<template>
  <div class="h-[80vh] flex items-center justify-center gap-8 p-8">
    <Chapters
      :good="good"
      :goods="goods"
      :handleChangeGood="handleChangeGood"
      :chapters="chapters"
      :handleChangeScript="handleChangeScript"
      :handleOpenChapter="handleOpenChapter"
      :handleAddChapter="handleAddChapter"
      :handleEditChapter="handleEditChapter"
      :handleSaveChapterName="handleSaveChapterName"
      :handleDestroyChapter="handleDestroyChapter"
      :handleAddText="handleAddText"
    />
    <Script
      :script="script"
      :texts="texts"
      :isScriptEditable="isScriptEditable"
      :handleChangeEditor="handleChangeEditor"
      :chapters="chapters"
      :handleSaveTextName="handleSaveTextName"
      :handleAddAnswer="handleAddAnswer"
      :handleChangeButtonWay="handleChangeButtonWay"
      :handlePressAnswer="handlePressAnswer"
      :handleDestroyText="handleDestroyText"
      :handleSaveAnswer="handleSaveAnswer"
      :handleDestroyAnswer="handleDestroyAnswer"
    />
  </div>
</template>
