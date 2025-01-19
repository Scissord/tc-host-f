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
</script>

<template>
  <div class="flex items-center justify-between">
    <Button
      :icon="['fas', 'magnifying-glass']"
      text="Расширенный поиск"
      class="bg-white text-black border font-bold"
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
      class="flex flex-col gap-3 border p-2 rounded-lg"
    >
      <!-- ID -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[0].label }}</p>
        <Input
          :id="filters[0].id"
          type="text"
          v-model="filters[0].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[1].label }}</p>
        <Input
          :id="filters[1].id"
          type="text"
          v-model="filters[1].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[2].label }}</p>
        <Input
          :id="filters[2].id"
          type="text"
          v-model="filters[2].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[5].label }}</p>
        <Input
          :id="filters[5].id"
          type="text"
          v-model="filters[5].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[6].label }}</p>
        <Input
          :id="filters[6].id"
          type="text"
          v-model="filters[6].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
    </div>
    <div
      class="flex flex-col gap-3 border p-2 rounded-lg"
    >
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[7].label }}</p>
        <Input
          :id="filters[7].id"
          type="text"
          v-model="filters[7].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[8].label }}</p>
        <Input
          :id="filters[8].id"
          type="text"
          v-model="filters[8].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[9].label }}</p>
        <Input
          :id="filters[9].id"
          type="text"
          v-model="filters[9].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[10].label }}</p>
        <Input
          :id="filters[10].id"
          type="text"
          v-model="filters[10].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[11].label }}</p>
        <Input
          :id="filters[11].id"
          type="text"
          v-model="filters[11].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
    </div>
    <div
      class="flex flex-col gap-3 border p-2 rounded-lg"
    >
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[12].label }}</p>
        <Input
          :id="filters[12].id"
          type="text"
          v-model="filters[12].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[13].label }}</p>
        <Input
          :id="filters[13].id"
          type="text"
          v-model="filters[13].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[14].label }}</p>
        <Input
          :id="filters[14].id"
          type="text"
          v-model="filters[14].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[15].label }}</p>
        <Input
          :id="filters[15].id"
          type="text"
          v-model="filters[15].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[16].label }}</p>
        <Input
          :id="filters[16].id"
          type="text"
          v-model="filters[16].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
    </div>
    <div
      class="flex flex-col gap-3 border p-2 rounded-lg"
    >
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[17].label }}</p>
        <Input
          :id="filters[17].id"
          type="text"
          v-model="filters[17].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[18].label }}</p>
        <Input
          :id="filters[18].id"
          type="text"
          v-model="filters[18].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[19].label }}</p>
        <Input
          :id="filters[19].id"
          type="text"
          v-model="filters[19].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[20].label }}</p>
        <Input
          :id="filters[20].id"
          type="text"
          v-model="filters[20].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[21].label }}</p>
        <Input
          :id="filters[21].id"
          type="text"
          v-model="filters[21].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
    </div>
    <div
      class="flex flex-col gap-3 border p-2 rounded-lg"
    >
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[22].label }}</p>
        <Input
          :id="filters[22].id"
          type="text"
          v-model="filters[22].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[23].label }}</p>
        <Input
          :id="filters[23].id"
          type="text"
          v-model="filters[23].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[25].label }}</p>
        <Input
          :id="filters[25].id"
          type="text"
          v-model="filters[25].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[26].label }}</p>
        <Input
          :id="filters[26].id"
          type="text"
          v-model="filters[26].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[27].label }}</p>
        <Input
          :id="filters[27].id"
          type="text"
          v-model="filters[27].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
    </div>
    <div
      class="flex flex-col gap-3 border p-2 rounded-lg"
    >
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[28].label }}</p>
        <Input
          :id="filters[28].id"
          type="text"
          v-model="filters[28].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[29].label }}</p>
        <Input
          :id="filters[29].id"
          type="text"
          v-model="filters[29].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[32].label }}</p>
        <Input
          :id="filters[32].id"
          type="text"
          v-model="filters[32].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[33].label }}</p>
        <Input
          :id="filters[33].id"
          type="text"
          v-model="filters[33].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[35].label }}</p>
        <Input
          :id="filters[35].id"
          type="text"
          v-model="filters[35].value"
          placeholder="..."
          class="p-1 pl-2 text-xs"
        />
      </div>
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[36].label }}</p>
        <Input
          :id="filters[36].id"
          type="text"
          v-model="filters[36].value"
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
