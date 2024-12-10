<script setup>
import { watch } from 'vue';

const props = defineProps({
  statistic: Object
});

// watch(
//   () => props.statistic,
//   (newVal) => console.log(newVal),
//   { deep: true }
// );

const css = {
  th: 'text-left border border-slate-200 p-1 whitespace-nowrap',
  td: 'border border-slate-200 p-1 whitespace-nowrap'
};
</script>

<template>
  <div class="w-full overflow-x-auto">
    <table class="w-full border-collapse border border-slate-200">
      <thead>
        <tr>
          <th :class="css.th">Оператор</th>
          <th 
            v-for="(status, key) in statistic.operator_stats[0].statuses" 
            :key="key"
            :class="[
              css.th, 
              key === 'Обработка' && 'bg-yellow-100',
              key === 'Принят' && 'bg-green-100',
              key === 'Отменен' && 'bg-red-100',
              key === 'Отправлен' && 'bg-violet-100',
              key === 'Возврат' && 'bg-red-400',
              key === 'Спам' && 'bg-red-200',
              key === 'Оплачен' && 'bg-green-400',
            ]"  
          >
            {{ key }}
          </th>
          <th :class="css.th">Итого</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td :class="css.td">{{ statistic.operator_stats[0].operator_name }}</td>
          <td :class="css.td" v-for="(status, key) in statistic.operator_stats[0].statuses" :key="key">
            {{ status }}
          </td>
          <td :class="css.td">{{ statistic.total_orders }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
