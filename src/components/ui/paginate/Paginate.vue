<script setup>
defineProps({
  page: {
    type: Number,
    required: false,
    default: 1
  },
  pages: {
    type: Array,
    required: true,
    default: []
  },
  lastPage: {
    type: [Number, null],
    required: true,
    default: null
  },
  handleChangePage: {
    type: Function,
    required: true
  },
})
</script>

<template>
  <div class="min-w-[150px] max-w-[220px] flex items-center justify-between gap-3">
    <div class="flex items-center justify-between gap-3 w-[50%]">
      <p
        v-for="p in pages"
        :key="p"
        :class="['select-none cursor-pointer transition duration-300 ease border-blue-900', +page === +p ? 'border-b' : '']"
        @click="handleChangePage(p)"
      >
        {{ p }}
      </p>
      <p class="select-none">...</p>
      <p
        class="cursor-pointer select-none"
        @click="handleChangePage(lastPage)"
      >
        {{ lastPage }}
      </p>
    </div>
    <div class="ml-auto flex items-center gap-3">
      <Button
        :icon="['fas', 'chevron-left']"
        class="py-2 px-3 rounded-full"
        iconSize="text-[8px]"
        @click="handleChangePage(1)"
      />
      <Button
        :icon="['fas', 'chevron-right']"
        class="py-2 px-3 rounded-full"
        iconSize="text-[8px]"
        @click="handleChangePage(lastPage)"
      />
    </div>

  </div>
</template>
