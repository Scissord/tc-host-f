<script setup>
import { useRouter } from 'vue-router';

defineProps({
  operators: {
    type: Array,
    required: true,
    default: []
  },
  handleDeleteOperator: {
    type: Function,
    required: true
  },
});

const router = useRouter();

const css = {
  th: 'text-left border border-slate-200 p-1 whitespace-nowrap',
  td: 'border border-slate-200 p-1',
  icon: 'hover:text-gray-300 cursor-pointer',
};
</script>

<template>
  <div class="z-1 w-full">
    <table class="z-1 w-full border-collapse border border-slate-200 table-fixed">
      <thead>
        <tr>
          <th 
            :class="[css.th, 'w-[50px]']"
          >
          </th>
          <th 
            :class="[css.th, 'w-[50px]']"
          >
            ID
          </th>
          <th 
            :class="css.th"
          >
            Имя
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="operator in operators"
          :key="operator.id"
          class="bg-white z-1"
        >
          <td :class='css.td'>
            <div
              class="flex justify-center items-center space-x-2"
            >
              <Icon 
                :icon="['fas', 'trash']" 
                :class="css.icon"
                @click="handleDeleteOperator(operator.id)"
              />
            </div>
          </td>
          <td :class="[css.td, 'w-[50px]']">{{ operator.id ?? "-" }}</td>
          <td :class="css.td">{{ operator.name ?? '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-center" v-if="operators.length === 0">
    <p class="font-bold text-2xl">Операторы не найдены</p>
  </div>
</template>