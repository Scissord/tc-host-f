import { api } from '@api';

const useDepartmentApi = () => {
  const getDepartments = async () => {
    const response = await api({
      method: 'GET',
      url: '/departments',
    });

    return response.data;
  };

  const getHeadAbility = async (department_id) => {
    const response = await api({
      method: 'GET',
      url: `/departments/head_ability/${department_id}`,
    });

    return response.data;
  };

  return {
    getDepartments,
    getHeadAbility
  };
};

export default useDepartmentApi;
