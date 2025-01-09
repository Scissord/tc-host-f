<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useDepartments } from '@hooks';
import DepartmentsTable from './blocks/DepartmentsTable.vue';
import DepartmentsHeader from './blocks/DepartmentsHeader.vue';

const router = useRouter();

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
});
</script>

<template>
  <div v-if="state.isDataLoaded" class="min-h-screen p-6 transition-all duration-300 ease-in-out ml-[5vw]">
    <DepartmentsHeader 
      :handleAddDepartment="handleAddDepartment"
    />
    <DepartmentsTable
      :departments="state.departments"
      :subStatuses="state.subStatuses"
      :handleEditDepartment="handleEditDepartment"
      :handleSaveDepartment="handleSaveDepartment"
      :handleDeleteDepartment="handleDeleteDepartment"
    />
  </div>
  
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader />
  </div>
</template>