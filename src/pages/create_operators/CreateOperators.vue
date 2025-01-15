<script setup>
import { onMounted, h } from 'vue';
import { useOperators } from '@hooks';
import { useOperatorApi } from '@api';
import { useModalStore } from '@store';
import AddOperatorModal from './blocks/AddOperatorModal.vue';
import AddOperatorWithUserModal from './blocks/AddOperatorWithUserModal.vue';
import OperatorsTable from './blocks/OperatorsTable.vue';

const modal = useModalStore();

const { createOperator, createOperatorWithUser } = useOperatorApi();

const { 
  operatorState,
  handleEditOperator,
  handleSaveOperator,
  handleDeleteOperator,
  handleOperatorsGetData 
} = useOperators();

const handleAddOperator = () => {
  modal.show({
    title: 'Добавление оператора',
    children: h(AddOperatorModal, { 
      teams: operatorState.teams,
      operators: operatorState.operators, 
      free_operators: operatorState.free_operators,
      createOperator, 
    }),
  });
};

const handleAddOperatorWithUser = () => {
  modal.show({
    title: 'Добавление оператора',
    children: h(AddOperatorWithUserModal, { 
      teams: operatorState.teams,
      createOperatorWithUser, 
    }),
  });
};

onMounted(async () => {
  await handleOperatorsGetData();
});
</script>

<template>
  <div v-if="operatorState.isDataLoaded" class="min-h-screen p-6 transition-all duration-300 ease-in-out ml-[5vw]">
    <div class="flex flex-wrap justify-between items-center bg-zinc-600 text-white p-4 rounded-lg">
      <h1 class="text-2xl font-bold">Админ</h1>
    </div>

    <div class="bg-white rounded-lg shadow-md p-4">
      <OperatorsTable
        v-if="operatorState.isDataLoaded"
        :teams="operatorState.teams"
        :free_operators="operatorState.free_operators"
        :operators="operatorState.operators"
        :handleAddOperator="handleAddOperator"
        :handleAddOperatorWithUser="handleAddOperatorWithUser"
        :handleEditOperator="handleEditOperator"
        :handleSaveOperator="handleSaveOperator"
        :handleDeleteOperator="handleDeleteOperator"
      />
    </div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader />
  </div>
</template>
