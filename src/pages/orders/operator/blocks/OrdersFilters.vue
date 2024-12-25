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
});
</script>

<template>
  <OrderSubStatuses
    :subStatus="subStatus"
    :subStatuses="subStatuses"
    :handleChangeSubStatus="handleChangeSubStatus"
  />
  <Paginate
    :page="page"
    :pages="pages"
    :lastPage="lastPage"
    :handleChangePage="handleChangePage"
  />
</template>
