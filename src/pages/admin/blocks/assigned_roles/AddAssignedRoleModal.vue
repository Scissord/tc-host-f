<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const modal = useModalStore();
const notification = useNotificationStore();

const props = defineProps({
  role_id: {
    type: String,
    required: true,
  },
  users: {
    type: Array,
    required: true,
    default: []
  },
  assigned_roles: {
    type: Array,
    required: true,
    default: []
  },
  createAssignedRole: {
    type: Function,
    required: true
  },
});

const assigned_role = reactive({
  role_id: props.role_id,
  entity_id: null,
  entity_type: 'user',
});

const handleCreateAssignedRole = async () => {
  if(!assigned_role.entity_id){
    notification.show('Заполните все поля!', 'warning');
    return;
  };
  const data = await props.createAssignedRole(assigned_role);
  if(data) {
    props.assigned_roles.push(data.assigned_role);
  }
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Пользователь</h1>
      <Select
        v-model="assigned_role.entity_id"
        :options="users"
        value="id"
        label="name"
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreateAssignedRole"
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