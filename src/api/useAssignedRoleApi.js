import { api } from '@api';

const useAssignedRoleApi = () => {
  const getAssignedRolesByRole = async (role_id) => {
    const response = await api({
      method: 'GET',
      url: `/assigned_roles/${role_id}`,
    });

    return response.data;
  };

  const createAssignedRole = async (data) => {
    const response = await api({
      method: 'POST',
      url: '/assigned_roles',
      data
    });

    return response.data;
  };

  const deleteAssignedRole = async (id) => {
    const response = await api({
      method: 'DELETE',
      url: `/assigned_roles/${id}`,
    });

    return response.data;
  };

  return {
    getAssignedRolesByRole,
    createAssignedRole,
    deleteAssignedRole
  };
};

export default useAssignedRoleApi;
