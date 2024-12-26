<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const modal = useModalStore();
const notification = useNotificationStore();

const props = defineProps({
  createRole: {
    type: Function,
    required: true
  },
  roles: {
    type: Array,
    required: true,
    default: []
  },
});

const role = reactive({
  name: null,
  title: null,
});

const handleCreateRole = async () => {
  if(!role.name || !role.title){
    notification.show('Заполните все поля!', 'warning');
    return;
  };
  const data = await props.createRole(role);
  props.roles.push(data.role);
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Название</h1>
      <Input
        id="add_role_name"
        type="text"
        v-model="role.name"
        placeholder="..."
      />
      <h1>Описание</h1>
      <Input
        id="add_role_title"
        type="text"
        v-model="role.title"
        placeholder="..."
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreateRole"
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