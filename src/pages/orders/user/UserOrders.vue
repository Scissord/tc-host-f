<script setup>
import { onMounted } from 'vue';
import { useUserOrdersStore } from '@store';
import OrdersFilters from './blocks/OrdersFilters.vue';
import OrdersTable from './blocks/OrdersTable.vue';
import OrdersUnderTable from './blocks/OrdersUnderTable.vue';

const orders = useUserOrdersStore();

onMounted(async () => {
  await orders.handleGetData();
});
</script>

<template>
  <div v-if="orders.state.isDataLoaded" class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <h1 class="font-bold text-2xl">
      Управление заказами
    </h1>
    <div class="min-h-screen flex flex-col gap-6">
      <OrdersFilters
        :subStatus="orders.state.subStatus"
        :subStatuses="orders.state.subStatuses"
        :handleChangeSubStatus="orders.handleChangeSubStatus"
        :page="orders.state.page"
        :pages="orders.state.pages"
        :lastPage="orders.state.lastPage"
        :handleChangePage="orders.handleChangePage"
        :filters="orders.state.filters"
        :handleApplyFilters="orders.handleApplyFilters"
      />
      <OrdersTable
        :orders="orders.state.orders"
        :columns="orders.state.columns"
        :handleToggleOrder="orders.handleToggleOrder"
        :handleToggleOrders="orders.handleToggleOrders"
        :handleEntryOrder="orders.handleEntryOrder"
      />
      <OrdersUnderTable
        :newSubStatus="orders.state.newSubStatus"
        :newSubStatusLength="orders.state.newSubStatusLength"
        :subStatuses="orders.state.subStatuses"
        :handleChangeOrdersSubStatus="orders.handleChangeOrdersSubStatus"
      />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>
