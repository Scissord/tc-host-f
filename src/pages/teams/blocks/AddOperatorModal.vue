<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const props = defineProps({
  addOperator: {
    type: Function,
    required: true
  },
  operators: {
    type: Array,
    required: true,
    default: []
  },
  free_operators: {
    type: Array,
    required: true,
    default: []
  },
  team_id: String
})

const modal = useModalStore();
const notification = useNotificationStore();

const user = reactive({ id: null });

const handleUpdateOperator = async () => {
  if(!user.id){
    notification.show('Выберите оператора!', 'warning');
    return;
  };
  const data = await props.addOperator(user.id, { 
    team_id: props.team_id,
    deleted_at: null,
  });
  props.operators.push(data.operator);
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Оператор</h1>
      <Select
        v-model="user.id"
        :options="free_operators"
        value="id"
        label="name"
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleUpdateOperator"
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