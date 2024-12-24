<script setup>
import { onMounted } from 'vue';
import { useDepartments } from '@hooks';
import DepartmentsTable from './blocks/DepartmentsTable.vue';

const { 
  state,
  handleAddDepartment,
  handleEditDepartment,
  handleSaveDepartment,
  handleDeleteDepartment,
  handleGetData
} = useDepartments();

onMounted(async () => {
  await handleGetData();
})
</script>

<template>
  <div v-if="state.isDataLoaded" class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">
        Отделы
      </h1>
      <Button 
        text="Добавить"
        @click="handleAddDepartment"
      />
    </div>
    <div class="min-h-screen flex flex-col gap-6">
      <DepartmentsTable
        :departments="state.departments"
        :subStatuses="state.subStatuses"
        :handleEditDepartment="handleEditDepartment"
        :handleSaveDepartment="handleSaveDepartment"
        :handleDeleteDepartment="handleDeleteDepartment"
      />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>
