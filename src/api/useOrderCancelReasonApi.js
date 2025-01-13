import { api } from '@api';

const useOrderCancelReasonApi = () => {
  const getOrderCancelReasons = async () => {
    const response = await api({
      method: 'GET',
      url: `/order_cancel_reasons`,
    })

    return response.data;
  };

  return {
    getOrderCancelReasons,
  };
};

export default useOrderCancelReasonApi;
