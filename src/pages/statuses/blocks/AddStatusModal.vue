<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const props = defineProps({
  createStatus: {
    type: Function,
    required: true
  },
  statuses: {
    type: Array,
    required: true,
    default: []
  },
})

const modal = useModalStore();
const notification = useNotificationStore();

const status = reactive({
  name: "",
  color: "",
});

const handleCreateStatus = async () => {
  if(!status.color){
    notification.show('Заполните все поля!', 'warning');
    return;
  };
  const data = await props.createStatus(status);
  props.statuses.push(data.status);
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Название статуса</h1>
      <Input
        id="add_status_name"
        type="text"
        v-model="status.name"
        placeholder="Введите..."
      />
    </div>
    <div class="grid grid-cols-2 gap-6">
      <h1>Хэш цвета</h1>
      <Input
        id="add_status_color"
        type="text"
        v-model="status.color"
        placeholder="Хэш..."
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreateStatus"
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