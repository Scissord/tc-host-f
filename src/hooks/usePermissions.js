import { reactive } from 'vue';
import { usePermissionApi } from '@api';

const usePermissions = () => {
  const state = reactive({
    isDataLoaded: false,
    permissions: []
  });

  const {
    getPermissionsByEntity,
    deletePermission
  } = usePermissionApi();

  const handleDeletePermission = async (id) => {
    const confirm = window.confirm('Вы уверены?');
    if (confirm) {
      await deletePermission(id);
      state.permissions = state.permissions.filter((p) => +p.id !== +id);
    };
  };

  const handlePermissionGetData = async (entity_id, entity_type) => {
    state.isDataLoaded = false;
    const data = await getPermissionsByEntity(entity_id, entity_type);
    state.permissions = data.permissions;
    state.isDataLoaded = true;
  };

  return {
    permissionState: state,
    handleDeletePermission,
    handlePermissionGetData
  };
};

export default usePermissions;
