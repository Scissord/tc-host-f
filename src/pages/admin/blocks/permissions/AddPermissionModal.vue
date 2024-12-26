<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const modal = useModalStore();
const notification = useNotificationStore();

const props = defineProps({
  createPermission: {
    type: Function,
    required: true
  },
  abilities: {
    type: Array,
    required: true,
    default: []
  },
  permissions: {
    type: Array,
    required: true,
    default: []
  },
  entity_id: {
    type: [String, Number],
    required: true,
  },
  entity_type: {
    type: String,
    required: true,
  },
});

const permission = reactive({
  entity_id: props.entity_id,
  entity_type: props.entity_type,
  ability_id: null,
});

const handleCreatePermission = async () => {
  if(!permission.ability_id){
    notification.show('Заполните все поля!', 'warning');
    return;
  };
  const data = await props.createPermission(permission);
  props.permissions.push(data.permission);
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Доступ</h1>
      <Select
        v-model="permission.ability_id"
        :options="abilities"
        value="id"
        label="title"
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreatePermission"
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