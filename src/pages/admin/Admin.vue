<script setup>
import { onMounted, h } from 'vue';
import { useUsers, useWebmasters, useOperators, useRoles, useAssignedRoles, usePermissions, useAbilities } from '@hooks';
import { useUserApi, useWebmasterApi, useOperatorApi, useRoleApi, useAssignedRoleApi } from '@api';
import { useModalStore } from '@store';
import UsersTable from '../admin/blocks/users/UsersTable.vue';
import AddUserModal from '../admin/blocks/users/AddUserModal.vue';
import WebmastersTable from '../admin/blocks/webmasters/WebmastersTable.vue';
import AddWebmasterModal from '../admin/blocks/webmasters/AddWebmasterModal.vue';
import OperatorsTable from '../admin/blocks/operators/OperatorsTable.vue';
import AddOperatorModal from '../admin/blocks/operators/AddOperatorModal.vue';
import RolesTable from '../admin/blocks/roles/RolesTable.vue';
import AddRoleModal from '../admin/blocks/roles/AddRoleModal.vue';
import AssignedRolesTable from '../admin/blocks/assigned_roles/AssignedRolesTable.vue';
import AddAssignedRoleModal from '../admin/blocks/assigned_roles/AddAssignedRoleModal.vue';
import PermissionsTable from '../admin/blocks/permissions/PermissionsTable.vue';

const modal = useModalStore();

const { createUser } = useUserApi(); 
const { createWebmaster } = useWebmasterApi(); 
const { createOperator } = useOperatorApi(); 
const { createRole } = useRoleApi(); 
const { createAssignedRole } = useAssignedRoleApi();

const { 
  userState,
  handleEditUser,
  handleSaveUser,
  handleDeleteUser,
  handleUsersGetData 
} = useUsers();

const { 
  webmasterState,
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

const { 
  roleState,
  handleEditRole,
  handleSaveRole,
  handleDeleteRole,
  handleRolesGetData 
} = useRoles();

const { 
  assignedRoleState,
  handleDeleteAssignedRole,
  handleAssignedRoleGetData 
} = useAssignedRoles();

const { 
  permissionState,
  handleTogglePermission,
  handlePermissionGetData 
} = usePermissions();

const { 
  abilityState,
  handleAbilityGetData
} = useAbilities();

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

const handleAddRole = () => {
  modal.show({
    title: 'Добавление роли',
    children: h(AddRoleModal, { 
      roles: roleState.roles,
      createRole, 
    }),
  });
};

const handleAddAssignedRole = (role_id) => {
  modal.show({
    title: 'Добавление роли для пользователя',
    children: h(AddAssignedRoleModal, { 
      role_id,
      assigned_roles: assignedRoleState.assigned_roles,
      createAssignedRole, 
      users: userState.users, 
    }),
  })
};

onMounted(async () => {
  await Promise.all([
    await handleUsersGetData(),
    await handleWebmastersGetData(),
    await handleOperatorsGetData(),
    await handleRolesGetData(),
    await handleAbilityGetData(),
  ])
});
</script>

<template>
  <div v-if="userState.isDataLoaded" class="min-h-screen p-6 transition-all duration-300 ease-in-out ml-[5vw]">
    <div class="flex flex-wrap justify-between items-center bg-zinc-600 text-white p-4 rounded-lg">
      <h1 class="text-2xl font-bold">Админ Панель</h1>
    </div>

    <div class="flex flex-col gap-6 mt-6">
      <div class="bg-white shadow-md rounded-lg p-4">
        <UsersTable
          v-if="userState.isDataLoaded" 
          :users="userState.users"
          :handleAddUser="handleAddUser"
          :handleEditUser="handleEditUser"
          :handleSaveUser="handleSaveUser"
          :handleDeleteUser="handleDeleteUser"
        />
      </div>

      <div class="grid grid-cols-2 gap-6 mt-6">
        <div class="bg-white rounded-lg shadow-md p-4">
          <WebmastersTable
            v-if="webmasterState.isDataLoaded"
            :free_webmasters="webmasterState.free_webmasters"
            :webmasters="webmasterState.webmasters"
            :handleAddWebmaster="handleAddWebmaster"
            :handleDeleteWebmaster="handleDeleteWebmaster"
          />
        </div>

        <div class="bg-white rounded-lg shadow-md p-4">
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

        <div class="bg-white shadow-md rounded-lg p-4">
          <RolesTable
            v-if="roleState.isDataLoaded"
            :roles="roleState.roles"
            :handleAddRole="handleAddRole"
            :handleEditRole="handleEditRole"
            :handleSaveRole="handleSaveRole"
            :handleDeleteRole="handleDeleteRole"
          />
        </div>

        <div class="bg-white shadow-md rounded-lg p-4">
          <AssignedRolesTable
            v-if="roleState.isDataLoaded"
            :roles="roleState.roles"
            :assigned_roles="assignedRoleState.assigned_roles"
            :handleAddAssignedRole="handleAddAssignedRole"
            :handleDeleteAssignedRole="handleDeleteAssignedRole"
            :handleAssignedRoleGetData="handleAssignedRoleGetData"
          />
        </div>
      </div>

      <div class="bg-white shadow-md rounded-lg p-4">
        <PermissionsTable
          v-if="roleState.isDataLoaded && userState.isDataLoaded && abilityState.isDataLoaded"
          :permissions="permissionState.permissions"
          :roles="roleState.roles"
          :users="userState.users"
          :abilities="abilityState.abilities"
          :handleTogglePermission="handleTogglePermission"
          :handlePermissionGetData="handlePermissionGetData"
        />
      </div>
    </div>
  </div>
</template>
  