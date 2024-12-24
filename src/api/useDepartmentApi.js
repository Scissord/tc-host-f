import { api } from '@api';

const useDepartmentApi = () => {
  const getDepartments = async () => {
    const response = await api({
      method: 'GET',
      url: '/departments',
    });

    return response.data;
  };

  const createDepartment = async (data) => {
    const response = await api({
      method: 'POST',
      url: '/departments',
      data
    });

    return response.data;
  };
  
  const updateDepartment = async (id, data) => {
    const response = await api({
      method: 'PATCH',
      url: `/departments/${id}`,
      data
    });

    return response.data;
  };

  const deleteDepartment = async (id) => {
    const response = await api({
      method: 'DELETE',
      url: `/departments/${id}`,
    });

    return response.data;
  };

  return {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
  };
};

export default useDepartmentApi;
