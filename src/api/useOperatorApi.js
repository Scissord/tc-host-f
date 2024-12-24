import { api } from '@api';

const useOperatorApi = () => {
  const getFreeOperators = async () => {
    const response = await api({
      method: 'GET',
      url: '/operators/free',
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

  return {
    getFreeOperators,
    updateOperator,
  };
};

export default useOperatorApi;
