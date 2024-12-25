import { api } from '@api';

const useUserApi = () => {
  const getUsers = async () => {
    const response = await api({
      method: 'GET',
      url: `/users`,
    });

    return response.data;
  };

  const createUser = async (data) => {
    const response = await api({
      method: 'POST',
      url: '/users',
      data
    });

    return response.data;
  };
  
  const updateUser = async (id, data) => {
    const response = await api({
      method: 'PATCH',
      url: `/users/${id}`,
      data
    });

    return response.data;
  };

  const deleteUser = async (id) => {
    const response = await api({
      method: 'DELETE',
      url: `/users/${id}`,
    });

    return response.data;
  };

  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,    
  };
};

export default useUserApi;
