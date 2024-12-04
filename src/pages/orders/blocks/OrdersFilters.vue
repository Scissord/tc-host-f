<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  status: [Number, null],
  statuses: Array,
  filters: Array,
  handleApplyFilters: Function
});

const isFiltersMenuOpen = ref(false);

const emit = defineEmits(['editStatus:status']);

const handleChangeStatus = (val) => {
  emit('editStatus:status', val.id);
};

const css = {
  label: 'font-semibold',
  input: 'text-sm p-1'
};

// watch(() => props.filters, (newVal) => console.log(newVal), { deep: true })
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
          status && sub.id === status ? 'bg-gray-300' : 'bg-gray-100',
        ]"
        @click="handleChangeStatus(sub)"
      >
        <p>{{ sub.name }}</p>
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-3">
    <Button
      text="Расширенный поиск"
      @click="isFiltersMenuOpen = !isFiltersMenuOpen"
    />
    <div
      v-if="isFiltersMenuOpen"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-3 bg-white border p-2 rounded-lg animate-fadeIn transition-opacity duration-500 ease-in-out"
    >
      <div
        v-for="filter in filters"
        :key="filter.id"
        class="flex flex-col gap-1"
      >
        <p :class="css.label">{{ filter.display_name.length > 20 ? filter.display_name.slice(0, 20) : filter.display_name }}</p>
        <Input
          :id="filter.id"
          type="text"
          v-model="filter.value"
          placeholder="..."
          :class="css.input"
        />
      </div>
    </div>
    <Button
      v-if="isFiltersMenuOpen"
      text="Применить"
      @click="handleApplyFilters(filters)"
    />
  </div>
</template>