<script setup>
import { onMounted } from 'vue';
import { useOperatorStatistics } from '@hooks';
import OperatorStatisticsTable from './blocks/OperatorStatisticsTable.vue';

const { 
  state, 
  handleGetData,
} = useOperatorStatistics();

onMounted(async () => {
  await handleGetData();
});
</script>

<template>
  <div v-if="state.isDataLoaded" class="ml-[5vw] min-h-screen p-6 text-xs flex flex-col gap-4">
    <h1 class="font-bold text-2xl">
      Статистика по конверсиям
    </h1>

    <div class="min-h-screen">
      <OperatorStatisticsTable
        :statistics="state.statistics"
      />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>
