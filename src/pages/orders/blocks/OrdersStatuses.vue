<script setup>
defineProps({
  status: [Number, null],
  statuses: Array,
});

const emit = defineEmits()

const handleChangeStatus = (val) => {
  emit('editStatus:status', val.id);
};
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <div
      v-for="s in statuses"
      :key="s.id"
      class="flex items-center gap-3"
    >
      <div
        v-for="sub in s.sub_statuses"
        :key="sub.id"
        :class="[
          'px-3 py-2 rounded-lg select-none cursor-pointer hover:bg-gray-300 transition duration-200 transform active:scale-90 transform-origin-center inline-block uppercase',
          sub.id === status ? 'bg-gray-300' : 'bg-gray-100',
        ]"
        @click="handleChangeStatus(sub)"
      >
        <p>{{ sub.name }}</p>
      </div>
    </div>
  </div>
</template>