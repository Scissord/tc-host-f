<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLogApi } from '@api';

const { getOrderLogs } = useLogApi();

const route = useRoute();
const order_id = route.params.order_id;

const state = reactive({
  logs : []
});

const handleGetData = async () => {
  const data = await getOrderLogs(order_id);
  state.logs = data.logs;
};

onMounted(async () => {
  await handleGetData();
});

const css = {
  th: 'text-left p-4 whitespace-nowrap',
  td: 'p-4 whitespace-nowrap',
};
</script>

<template>
  <div class="min-h-screen p-6 transition-all duration-300 ease-in-out ml-[5vw]">
    <div class="w-full min-h-[50vh] overflow-x-auto bg-gray-50 p-4 rounded-lg">
      <table class="w-full border border-slate-200 table-auto text-xs font-medium">
        <thead class="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
          <tr>
            <th 
              :class='css.th'
            >
              ID
            </th>
            <th 
              :class='css.th'
            >
              ID заказа
            </th>
            <th 
              :class='css.th'
            >
              Оператор
            </th>
            <th 
              :class='css.th'
            >
              Предыдущий статус
            </th>
            <th 
              :class='css.th'
            >
              Новый статус
            </th>
            <th 
              :class='css.th'
            >
              Действие
            </th>
            <th 
              :class='css.th'
            >
              IP
            </th>
            <th 
              :class='css.th'
            >
              Дата
            </th>
            <th 
              :class='css.th'
            >
              Старая информация
            </th>
            <th 
              :class='css.th'
            >
              Обновленная информация
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="log in state.logs"
            :key="log.id"
            class="border-b transition duration-300 ease bg-white hover:bg-gray-50"
          >
            <td :class='css.td'>{{ log.id ?? '-' }}</td>
            <td :class='css.td'>{{ log.order_id ?? '-' }}</td>
            <td :class='css.td'>{{ log.operator_id ?? '-' }}</td>
            <td :class='css.td'>{{ log.old_status_id ?? '-' }}</td>
            <td :class='css.td'>{{ log.new_status_id ?? '-' }}</td>
            <td :class='css.td'>{{ log.action ?? '-' }}</td>
            <td :class='css.td'>{{ log.ip ?? '-' }}</td>
            <td :class='css.td'>{{ log.created_at ?? '-' }}</td>
            <td :class='css.td'>{{ log.old_metadata ?? '-' }}</td>
            <td :class='css.td'>{{ log.new_metadata ?? '-' }}</td>
          </tr>
          <div class="flex items-center justify-center" v-if="state.logs.length === 0">
            <p class="font-bold text-2xl">Логи не найдены</p>
          </div>
        </tbody>
      </table>
    </div>

  </div>
</template>