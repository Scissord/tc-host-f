<script setup>
import { onMounted, h } from 'vue';
import { useOperatorOrdersStore, useModalStore } from '@store';
import { useOrderApi } from '@api';
import OrdersFilters from './blocks/OrdersFilters.vue';
import OrdersTable from './blocks/OrdersTable.vue';
import OrdersUnderTable from './blocks/OrdersUnderTable.vue';
import AddOrderModal from '../AddOrderModal.vue';

const modal = useModalStore();
const orders = useOperatorOrdersStore();

const { createOrder } = useOrderApi();

const openCreateOrderModal = async () => {
  modal.show({
    title: 'Добавление заказа',
    children: h(AddOrderModal, { 
      createOrder, 
      changeState: orders.handleChangeStateAfterAddOrder,
      orders: orders.state.orders, 
    }),
  })
};

onMounted(async () => {
  await orders.handleGetData();
});
</script>

<template>
  <div class="min-h-screen p-6 transition-all duration-300 ease-in-out ml-[5vw]">
    <div v-if="orders.state.isDataLoaded" class="flex flex-col gap-6 text-xs">
      <div class="flex items-center justify-between">
        <h1 class="font-bold text-2xl">
          Управление заказами
        </h1>
        <Button
          text='Создать'
          @click='openCreateOrderModal'
        />
      </div>
      <div class="min-h-screen flex flex-col gap-6">
        <OrdersFilters
          :subStatus="orders.state.subStatus"
          :subStatuses="orders.state.operatorSubStatuses"
          :handleChangeSubStatus="orders.handleChangeSubStatus"
          :page="orders.state.page"
          :pages="orders.state.pages"
          :lastPage="orders.state.lastPage"
          :handleChangePage="orders.handleChangePage"
          :filters="orders.state.filters"
          :operators="orders.state.operators"
          :products="orders.state.products"
          :cities="orders.state.cities"
          :defaultSubStatuses="orders.state.subStatuses"
          :paymentMethods="orders.state.paymentMethods"
          :deliveryMethods="orders.state.deliveryMethods"
          :orderCancelReasons="orders.state.orderCancelReasons"
          :handleApplyFilters="orders.handleApplyFilters"
        />
        <OrdersTable
          :orders="orders.state.orders"
          :columns="orders.state.columns"
          :sort_by="orders.state.sort_by"
          :handleChangeSelectSort="orders.handleChangeSelectSort"
          :handleChangeDateSort="orders.handleChangeDateSort"
          :handleToggleDoubles="orders.handleToggleDoubles"
          :handleToggleOrder="orders.handleToggleOrder"
          :handleToggleOrders="orders.handleToggleOrders"
          :handleEntryOrder="orders.handleEntryOrder"
          :handleMiddleClick="orders.handleMiddleClick"
          :handleHistoryClick="orders.handleHistoryClick"
        />
        <OrdersUnderTable
          :excel_loading="orders.state.excel_loading"
          :page="orders.state.page"
          :pages="orders.state.pages"
          :lastPage="orders.state.lastPage"
          :handleChangePage="orders.handleChangePage"
          :subStatus="orders.state.subStatus"
          :newSubStatus="orders.state.newSubStatus"
          :newSubStatusLength="orders.state.newSubStatusLength"
          :subStatuses="orders.state.subStatuses"
          :handleSendKet="orders.handleSendKet"
          :handleUnloadOrder="orders.handleUnloadOrder"
          :handleChangeOrdersSubStatus="orders.handleChangeOrdersSubStatus"
        />
      </div>
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
      <Loader/>
    </div>
  </div>
</template>
