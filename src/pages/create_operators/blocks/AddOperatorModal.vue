<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const modal = useModalStore();
const notification = useNotificationStore();

const props = defineProps({
  createOperator: {
    type: Function,
    required: true
  },
  operators: {
    type: Array,
    required: true,
    default: []
  },
  teams: {
    type: Array,
    required: true,
    default: []
  },
  free_operators: {
    type: Array,
    required: true,
    default: []
  },
});

const operator = reactive({
  user_id: null,
  team_id: null,
});

const handleCreateOperator = async () => {
  if(!operator.user_id || !operator.team_id){
    notification.show('Заполните все поля!', 'warning');
    return;
  };
  const data = await props.createOperator(operator);
  props.operators.push(data.operator);
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Пользователь</h1>
      <Select
        v-model="operator.user_id"
        :options="free_operators"
        value="id"
        label="name"
      />
      <h1>Команда</h1>
      <Select
        v-model="operator.team_id"
        :options="teams"
        value="id"
        label="title"
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreateOperator"
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