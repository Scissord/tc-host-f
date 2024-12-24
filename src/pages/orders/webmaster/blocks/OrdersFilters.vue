<script setup>
defineProps({
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
  <Paginate
    :page="page"
    :pages="pages"
    :lastPage="lastPage"
    :handleChangePage="handleChangePage"
  />
</template>
