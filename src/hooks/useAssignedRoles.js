import { reactive } from 'vue';
import { useAssignedRoleApi } from '@api';

const useAssignedRoles = () => {
  const state = reactive({
    isDataLoaded: false,
    assigned_roles: [],
    entity_id: null,
  });

  const {
    getAssignedRolesByRole,
    deleteAssignedRole
  } = useAssignedRoleApi();

  const handleDeleteAssignedRole = async (id) => {
    const confirm = window.confirm('Вы уверены?');
    if (confirm) {
      await deleteAssignedRole(id);
      state.assigned_roles = state.assigned_roles.filter((p) => +p.id !== +id);
    };
  };

  const handleAssignedRoleGetData = async (role_id) => {
    state.isDataLoaded = false;
    const data = await getAssignedRolesByRole(role_id);
    state.assigned_roles = data.assigned_roles;
    state.isDataLoaded = true;
  };

  return {
    assignedRoleState: state,
    handleDeleteAssignedRole,
    handleAssignedRoleGetData
  };
};

export default useAssignedRoles;
