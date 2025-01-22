<script setup>
import OrderSubStatuses from './OrdersFilters/OrderSubStatuses.vue';
import OrderTop from './OrdersFilters/OrderTop.vue'; 

defineProps({
  subStatus: {
    type: Number,
    required: true,
    default: 1
  },
  subStatuses: {
    type: Array,
    required: true,
    default: []
  },
  operators: {
    type: Array,
    required: true,
    default: []
  },
  webmasters: {
    type: Array,
    required: true,
    default: []
  },
  products: {
    type: Array,
    required: true,
    default: []
  },
  cities: {
    type: Array,
    required: true,
    default: []
  },
  paymentMethods: {
    type: Array,
    required: true,
    default: []
  },
  deliveryMethods: {
    type: Array,
    required: true,
    default: []
  },
  orderCancelReasons: {
    type: Array,
    required: true,
    default: []
  },
  handleChangeSubStatus: {
    type: Function,
    required: true
  },
  page: {
    type: Number,
    required: true,
    default: 1,
  },
  pages: {
    type: Array,
    required: true,
    default: []
  },
  lastPage: {
    type: [Number, null],
    required: true,
    default: null,
  },
  handleChangePage: {
    type: Function,
    required: true
  },
  filters: {
    type: Array,
    required: true,
    default: null,
  },
  handleApplyFilters: {
    type: Function,
    required: true
  },
});
</script>

<template>
  <OrderSubStatuses
    :subStatus="subStatus"
    :subStatuses="subStatuses"
    :handleChangeSubStatus="handleChangeSubStatus"
  />
  <OrderTop
    :page="page"
    :pages="pages"
    :lastPage="lastPage"
    :handleChangePage="handleChangePage"
    :filters="filters"
    :operators="operators"
    :webmasters="webmasters"
    :products="products"
    :cities="cities"
    :subStatuses="subStatuses"
    :paymentMethods="paymentMethods"
    :deliveryMethods="deliveryMethods"
    :orderCancelReasons="orderCancelReasons"
    :handleApplyFilters="handleApplyFilters"
  />
</template>
