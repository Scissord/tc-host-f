<script setup>
import { onMounted } from 'vue';
import { useCities } from '@hooks';
import CitiesTable from './blocks/CitiesTable.vue';

const { 
  state,
  handleAddCity,
  handleEditCity,
  handleSaveCity,
  handleDeleteCity,
  handleGetData
} = useCities();

onMounted(async () => {
  await handleGetData();
})
</script>

<template>
  <div v-if="state.isDataLoaded" class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">
        Города
      </h1>
      <Button 
        text="Добавить"
        @click="handleAddCity"
      />
    </div>
    <div class="min-h-screen flex flex-col gap-6">
      <CitiesTable
        :cities="state.cities"
        :handleEditCity="handleEditCity"
        :handleSaveCity="handleSaveCity"
        :handleDeleteCity="handleDeleteCity"
      />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>