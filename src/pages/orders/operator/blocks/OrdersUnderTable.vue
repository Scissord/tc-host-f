<script setup>
defineProps({
  newSubStatus: {
    type: Number,
    required: true,
    default: 1
  },
  subStatuses: {
    type: Array,
    required: true,
    default: []
  },
  handleChangeOrdersSubStatus: {
    type: Function,
    required: true
  },
  newSubStatusLength: {
    type: [String, Number],
    required: true,
    default: 0
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
})
</script>

<template>
  <div class="flex items-center justify-between">
    <Select
      class="w-[200px]"
      :modelValue="newSubStatus"
      @update:modelValue="handleChangeOrdersSubStatus"
      :options="subStatuses"
      :length="newSubStatusLength" 
      value="id"
      label="name"
    />

    <Paginate
      :page="page"
      :pages="pages"
      :lastPage="lastPage"
      :handleChangePage="handleChangePage"
    />
  </div>
</template>