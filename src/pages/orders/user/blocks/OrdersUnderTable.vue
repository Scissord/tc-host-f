<script setup>
import { ref } from 'vue';

defineProps({
  subStatus: {
    type: Number,
    required: true,
    default: 1
  },
  newSubStatus: {
    type: Number,
    required: true,
    default: 1
  },
  subStatuses: {
    type: Array,
    required: true,
    default: []
  },
  handleChangeOrdersSubStatus: {
    type: Function,
    required: true
  },
  handleSendKet: {
    type: Function,
    required: true,
  },
  newSubStatusLength: {
    type: [String, Number],
    required: true,
    default: 0
  },
});

const isUnloadingModalOpen = ref(false);

const handleExcel = () => {
  alert('Модуль в разработке!')
}
</script>

<template>
  <div class="flex items-center gap-3">
    <Select
      class="w-[200px]"
      :modelValue="newSubStatus"
      @update:modelValue="handleChangeOrdersSubStatus"
      :options="subStatuses"
      :length="newSubStatusLength" 
      value="id"
      label="name"
    />
    <div class="relative">
      <div 
        v-if="isUnloadingModalOpen"
        class="absolute z-30 bg-white p-3 border rounded-sm top-[-70px] left-1/2 -translate-x-1/2 flex items-center gap-3"
      >
        <Button 
          text="EXCEL"
          @click="handleExcel()"
          class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow"
        />
        <Button 
          text="Отпр. заказы в ДВВ"
          v-if="+subStatus === 35"
          @click="handleSendKet()"
          class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow"
        />
        <!-- <Button 
          text="Отправить заказы в KetKz"
          v-if="+subStatus === 16"
          @click="handleSendKet()"
          class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow"
        /> -->
      </div>
      <Button 
        text="Выгрузка"
        @click="isUnloadingModalOpen = !isUnloadingModalOpen"
        class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow"
      />
    </div>

  </div>
</template>