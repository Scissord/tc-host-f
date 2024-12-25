<script setup>
import { onMounted } from 'vue';
import { useUserStore, useWebmasterOrdersStore } from '@store';
import OrdersFilters from './blocks/OrdersFilters.vue';
import OrdersTable from './blocks/OrdersTable.vue';

const user = useUserStore()
const orders = useWebmasterOrdersStore();

onMounted(async () => {
  await orders.handleGetData();
});
</script>

<template>
  <div v-if="orders.state.isDataLoaded" class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <h1 v-if="user.data" class="font-bold text-2xl">
      Заказы вебмастера {{ user.data.webmaster_id }}
    </h1>
    <div class="min-h-screen flex flex-col gap-6">
      <OrdersFilters
        :page="orders.state.page"
        :pages="orders.state.pages"
        :lastPage="orders.state.lastPage"
        :handleChangePage="orders.handleChangePage"
      />
      <OrdersTable
        :orders="orders.state.orders"
        :columns="orders.state.columns"
      />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>
