import { api } from '@api';

const useRoleApi = () => {
  const getRoles = async () => {
    const response = await api({
      method: 'GET',
      url: `/roles`,
    });

    return response.data;
  };

  const createRole = async (data) => {
    const response = await api({
      method: 'POST',
      url: '/roles',
      data
    });

    return response.data;
  };

  const updateRole = async (id, data) => {
    const response = await api({
      method: 'PATCH',
      url: `/roles/${id}`,
      data
    });

    return response.data;
  };

  const deleteRole = async (id) => {
    const response = await api({
      method: 'DELETE',
      url: `/roles/${id}`,
    });

    return response.data;
  };

  return {
    getRoles,
    createRole,
    updateRole,
    deleteRole
  };
};

export default useRoleApi;
