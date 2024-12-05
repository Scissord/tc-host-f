<script setup>
import { onMounted, ref, reactive, watch } from 'vue';
import { useColumns } from '@hooks';

const optionsForColumns = [
  { value: false, label: 'Скрыть' },
  { value: true, label: 'Не скрывать' }
];

const { handleGetColumns, handleUpdateColumn } = useColumns();

const isDataLoaded = ref(true);
const columns = reactive([]);

const handleGetData = async () => {
  isDataLoaded.value = false;
  const [columnsData] = await Promise.all([
    handleGetColumns(),
  ]);
  columns.splice(
    0,
    columns.length,
    ...columnsData
  );
  isDataLoaded.value = true;
};

onMounted(async () => {
  await handleGetData();
});

const css = {
  label: 'w-1/2 font-semibold',
  input: 'w-1/2 text-xs p-1 rounded-sm'
};
</script>

<template>
  <div class="min-h-screen p-6 flex flex-col gap-6 text-xs">
    <div v-if="isDataLoaded" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-6">
      <div class="p-2 rounded-lg border border-slate-200 flex flex-col gap-3">
        <h1 class="text-lg font-bold">Скрытие полей</h1>
        <div
          v-for="column in columns"
          :key="column.id"
          class="flex items-center justify-between"
        >
          <p :class="css.label">{{ column.display_name.length > 20 ? column.display_name.slice(0, 20) : column.display_name }}</p>
          <select
            v-model="column.is_visible"
            :class="css.input"
            @change="() => handleUpdateColumn(column.id, { is_visible: column.is_visible })"
          >
            <option
              v-for="opt in optionsForColumns"
              :key="opt.value"
              :value="opt.value"
              class="text-sm"
            >
              {{ opt.label }}
            </option>
          </select>
        </div>
      </div>
      <p>2</p>
      <p>3</p>
      <p>4</p>
    </div>
    <div v-else class="min-h-screen flex items-center justify-center">
      <Loader/>
    </div>
  </div>
</template>
