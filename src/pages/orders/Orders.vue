<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useOrder, useStatus } from '@hooks';
import OrdersStatuses from './blocks/OrdersStatuses.vue';
import OrdersTable from './blocks/OrdersTable.vue';

const { handleGetOrders } = useOrder();
const { handleGetStatuses } = useStatus()

const status = ref(null);

const statuses = reactive([]);

const orders = reactive({});

const handleChangeStatus = (val) => {
  status.value = val;
};
// orders
onMounted(async () => {
  const data = await handleGetOrders();
  Object.assign(orders, data);
});
// statuses
onMounted(async () => {
  const data = await handleGetStatuses();
  console.log(data);
  statuses.splice(0, statuses.length, ...data);
});
</script>

<template>
  <div class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <OrdersStatuses
      :status="status"
      :statuses="statuses"
      @editStatus:status="handleChangeStatus"
    />
    <OrdersTable
      v-if="Object.keys(orders).length > 0"
      :orders="orders"
    />
  </div>
</template>