<script setup>
import { onMounted, h } from 'vue';
import { useUsers, useWebmasters, useOperators } from '@hooks';
import { useModalStore } from '@store';
import { useUserApi, useWebmasterApi, useOperatorApi } from '@api';
import UsersTable from './blocks/users/UsersTable.vue';
import AddUserModal from './blocks/users/AddUserModal.vue';
import WebmastersTable from './blocks/webmasters/WebmastersTable.vue';
import AddWebmasterModal from './blocks/webmasters/AddWebmasterModal.vue';
import OperatorsTable from './blocks/operators/OperatorsTable.vue';
import AddOperatorModal from './blocks/operators/AddOperatorModal.vue';

const modal = useModalStore();

const { createUser } = useUserApi(); 
const { createWebmaster } = useWebmasterApi(); 
const { createOperator } = useOperatorApi(); 

const { 
  userState,
  handleEditUser,
  handleSaveUser,
  handleDeleteUser,
  handleUsersGetData 
} = useUsers();

const { 
  webmasterState,
  handleEditWebmaster,
  handleSaveWebmaster,
  handleDeleteWebmaster,
  handleWebmastersGetData 
} = useWebmasters();

const { 
  operatorState,
  handleEditOperator,
  handleSaveOperator,
  handleDeleteOperator,
  handleOperatorsGetData 
} = useOperators();

const handleAddUser = () => {
  modal.show({
    title: 'Добавление пользователя',
    children: h(AddUserModal, { 
      createUser, 
      users: userState.users, 
    }),
  })
};

const handleAddWebmaster = () => {
  modal.show({
    title: 'Добавление вебмастера',
    children: h(AddWebmasterModal, { 
      free_webmasters: webmasterState.free_webmasters,
      createWebmaster, 
      webmasters: webmasterState.webmasters, 
    }),
  })
};

const handleAddOperator = () => {
  modal.show({
    title: 'Добавление оператора',
    children: h(AddOperatorModal, { 
      teams: operatorState.teams,
      operators: operatorState.operators, 
      free_operators: operatorState.free_operators,
      createOperator, 
    }),
  })
};

onMounted(async () => {
  await handleUsersGetData();
  await handleWebmastersGetData();
  await handleOperatorsGetData();
})
</script>

<template>
  <div v-if="userState.isDataLoaded" class="min-h-screen p-6 text-xs">
    <div class="min-h-screen flex flex-col gap-6">
      <UsersTable
        v-if="userState.isDataLoaded"
        :users="userState.users"
        :handleAddUser="handleAddUser"
        :handleEditUser="handleEditUser"
        :handleSaveUser="handleSaveUser"
        :handleDeleteUser="handleDeleteUser"
      />
      <WebmastersTable
        v-if="webmasterState.isDataLoaded"
        :free_webmasters="webmasterState.free_webmasters"
        :webmasters="webmasterState.webmasters"
        :handleAddWebmaster="handleAddWebmaster"
        :handleEditWebmaster="handleEditWebmaster"
        :handleSaveWebmaster="handleSaveWebmaster"
        :handleDeleteWebmaster="handleDeleteWebmaster"
      />
      <OperatorsTable
        v-if="operatorState.isDataLoaded"
        :teams="operatorState.teams"
        :free_operators="operatorState.free_operators"
        :operators="operatorState.operators"
        :handleAddOperator="handleAddOperator"
        :handleEditOperator="handleEditOperator"
        :handleSaveOperator="handleSaveOperator"
        :handleDeleteOperator="handleDeleteOperator"
      />
    </div>
  </div>
</template>