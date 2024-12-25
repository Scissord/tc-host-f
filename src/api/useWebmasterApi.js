import { api } from '@api';

const useWebmasterApi = () => {
  const getWebmasters = async () => {
    const response = await api({
      method: 'GET',
      url: `/webmasters`,
    });

    return response.data;
  };

  const getFreeWebmasters = async () => {
    const response = await api({
      method: 'GET',
      url: `/webmasters/free`,
    });

    return response.data;
  };

  const createWebmaster = async (data) => {
    const response = await api({
      method: 'POST',
      url: '/webmasters',
      data
    });

    return response.data;
  };
  
  const updateWebmaster = async (id, data) => {
    const response = await api({
      method: 'PATCH',
      url: `/webmasters/${id}`,
      data
    });

    return response.data;
  };

  const deleteWebmaster = async (id) => {
    const response = await api({
      method: 'DELETE',
      url: `/webmasters/${id}`,
    });

    return response.data;
  };

  return {
    getWebmasters,
    getFreeWebmasters,
    createWebmaster,
    updateWebmaster,
    deleteWebmaster,    
  };
};

export default useWebmasterApi;
