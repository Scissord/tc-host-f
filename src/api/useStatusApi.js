import { api } from '@api';

const useStatus = () => {
  const getStatuses = async () => {
    const response = await api({
      method: 'GET',
      url: '/statuses',
    })

    return response.data;
  };

  const createStatus = async (data) => {
    const response = await api({
      method: 'POST',
      url: '/statuses',
      data
    });

    return response.data;
  };
  
  const updateStatus = async (id, data) => {
    const response = await api({
      method: 'PATCH',
      url: `/statuses/${id}`,
      data
    });

    return response.data;
  };

  const deleteStatus = async (id) => {
    const response = await api({
      method: 'DELETE',
      url: `/statuses/${id}`,
    });

    return response.data;
  };

  return {
    getStatuses,
    createStatus,
    updateStatus,
    deleteStatus,
  };
};

export default useStatus;
