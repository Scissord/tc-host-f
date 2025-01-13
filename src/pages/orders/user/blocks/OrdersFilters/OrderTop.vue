<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
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

const isFiltersOpen = ref(false);

const groupedFilters = computed(() => {
  const chunkSize = 5;
  const result = [];

  for (let i = 0; i < props.filters.length; i += chunkSize) {
    result.push(props.filters.slice(i, i + chunkSize));
  }
  return result;
});
</script>

<template>
  <div class="flex items-center justify-between">
    <Button
      :icon="['fas', 'magnifying-glass']"
      text="Расширенный поиск"
      @click="isFiltersOpen = !isFiltersOpen"
    />
    <Paginate
      :page="page"
      :pages="pages"
      :lastPage="lastPage"
      :handleChangePage="handleChangePage"
    />
  </div>
  <div v-if="isFiltersOpen" class="grid grid-cols-5 gap-6 animate-fadeIn">
    <div
      v-for="(filterGroup, index) in groupedFilters"
      :key="index"
      class="flex flex-col gap-3 border p-2 rounded-lg"
    >
      <div 
        v-for="filter in filterGroup" 
        :key="filter.id"
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filter.label }}</p>
        <Input
          :id="filter.id"
          type="text"
          v-model="filter.value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
    </div>
  </div>
  <Button
    v-if="isFiltersOpen"
    :icon="['fas', 'check']"
    text="Применить"
    @click="handleApplyFilters"
  />
</template>
