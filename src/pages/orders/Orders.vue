<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useOrder, useStatus, useColumns } from '@hooks';
import OrdersFilters from './blocks/OrdersFilters.vue';
import OrdersTable from './blocks/OrdersTable.vue';

const { handleGetOrders } = useOrder();
const { handleGetColumns } = useColumns();
const { handleGetStatuses } = useStatus()

const status = ref(null);
const statuses = reactive([]);
const columns = reactive([]);
const filters = reactive({
  order_id: null,
  operator: null,
  product: null,
  webmaster: null,
  fio: null,
  region: null,
  city: null,
  address: null,
  comment: null,
  postIndex: null,
  additional1: null,
  additional2: null,
  additional3: null,
  additional4: null,
  additional7: null,
  additional8: null,
  additional12: null,
});

const orders = reactive({});

const handleChangeStatus = (val) => {
  status.value = val;
};

onMounted(async () => {
  const [ordersData, statusesData, columnsData] = await Promise.all([
    handleGetOrders(),
    handleGetStatuses(),
    handleGetColumns(),
  ]);

  Object.assign(orders, ordersData.orders);
  statuses.splice(0, statuses.length, ...statusesData);
  columns.splice(0, columns.length, ...columnsData)
});
</script>

<template>
  <div class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <OrdersFilters
      :status="status"
      :statuses="statuses"
      :filters="filters"
      :columns="columns"
      @editStatus:status="handleChangeStatus"
    />
    <OrdersTable
      v-if="Object.keys(orders).length > 0"
      :columns="columns"
      :orders="orders"
    />
  </div>
</template>