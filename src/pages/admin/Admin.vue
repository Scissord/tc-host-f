<script setup>
import { onMounted } from 'vue';
import { useUsers } from '@hooks';
import UsersTable from './blocks/UsersTable.vue';

const { 
  state,
  handleAddUser,
  handleEditUser,
  handleSaveUser,
  handleDeleteUser,
  handleGetData 
} = useUsers();

onMounted(async () => {
  await handleGetData();
})
</script>

<template>
  <div v-if="state.isDataLoaded" class="min-h-screen p-6 text-xs">
    <div class="min-h-screen grid grid-cols-4 gap-6">
      <UsersTable
        :users="state.users"
        :handleAddUser="handleAddUser"
        :handleEditUser="handleEditUser"
        :handleSaveUser="handleSaveUser"
        :handleDeleteUser="handleDeleteUser"
      />
    </div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <Loader/>
  </div>
</template>