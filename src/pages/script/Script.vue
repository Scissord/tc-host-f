<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useOrder, useChapters, useGoods } from '@hooks'
import ScriptCard from './blocks/ScriptCard.vue';
import TabsCard from './blocks/TabsCard.vue';

const route = useRoute();
const order_id = route.params.order_id;
const good_id = route.params.good_id;

const isOrderLoading = ref(false);
const order = reactive({});

const isChaptersLoading = ref(false);
const chapters = reactive([]);

const script = reactive([]);

const tab = reactive({ id: 1 })
const tabs = reactive([
  { id: 1, label: 'LeadVertex' },
  { id: 2, label: 'Скрипт' },
]);

const { handleGetScript } = useGoods();
const { handleGetOrder, handleSaveOrder } = useOrder();
const { handleGetChapters } = useChapters();

// clear localStorage
const clearOtherOrdersFromLocalStorage = () => {
  const currentKey = `order-${order_id}`;
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('order-') && key !== currentKey) {
      localStorage.removeItem(key);
    }
  });
};
// take from localStorage
const loadOrderFromLocalStorage = () => {
  const savedOrder = localStorage.getItem(`order-${order_id}`);
  if (savedOrder) {
    Object.assign(order, JSON.parse(savedOrder));
    return true;
  }
  return false;
};
// edit localStorage
watch(
  order,
  (newOrder) => {
    localStorage.setItem(`order-${order_id}`, JSON.stringify(newOrder));
  },
  { deep: true }
);
// get LeadVertexData
onMounted(async () => {
  clearOtherOrdersFromLocalStorage();
  const isLoadedFromLocalStorage = loadOrderFromLocalStorage();
  if(!isLoadedFromLocalStorage) {
    isOrderLoading.value = true;
    const orderData = await handleGetOrder(order_id);
    Object.assign(order, orderData);
    isOrderLoading.value = false;
  }
});
// get Chapters
onMounted(async () => {
  isChaptersLoading.value = true;
  const chaptersData = await handleGetChapters(good_id);
  chapters.splice(0, chapters.length, ...chaptersData);
  isChaptersLoading.value = false;
});
// open chapter
const handleOpenChapter = (chapter) => {
  chapter.isMenuOpen = !chapter.isMenuOpen
};
// press on text
const handleTextPress = async (val) => {
  const data = await handleGetScript(val.id);
  script.splice(0, script.length, ...data);
};
// press on answer
const handlePressAnswer = async (val) => {
  if(!val.next_text_id) return notification.show('Ответ никуда не ведет!', 'error');
  const data = await handleGetScript(val.next_text_id);
  script.splice(0, script.length, ...data);
};

watch(() => chapters, (newVal) => {
  console.log(newVal)
}, { deep: true });
</script>

<template>
  <div class="h-[80vh] bg-script-bg">
    <div class="py-8 px-12 flex flex-col gap-8 h-full">
      <div class="flex items-center justify-center gap-8 h-full">
        <ScriptCard
          :script="script"
          :handlePressAnswer="handlePressAnswer"
        />
        <TabsCard
          :tab="tab"
          :tabs="tabs"
          :order="order"
          :order_id="order_id"
          :isOrderLoading="isOrderLoading"
          :handleSaveOrder="handleSaveOrder"
          :script="script"
          :chapters="chapters"
          :isChaptersLoading="isChaptersLoading"
          :handleOpenChapter="handleOpenChapter"
          :handleTextPress="handleTextPress"
        />
      </div>
    </div>
  </div>
</template>
