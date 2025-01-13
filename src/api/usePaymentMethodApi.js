import { api } from '@api';

const usePaymentMethodApi = () => {
  const getPaymentMethods = async () => {
    const response = await api({
      method: 'GET',
      url: `/payment_methods`,
    })

    return response.data;
  };

  return {
    getPaymentMethods,
  };
};

export default usePaymentMethodApi;
