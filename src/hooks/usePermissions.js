import { reactive } from 'vue';
import { usePermissionApi } from '@api';

const usePermissions = () => {
  const state = reactive({
    isDataLoaded: false,
    permissions: []
  });

  const {
    getPermissionsByEntity,
    togglePermission,
  } = usePermissionApi();

  const handleTogglePermission = async (entity_id, entity_type, ability_id) => {
    const permission = await togglePermission({ entity_id, entity_type, ability_id });
    const isExist = state.permissions.find((p) =>
      +p.entity_id === entity_id &&
      p.entity_type === entity_type &&
      +p.ability_id === ability_id
    );
    if (isExist) {
      state.permissions.filter((p) => +p.id !== +permission.id)
    } else {
      state.permissions.push(permission);
    }
  };

  const handlePermissionGetData = async (entity_id, entity_type) => {
    state.isDataLoaded = false;
    const data = await getPermissionsByEntity(entity_id, entity_type);
    state.permissions = data.permissions;
    state.isDataLoaded = true;
  };

  return {
    permissionState: state,
    handleTogglePermission,
    handlePermissionGetData
  };
};

export default usePermissions;
