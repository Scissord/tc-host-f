import { api } from '@api';

const useSubStatus = () => {
  const getSubStatuses = async () => {
    const response = await api({
      method: 'GET',
      url: '/sub_statuses',
    })

    return response.data.subStatuses;
  };

  return {
    getSubStatuses,
  };
};

export default useSubStatus;
