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
  }
})
</script>

<template>
  <div>
    <Select
      class="w-[200px]"
      :modelValue="newSubStatus"
      @update:modelValue="handleChangeOrdersSubStatus"
      :options="subStatuses"
      value="id"
      label="name"
    />
  </div>
</template>