<script setup>
import { ref } from 'vue';

defineProps({
  excel_loading: {
    type: Boolean,
    default: false,
  },
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
  handleUnloadOrder: {
    type: Function,
    required: true
  },
});

const isUnloadingModalOpen = ref(false);
</script>

<template>
  <div class="flex items-center justify-between">
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
            @click="() => handleUnloadOrder()"
            :class="`px-4 py-2 rounded shadow 
              ${excel_loading ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700 text-white'}`"
          />
          <Button 
            text="Отпр. заказы в ДВД"
            v-if="+subStatus === 35"
            @click="handleSendKet()"
            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow"
          />
        </div>
        <Button 
          :text="'Выгрузка' + `(${newSubStatusLength})`"
          @click="isUnloadingModalOpen = !isUnloadingModalOpen"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        />
      </div>
    </div>

    <Paginate
      :page="page"
      :pages="pages"
      :lastPage="lastPage"
      :handleChangePage="handleChangePage"
    />
  </div>
</template>