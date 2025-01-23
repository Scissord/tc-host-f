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

      <!-- <Select
        v-if="state.tab === 0"
        v-model="state.group.id"
        @update:modelValue="(id, obj) => handleChangeGroup(obj.value)"
        :options="groups"
        value="id"
        label="label"
        class="w-[250px]"
      /> -->
    </div>

    <!-- <div class="flex items-center">
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
    </div> -->

    <!-- <div class="min-h-screen">
      <UserStatisticsTable
        :statistics="state.statistics"
      />
    </div> -->

    <div class="w-full overflow-x-auto">
      <table class="w-full border-collapse border border-slate-200">
        <thead>
          <tr>
            <th rowspan="2" :class="css.th"></th>
            <th rowspan="2" :class="css.th">Новых заказов</th>
            <th colspan="3" :class="[css.th, 'bg-green-100']">Принято</th>
            <th colspan="2" :class="[css.th, 'bg-red-100']">Отменено</th>
            <th colspan="2" :class="[css.th, 'bg-purple-100']">Отправлено</th>
            <th colspan="2" :class="[css.th, 'bg-green-400']">Выкуплено</th>
            <th colspan="2" :class="[css.th, 'bg-red-400']">Возвращено</th>
            <th colspan="2" :class="[css.th, 'bg-yellow-100']">Холд</th>
            <th colspan="2" :class="[css.th, 'bg-rose-100']">Спам</th>
            <th rowspan="2" :class="css.th">Ср. чек</th>
            <th rowspan="2" :class="css.th">Ср. чек отправки</th>
            <th rowspan="2" :class="css.th">Ср. чек выкупа</th>
          </tr>
          <tr>
            <th :class="css.th">Кол-во</th>
            <th :class="css.th">Апрув от общего числа</th>
            <th :class="css.th">Апрув от валида</th>
            <th :class="css.th">Кол-во</th>
            <th :class="css.th">%</th>
            <th :class="css.th">Кол-во</th>
            <th :class="css.th">%</th>
            <th :class="css.th">Кол-во</th>
            <th :class="css.th">%</th>
            <th :class="css.th">Кол-во</th>
            <th :class="css.th">%</th>
            <th :class="css.th">Кол-во</th>
            <th :class="css.th">%</th>
            <th :class="css.th">Кол-во</th>
            <th :class="css.th">%</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="([id, value], key) in Object.entries(state.statistics)"
            :key="key"
          >
            <td :class='css.td'>
              {{ value?.operatorName ?? '-' }}
            </td>
            <td :class='css.td'>
              {{ value?.totalOrders ?? '-' }}
            </td>
            <td :class='css.td'>
              {{ value?.acceptedOrders ?? '-' }}
            </td>
            <td :class='css.td'>
              {{ value?.approvedPercentage ?? '-' }}
            </td>
            <td :class='css.td'>
            </td>
            <td :class='css.td'>
              {{ value?.cancelledOrders ?? '-' }}
            </td>
            <td :class='css.td'>
              {{ value?.cancelledPercentage ?? '-' }}
            </td>
            <td :class='css.td'>
              {{ value?.shippedOrders ?? '-' }}
            </td>
            <td :class='css.td'>
              {{ value?.shippedPercentage ?? '-' }}
            </td>
            <td :class='css.td'>
              {{ value?.buyoutOrders ?? '-' }}
            </td>
            <td :class='css.td'>
              {{ value?.buyoutPercentage ?? '-' }}
            </td>
            <td :class='css.td'>
              {{ value?.refundedOrders ?? '-'}}
            </td>
            <td :class='css.td'>
            </td>
            <td :class='css.td'>
              {{ value?.holdOrders ?? '-'}}
            </td>
            <td :class='css.td'>
            </td>
            <td :class='css.td'>
              {{ value?.spamOrders ?? '-'}}
            </td>
            <td :class='css.td'>
            </td>
            <td :class='css.td'>
            </td>
            <td :class='css.td'>
            </td>
            <td :class='css.td'>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>
