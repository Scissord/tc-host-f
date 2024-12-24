<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const props = defineProps({
  createSubStatus: {
    type: Function,
    required: true
  },
  sub_statuses: {
    type: Array,
    required: true,
    default: []
  },
  status_id: String,
})

const modal = useModalStore();
const notification = useNotificationStore();

const sub_status = reactive({
  name: "",
});

const handleCreateSubStatus = async () => {
  if(!sub_status.name){
    notification.show('Заполните все поля!', 'warning');
    return;
  };
  const data = await props.createSubStatus({
    name: sub_status.name,
    status_id: props.status_id,
  });
  props.sub_statuses.push(data.subStatus);
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Название подстатуса</h1>
      <Input
        id="add_sub_status_name"
        type="text"
        v-model="sub_status.name"
        placeholder="Введите..."
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreateSubStatus"
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