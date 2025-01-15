<script setup>
import { DateFormat } from "@utils";

const props = defineProps({
  statistics: {
    type: Array,
    required: true,
    default: []
  },
})

const css = {
  th: 'text-center border border-slate-200 whitespace-nowrap',
  td: 'border border-slate-200 p-1 whitespace-nowrap'
};
</script>

<template>
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
          v-for="statistic in statistics"
          :key="statistic.day"
        >
          <td :class='css.td'>
            {{ statistic.label }}
          </td>
          <td :class='css.td'>
            {{ statistic.total }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[1].count }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[1].percent }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[1].percent }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[4].count }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[4].percent }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[2].count }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[2].percent }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[3].count }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[3].percent }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[5].count }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[5].percent }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[0].count }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[0].percent }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[6].count }}
          </td>
          <td :class='css.td'>
            {{ statistic.statuses[6].percent }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-center" v-if="statistics.length === 0">
    <p class="font-bold text-2xl">Статистика не найдена</p>
  </div>
</template>
