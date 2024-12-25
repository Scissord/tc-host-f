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
})
</script>

<template>
  <div>
    <Select
      class="w-[200px]"
      :modelValue="newSubStatus"
      @update:modelValue="handleChangeOrdersSubStatus"
      :options="subStatuses"
      :length="newSubStatusLength" 
      value="id"
      label="name"
    />
  </div>
</template>