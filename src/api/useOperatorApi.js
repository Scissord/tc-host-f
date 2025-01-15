import { api } from '@api';

const useOperatorApi = () => {
  const getOperators = async () => {
    const response = await api({
      method: 'GET',
      url: `/operators`,
    });

    return response.data;
  };

  const getFreeOperators = async () => {
    const response = await api({
      method: 'GET',
      url: '/operators/free',
    });

    return response.data;
  };

  const createOperator = async (data) => {
    const response = await api({
      method: 'POST',
      url: '/operators',
      data
    });

    return response.data;
  };

  const createOperatorWithUser = async (data) => {
    const response = await api({
      method: 'POST',
      url: '/operators/with_user',
      data
    });

    return response.data;
  };
  const updateOperator = async (id, data) => {
    const response = await api({
      method: 'PATCH',
      url: `/operators/${id}`,
      data
    });

    return response.data;
  };

  const deleteOperator = async (id) => {
    const response = await api({
      method: 'DELETE',
      url: `/operators/${id}`,
    });

    return response.data;
  };

  return {
    getOperators,
    getFreeOperators,
    createOperator,
    createOperatorWithUser,
    updateOperator,
    deleteOperator,
  };
};

export default useOperatorApi;
