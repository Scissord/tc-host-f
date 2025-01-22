<script setup>
import { onMounted } from 'vue';
import { useWebmasterStatistics } from '@hooks';
import { formatRange } from '@utils';
import WebmasterStatisticsTable from './blocks/WebmasterStatisticsTable.vue';
import WebmasterStatisticsTableByDate from './blocks/WebmasterStatisticsTableByDate.vue';

const { 
  state, 
  handleGetData,
} = useWebmasterStatistics();

onMounted(async () => {
  await handleGetData();
});
</script>

<template>
  <div v-if="state.isDataLoaded" class="ml-[5vw] min-h-screen p-6 text-xs flex flex-col gap-4">
    <h1 class="font-bold text-2xl">
      Статистика по конверсиям
    </h1>

    <div class="flex items-center gap-3">
      <DatePicker
        v-model="state.range"
        class="w-[250px] text-sm"
        locale="ru"
        :format="formatRange"
        @update:model-value="() => handleGetData()"
        auto-apply
        range
      />

      <!-- <Checkbox
        v-model="state.by_date"
        @update:modelValue="() => handleGetData()"
      />
      <p>По дате</p> -->
    </div>

    <div class="min-h-screen">
      <WebmasterStatisticsTable
        v-if="!state.by_date"
        :statistics="state.statistics"
      />
      <WebmasterStatisticsTableByDate
        v-else
        :statistics="state.statistics"
      />
    </div>

    <div class="min-h-screen">
  
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>
