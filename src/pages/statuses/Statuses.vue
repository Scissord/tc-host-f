<script setup>
import { onMounted } from 'vue';
import { useStatus } from '@hooks';
import StatusesTable from './blocks/StatusesTable.vue';

const { 
  state,
  handleAddStatus,
  handleEditStatus,
  handleSaveStatus,
  handleDeleteStatus,
  handleGetData 
} = useStatus();

onMounted(async () => {
  await handleGetData();
});
</script>

<template>
  <div v-if="state.isDataLoaded" class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">
        Статусы
      </h1>
      <Button 
        text="Добавить"
        @click="handleAddStatus"
      />
    </div>
    <div class="min-h-screen flex flex-col gap-6">
      <StatusesTable
        :statuses="state.statuses"
        :handleEditStatus="handleEditStatus"
        :handleSaveStatus="handleSaveStatus"
        :handleDeleteStatus="handleDeleteStatus"
      />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>
