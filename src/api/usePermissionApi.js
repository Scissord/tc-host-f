import { api } from '@api';

const usePermissionApi = () => {
  const getPermissionsByEntity = async (entity_id, entity_type) => {
    const response = await api({
      method: 'GET',
      url: `/permissions/${entity_id}/${entity_type}`,
    });

    return response.data;
  };

  const createPermission = async (data) => {
    const response = await api({
      method: 'POST',
      url: '/permissions',
      data
    });

    return response.data;
  };

  const deletePermission = async (id) => {
    const response = await api({
      method: 'DELETE',
      url: `/permissions/${id}`,
    });

    return response.data;
  };

  return {
    getPermissionsByEntity,
    createPermission,
    deletePermission
  };
};

export default usePermissionApi;
