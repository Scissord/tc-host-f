<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const modal = useModalStore();
const notification = useNotificationStore();

const props = defineProps({
  createWebmaster: {
    type: Function,
    required: true
  },
  webmasters: {
    type: Array,
    required: true,
    default: []
  },
  free_webmasters: {
    type: Array,
    required: true,
    default: []
  },
});

const webmaster = reactive({
  user_id: null,
});

const handleCreateWebmaster = async () => {
  if(!webmaster.user_id){
    notification.show('Заполните все поля!', 'warning');
    return;
  };
  const data = await props.createWebmaster(webmaster);
  props.webmasters.push(data.webmaster);
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Пользователь</h1>
      <Select
        v-model="webmaster.user_id"
        :options="free_webmasters"
        value="id"
        label="name"
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreateWebmaster"
        class="bg-green-500 hover:bg-green-400"
      />
      <Button
        text="Закрыть"
        @click="modal.hide"
        class="bg-red-500 hover:bg-red-400"
      />
    </div>

  </div>
</template>