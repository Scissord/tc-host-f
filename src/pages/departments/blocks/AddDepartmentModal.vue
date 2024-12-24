<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const props = defineProps({
  createDepartment: {
    type: Function,
    required: true
  },
  departments: {
    type: Array,
    required: true,
    default: []
  },
  subStatuses: {
    type: Array,
    required: true,
    default: []
  },
})

const modal = useModalStore();
const notification = useNotificationStore();

const department = reactive({
  title: "",
  sub_status_ids: "",
});

const handleCreateDepartment = async () => {
  if(!department.title || department.sub_status_ids.length === 0){
    notification.show('Заполните все поля!', 'warning');
    return;
  };
  const data = await props.createDepartment(department);
  props.departments.push(data.department);
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Название отдела</h1>
      <Input
        id="add_department_title"
        type="text"
        v-model="department.title"
        placeholder="Название..."
      />
    </div>
    <div class="grid grid-cols-2 gap-6">
      <h1>Статусы для обработки</h1>
      <Select
        v-model="department.sub_status_ids"
        :options="subStatuses"
        value="id"
        label="name"
        multiple
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreateDepartment"
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