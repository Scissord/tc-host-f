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
  <div class="flex flex-wrap items-center gap-2">
    <div
      v-for="sS in subStatuses"
      :key="sS.id"
      :class="[
        'flex items-center gap-1 border p-1 rounded-sm select-none cursor-pointer transition duration-200 transform active:scale-90 transform-origin-center uppercase',
        +sS.id === +subStatus ? 'bg-sky-400 text-white' : `bg-[${sS.color}]`,
      ]"
      :style="{ 
        // backgroundColor: +sS.id !== +subStatus ? sS.color : '',
      }"
      @click="handleChangeSubStatus(sS.id)"
    >
      <p>{{ sS.name }}</p>
      <p>({{ sS.orders_count }})</p>
    </div>
  </div>
</template>