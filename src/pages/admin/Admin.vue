<script setup>
import { onMounted, h } from 'vue';
import { useUsers, useWebmasters, useOperators, useRoles, useAssignedRoles, usePermissions, useAbilities } from '@hooks';
import { useUserApi, useWebmasterApi, useOperatorApi, useRoleApi, useAssignedRoleApi, usePermissionApi } from '@api';
import { useModalStore } from '@store';
import UsersTable from './blocks/users/UsersTable.vue';
import AddUserModal from './blocks/users/AddUserModal.vue';
import WebmastersTable from './blocks/webmasters/WebmastersTable.vue';
import AddWebmasterModal from './blocks/webmasters/AddWebmasterModal.vue';
import OperatorsTable from './blocks/operators/OperatorsTable.vue';
import AddOperatorModal from './blocks/operators/AddOperatorModal.vue';
import RolesTable from './blocks/roles/RolesTable.vue';
import AddRoleModal from './blocks/roles/AddRoleModal.vue';
import AssignedRolesTable from './blocks/assigned_roles/AssignedRolesTable.vue';
import AddAssignedRoleModal from './blocks/assigned_roles/AddAssignedRoleModal.vue';
import PermissionsTable from './blocks/permissions/PermissionsTable.vue';
import AddPermissionModal from './blocks/permissions/AddPermissionModal.vue';

const modal = useModalStore();

const { createUser } = useUserApi(); 
const { createWebmaster } = useWebmasterApi(); 
const { createOperator } = useOperatorApi(); 
const { createRole } = useRoleApi(); 
const { createAssignedRole } = useAssignedRoleApi();
const { createPermission } = usePermissionApi();

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
  handleDeletePermission,
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

const handleAddPermission = (entity_id, entity_type) => {
  modal.show({
    title: 'Добавление доступа к пользователю или роли',
    children: h(AddPermissionModal, { 
      entity_id,
      entity_type,
      abilities: abilityState.abilities,
      permissions: permissionState.permissions,
      createPermission,
    }),
  })
};

onMounted(async () => {
  await handleUsersGetData();
  await handleWebmastersGetData();
  await handleOperatorsGetData();
  await handleRolesGetData();
  await handleAbilityGetData();
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
      <RolesTable
        v-if="roleState.isDataLoaded"
        :roles="roleState.roles"
        :handleAddRole="handleAddRole"
        :handleEditRole="handleEditRole"
        :handleSaveRole="handleSaveRole"
        :handleDeleteRole="handleDeleteRole"
      />
      <AssignedRolesTable
        :roles="roleState.roles"
        :assigned_roles="assignedRoleState.assigned_roles"
        :handleAddAssignedRole="handleAddAssignedRole"
        :handleDeleteAssignedRole="handleDeleteAssignedRole"
        :handleAssignedRoleGetData="handleAssignedRoleGetData"
      />
      <PermissionsTable
        :roles="roleState.roles"
        :users="userState.users"
        :permissions="permissionState.permissions"
        :handleAddPermission="handleAddPermission"
        :handleDeletePermission="handleDeletePermission"
        :handlePermissionGetData="handlePermissionGetData"
      />
    </div>
  </div>
</template>