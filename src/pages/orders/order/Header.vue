<script setup>
import { ref } from 'vue';

defineProps({
  order_id: String,
  order: Object,
});

const activeSection = ref("Информация");
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-col gap-2">
      <h1 class="text-lg font-semibold text-gray-800">Заказ №{{ order_id }}</h1>
      <div class="flex items-center gap-2 text-sm">
        <span 
          class="text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full" 
        >
          {{ order?.state?.order?.status?.name }}
        </span>      
        <span
          class="text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-full" 
        >
          {{ order?.state?.order?.sub_status?.name }}
        </span>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <button
        :class="[
          'px-4 py-2 rounded-lg font-medium transition',
          activeSection === 'Информация'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        ]"
      >
        {{ 'Информация' }}
      </button>

      <button
        :class="[
          'px-4 py-2 rounded-lg font-medium transition',
          activeSection === 'История'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        ]"
      >
        {{ 'История' }}
      </button>
    </div>

    <div class="flex items-center gap-3">
      <PrimeSelect
        v-model="order.state.order.sub_status"
        :options="order?.state?.subStatuses"
        optionLabel="name" 
        placeholder="Выберите" 
        class="w-full" 
      />
      <button
        class="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 active:bg-green-700 transition"
        @click="() => order.saveOrder()"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>