import { api } from '@api';

const useDeliveryMethodsApi = () => {
  const getDeliveryMethods = async () => {
    const response = await api({
      method: 'GET',
      url: `/delivery_methods`,
    })

    return response.data;
  };

  return {
    getDeliveryMethods,
  };
};

export default useDeliveryMethodsApi;
