<script setup>
const props = defineProps({
  subStatus: {
    type: Number,
    required: true,
    default: 1
  },
  subStatuses: {
    type: Array,
    required: true
  },
  handleChangeSubStatus: {
    type: Function,
    required: true
  }
});
</script>

<template>
  <div class="flex flex-wrap items-center gap-2 bg-gray-50 p-4 rounded-lg">
    <div
      v-for="sS in subStatuses"
      :key="sS.id"
      :class="[
        'flex items-center gap-2 px-2 py-1 rounded-full text-[10px] font-medium cursor-pointer',
        +sS.id === +subStatus ? 'bg-sky-400' : '',
      ]"
      :style="{ 
        backgroundColor: +sS.id !== +subStatus ? `${sS.color}` : '',
      }"
      @click="handleChangeSubStatus(sS.id)"
    >
      <span>{{ sS.name }}</span>
      <span class="bg-white px-2 py-0.5 rounded-full text-[8px] font-bold">
        {{ sS.orders_count }}
      </span>
    </div>
  </div>
</template>