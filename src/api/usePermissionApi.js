import { api } from '@api';

const usePermissionApi = () => {
  const getPermissionsByEntity = async (entity_id, entity_type) => {
    const response = await api({
      method: 'GET',
      url: `/permissions/${entity_id}/${entity_type}`,
    });
    return response.data;
  };

  const togglePermission = async (data) => {
    const response = await api({
      method: 'PATCH',
      url: '/permissions',
      data
    });

    return response.data;
  };

  return {
    getPermissionsByEntity,
    togglePermission,
  };
};

export default usePermissionApi;
