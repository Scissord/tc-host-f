<script setup>
import { onMounted } from 'vue';
import { useUserStatistics } from '@hooks';
import { formatRange } from '@utils';
import UserStatisticsTable from './blocks/UserStatisticsTable.vue';

const { 
  groups,
  state, 
  handleChangeGroup,
  handleChangeTab,
  handleGetData,
  css,
} = useUserStatistics();

onMounted(async () => {
  await handleGetData();
});
</script>

<template>
  <div v-if="state.isDataLoaded" class="ml-[5vw] min-h-screen p-6 flex flex-col gap-6 text-xs">
    <h1 class="font-bold text-2xl">
      Статистика по конверсиям
    </h1>

    <div class="flex items-center gap-6">
      <DatePicker
        v-model="state.range"
        class="w-[250px] text-sm"
        locale="ru"
        :format="formatRange"
        @update:model-value="() => handleGetData()"
        auto-apply
        range
      />

      <Select
        v-if="state.tab === 0"
        v-model="state.group.id"
        @update:modelValue="(id, obj) => handleChangeGroup(obj.value)"
        :options="groups"
        value="id"
        label="label"
        class="w-[250px]"
      />
    </div>

    <div class="flex items-center">
      <div
        :class="[css.defaultTab, state.tab === 0 ? css.activeTab : css.disabledTab]"
        @click="handleChangeTab(0)"
      >
        Общая
      </div>

      <div
        :class="[css.defaultTab, state.tab === 1 ? css.activeTab : css.disabledTab]"
        @click="handleChangeTab(1)"
      >
        По вебмастерам
      </div>

      <div
        :class="[css.defaultTab, state.tab === 2 ? css.activeTab : css.disabledTab]"
        @click="handleChangeTab(2)"
      >
        По операторам
      </div>

      <div
        class="h-8 border-b w-full"
      >
      </div>
    </div>

    <div class="min-h-screen">
      <UserStatisticsTable
        :statistics="state.statistics"
      />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>
