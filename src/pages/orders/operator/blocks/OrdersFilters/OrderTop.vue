<script setup>
import { ref } from 'vue';
import { formatRange } from '@utils';

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
  operators: {
    type: Array,
    required: true,
    default: []
  },
  products: {
    type: Array,
    required: true,
    default: []
  },
  cities: {
    type: Array,
    required: true,
    default: []
  },
  subStatuses: {
    type: Array,
    required: true,
    default: []
  },
  paymentMethods: {
    type: Array,
    required: true,
    default: []
  },
  deliveryMethods: {
    type: Array,
    required: true,
    default: []
  },
  orderCancelReasons: {
    type: Array,
    required: true,
    default: []
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
const customPosition = (el) => ({ top: 10, left: 0 });
const updateRange = (range, index) => {
  if (range && range.length === 2) {
    const [start, end] = range;

    const formatDateWithoutTimezone = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    };

    const adjustedStart = new Date(start);
    adjustedStart.setHours(0, 0, 0, 0);

    const adjustedEnd = new Date(end);
    adjustedEnd.setHours(23, 59, 59, 999);

    props.filters[index].value = [
      formatDateWithoutTimezone(adjustedStart),
      formatDateWithoutTimezone(adjustedEnd),
    ];
  } else {
    props.filters[index].value = null;
  };
};
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
      <!-- Операторы -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[1].label }}</p>
        <MultiSelect 
          v-model="filters[1].value" 
          display="chip" 
          :options="operators" 
          optionLabel="name" 
          filter 
          placeholder="Выберите"
          class="w-full" 
        />
      </div>
      <!-- Товары -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[2].label }}</p>
        <MultiSelect 
          v-model="filters[2].value" 
          display="chip" 
          :options="products" 
          optionLabel="name" 
          filter 
          placeholder="Выберите"
          class="w-full" 
        />
      </div>
      <!-- Дата -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[5].label }}</p>
        <DatePicker
          v-model="filters[5].value"
          class="w-full text-xs"
          locale="ru"
          auto-apply
          range
          :format="formatRange"
          :alt-position="customPosition"
          :enable-time-picker="false"
          @update:model-value="(date) => updateRange(date, 5)"
        />
      </div>
      <!-- Последнее изменение -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[6].label }}</p>
        <DatePicker
          v-model="filters[6].value"
          class="w-full text-xs"
          locale="ru"
          auto-apply
          range
          :format="formatRange"
          :alt-position="customPosition"
          :enable-time-picker="false"
          @update:model-value="(date) => updateRange(date, 6)"
        />
      </div>
    </div>
    <div
      class="flex flex-col gap-3 border p-2 rounded-lg"
    >
      <!-- Дата апрува -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[7].label }}</p>
        <DatePicker
          v-model="filters[7].value"
          class="w-full text-xs"
          locale="ru"
          auto-apply
          range
          :format="formatRange"
          :alt-position="customPosition"
          :enable-time-picker="false"
          @update:model-value="(date) => updateRange(date, 7)"
        />
      </div>
      <!-- Дата отправки -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[8].label }}</p>
        <DatePicker
          v-model="filters[8].value"
          class="w-full text-xs"
          locale="ru"
          auto-apply
          range
          :format="formatRange"
          :alt-position="customPosition"
          :enable-time-picker="false"
          @update:model-value="(date) => updateRange(date, 8)"
        />
      </div>
      <!-- Дата отмены -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[9].label }}</p>
        <DatePicker
          v-model="filters[9].value"
          class="w-full text-xs"
          locale="ru"
          auto-apply
          range
          :format="formatRange"
          :alt-position="customPosition"
          :enable-time-picker="false"
          @update:model-value="(date) => updateRange(date, 9)"
        />
      </div>
      <!-- Дата выкупа -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[10].label }}</p>
        <DatePicker
          v-model="filters[10].value"
          class="w-full text-xs"
          locale="ru"
          auto-apply
          range
          :format="formatRange"
          :alt-position="customPosition"
          :enable-time-picker="false"
          @update:model-value="(date) => updateRange(date, 10)"
        />
      </div>
      <!-- Дата доставки -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[11].label }}</p>
        <DatePicker
          v-model="filters[11].value"
          class="w-full text-xs"
          locale="ru"
          auto-apply
          range
          :format="formatRange"
          :alt-position="customPosition"
          :enable-time-picker="false"
          @update:model-value="(date) => updateRange(date, 11)"
        />
      </div>
    </div>
    <div
      class="flex flex-col gap-3 border p-2 rounded-lg"
    >
      <!-- Коммент -->
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
      <!-- Цена -->
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
      <!-- Итого -->
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
      <!-- Время перезвона -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[15].label }}</p>
        <DatePicker
          v-model="filters[15].value"
          class="w-full text-xs"
          locale="ru"
          auto-apply
          range
          :format="formatRange"
          :alt-position="customPosition"
          :enable-time-picker="false"
          @update:model-value="(date) => updateRange(date, 15)"
        />
      </div>
      <!-- Колличество -->
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
      <!-- ФИО -->
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
      <!-- Телефон -->
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
      <!-- Регион -->
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
      <!-- Город -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[20].label }}</p>
        <MultiSelect 
          v-model="filters[20].value" 
          display="chip" 
          :options="cities" 
          optionLabel="name" 
          filter 
          placeholder="Выберите"
          class="w-full" 
        />
      </div>
      <!-- Адрес -->
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
      <!-- Почтовый индекс -->
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
      <!-- Возраст -->
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
      <!-- Статусы -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[25].label }}</p>
        <MultiSelect 
          v-model="filters[25].value" 
          display="chip" 
          :options="subStatuses" 
          optionLabel="name" 
          filter 
          placeholder="Выберите"
          class="w-full" 
        />
      </div>
      <!-- Пол -->
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
      <!-- Способ оплаты -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[27].label }}</p>
        <MultiSelect 
          v-model="filters[27].value" 
          display="chip" 
          :options="paymentMethods" 
          optionLabel="name" 
          filter 
          placeholder="Выберите"
          class="w-full" 
        />
      </div>
    </div>
    <div
      class="flex flex-col gap-3 border p-2 rounded-lg"
    >
      <!-- Способ доставки -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[28].label }}</p>
        <MultiSelect 
          v-model="filters[28].value" 
          display="chip" 
          :options="deliveryMethods" 
          optionLabel="name" 
          filter 
          placeholder="Выберите"
          class="w-full" 
        />
      </div>
      <!-- Причины отмены заказа -->
      <div 
        class="flex flex-col gap-1"
      >
        <p class="font-bold">{{ filters[29].label }}</p>
        <MultiSelect 
          v-model="filters[29].value" 
          display="chip" 
          :options="orderCancelReasons" 
          optionLabel="name" 
          filter 
          placeholder="Выберите"
          class="w-full" 
        />
      </div>
      <!-- Трек код -->
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
      <!-- Дата возврата -->
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
      <!-- Причина возврата -->
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
      <!-- Язык -->
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
