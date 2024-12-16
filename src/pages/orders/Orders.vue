<script setup>
import { useOrder } from '@hooks';
import OrdersFilters from './blocks/OrdersFilters.vue';
import OrdersTable from './blocks/OrdersTable.vue';
import OrdersUnderTable from './blocks/OrdersUnderTable.vue';

const { 
  orderState,
  handleChangeSubStatus,
  handleChangePage,
  handleApplyFilters,
  handleToggleOrders,
  handleChangeOrdersSubStatus
} = useOrder();
</script>

<template>
  <div class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <h1 class="font-bold text-2xl">
      Управление заказами
    </h1>
    <div v-if="orderState.isDataLoaded" class="min-h-screen flex flex-col gap-6">
      <OrdersFilters
        :subStatus="orderState.subStatus"
        :subStatuses="orderState.subStatuses"
        :handleChangeSubStatus="handleChangeSubStatus"
        :page="orderState.page"
        :pages="orderState.pages"
        :lastPage="orderState.lastPage"
        :handleChangePage="handleChangePage"
        :filters="orderState.filters"
        :handleApplyFilters="handleApplyFilters"
      />
      <OrdersTable
        :orders="orderState.orders"
        :columns="orderState.columns"
        :handleToggleOrders="handleToggleOrders"
      />
      <OrdersUnderTable
        :newSubStatus="orderState.newSubStatus"
        :subStatuses="orderState.subStatuses"
        :handleChangeOrdersSubStatus="handleChangeOrdersSubStatus"
      />
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
      <Loader/>
    </div>
  </div>

</template>
