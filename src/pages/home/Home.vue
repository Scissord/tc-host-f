<!-- <script setup>
import { ref, onMounted, reactive } from 'vue';
import { useStatistic } from '@hooks';
import StatisticTable from './blocks/StatisticTable.vue';
import WebmasterTable from './blocks/WebmasterTable.vue';
import OperatorTable from './blocks/OperatorTable.vue'; 

const { 
  handleGetStatistic,
  handleGetStatisticForWebmaster,
  handleGetStatisticForOperator
} = useStatistic();

const date = ref();

const format = (newDate) => {
  const startDay = newDate[0].getDate();
  const startMonth = newDate[0].getMonth() + 1;
  const startYear = newDate[0].getFullYear();
  const startDate = `${startDay}.${startMonth}.${startYear}`

  const endDay = newDate[1].getDate();
  const endMonth = newDate[1].getMonth() + 1;
  const endYear = newDate[1].getFullYear();
  const endDate = `${endDay}.${endMonth}.${endYear}`

  return `${startDate} - ${endDate}`;
};

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 6));
  date.value = [startDate, endDate];
});

const isDataLoaded = ref(false);
const statistic = reactive({});

const formatRange = (date) => {
  const start = date.value[0];
  const startDay = String(start.getDate()).padStart(2, '0');
  const startMonth = String(start.getMonth() + 1).padStart(2, '0');
  const startYear = start.getFullYear();
  const startDate = `${startYear}-${startMonth}-${startDay}T00:00:00`;

  const end = date.value[1];
  const endDay = String(end.getDate()).padStart(2, '0');
  const endMonth = String(end.getMonth() + 1).padStart(2, '0');
  const endYear = end.getFullYear();
  const endDate = `${endYear}-${endMonth}-${endDay}T00:00:00`

  return {
    startDate,
    endDate
  }
};

const handleGetData = async () => {
  isDataLoaded.value = false;

  const {startDate, endDate} = formatRange(date);

  const [allStatistic] = await Promise.all([
    handleGetStatistic([
      {
        name: 'start_date',
        value: startDate
      },
      {
        name: 'end_date',
        value: endDate
      },
      {
        name: 'by_day',
        value: true
      }
    ]),
  ]);

  // console.log(allStatistic);

  // Object.assign(orders, ordersData.orders);
  isDataLoaded.value = true;
};

const handleGetWebmasterData = async () => {
  isDataLoaded.value = false;

  const {startDate, endDate} = formatRange(date);

  const [webMasterStatistic] = await Promise.all([
    handleGetStatisticForWebmaster([
      {
        name: 'start_date',
        value: startDate
      },
      {
        name: 'end_date',
        value: endDate
      },
      {
        name: 'by_day',
        value: false
      }
    ]),
  ]);

  // console.log(webMasterStatistic);

  Object.assign(statistic, webMasterStatistic);
  isDataLoaded.value = true;
};

const handleGetOperatorData = async () => {
  isDataLoaded.value = false;

  const {startDate, endDate} = formatRange(date);

  const [operatorStatistic] = await Promise.all([
    handleGetStatisticForOperator([
      {
        name: 'start_date',
        value: startDate
      },
      {
        name: 'end_date',
        value: endDate
      },
      {
        name: 'by_day',
        value: false
      }
    ]),
  ]);

  // console.log(operatorStatistic);

  Object.assign(statistic, operatorStatistic);
  isDataLoaded.value = true;
};

onMounted(async () => {
  // await handleGetData();
});

const tab = ref(0);

const handleChangeTab = async (val) => {
  tab.value = val;
  switch (val) {
    case 0: 
      await handleGetData();
      break;
    case 1:
      await handleGetWebmasterData();
      break;
    case 2:
      await handleGetOperatorData();
      break;
    default:
      await handleGetData();
      break;
  }
};

const css = {
  defaultTab: 'h-8 cursor-pointer select-none p-2 whitespace-nowrap',
  activeTab: 'border-t border-l border-r rounded-t-md',
  disabledTab: 'border-b'
};
</script>

<template>
  <div class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <h1 class="font-bold text-2xl">
      Статистика по конверсиям
    </h1>

    <div class="flex items-center gap-6">
      <DatePicker
        v-model="date"
        class="w-fit text-sm"
        locale="ru"
        :format="format"
        auto-apply
        range
      />
    </div>

    <div class="flex items-center">
      <div
        :class="[css.defaultTab, tab === 0 ? css.activeTab : css.disabledTab]"
        @click="handleChangeTab(0)"
      >
        Общая
      </div>

      <div
        :class="[css.defaultTab, tab === 1 ? css.activeTab : css.disabledTab]"
        @click="handleChangeTab(1)"
      >
        По вебмастерам
      </div>

      <div
        :class="[css.defaultTab, tab === 2 ? css.activeTab : css.disabledTab]"
        @click="handleChangeTab(2)"
      >
        По операторам
      </div>

      <div
        :class="['h-8 border-b w-full']"
      >
      </div>
    </div>

    <div v-if="isDataLoaded" class="min-h-screen">
      <StatisticTable 
        v-if="tab === 0"
        :statistic="statistic"
      />
      <WebmasterTable 
        v-if="tab === 1"
        :statistic="statistic"
      />
      <OperatorTable 
        v-if="tab === 2"
        :statistic="statistic"
      />
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
      <Loader/>
    </div>
  </div>
</template> -->

<script setup>

</script>

<template>
  <div>
    Home
  </div>
</template>
