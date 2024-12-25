import { api } from '@api';

const useSubStatus = () => {
  const getSubStatuses = async () => {
    const response = await api({
      method: 'GET',
      url: '/sub_statuses',
    });

    return response.data;
  };

  const findSubStatuses = async (status_id) => {
    const response = await api({
      method: 'GET',
      url: `/sub_statuses/${status_id}`,
    });

    return response.data;
  };

  const getOperatorSubStatuses = async () => {
    const response = await api({
      method: 'GET',
      url: '/sub_statuses/operator/data',
    });

    return response.data;
  };

  const createSubStatus = async (data) => {
    const response = await api({
      method: 'POST',
      url: '/sub_statuses',
      data
    });

    return response.data;
  };
  
  const updateSubStatus = async (id, data) => {
    const response = await api({
      method: 'PATCH',
      url: `/sub_statuses/${id}`,
      data
    });

    return response.data;
  };

  const deleteSubStatus = async (id) => {
    const response = await api({
      method: 'DELETE',
      url: `/sub_statuses/${id}`,
    });

    return response.data;
  };

  return {
    getSubStatuses,
    findSubStatuses,
    getOperatorSubStatuses,
    createSubStatus,
    updateSubStatus,
    deleteSubStatus,
  };
};

export default useSubStatus;
