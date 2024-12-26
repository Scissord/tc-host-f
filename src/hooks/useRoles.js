import { reactive } from 'vue';
import { useRoleApi } from '@api';

const useRoles = () => {
  const state = reactive({
    isDataLoaded: false,
    roles: []
  });

  const {
    getRoles,
    updateRole,
    deleteRole
  } = useRoleApi();

  const handleEditRole = (id) => {
    const role = state.roles.find((r) => +r.id === +id)
    if (role) {
      role.is_editable = !role.is_editable;
    };
  };

  const handleSaveRole = async (id) => {
    const role = state.roles.find((r) => +r.id === +id)
    if (role) {
      await updateRole(id, {
        name: role.name,
        title: role.title,
      });
    };
    role.is_editable = false;
  };

  const handleDeleteRole = async (id) => {
    const confirm = window.confirm('Вы уверены?');
    if (confirm) {
      await deleteRole(id);
      state.roles = state.roles.filter((r) => +r.id !== +id);
    };
  };

  const handleRolesGetData = async () => {
    state.isDataLoaded = false;
    const data = await getRoles();
    state.roles = data.roles.map(role => ({
      ...role,
      is_editable: false
    }));
    state.isDataLoaded = true;
  };

  return {
    roleState: state,
    handleEditRole,
    handleSaveRole,
    handleDeleteRole,
    handleRolesGetData
  };
};

export default useRoles;
