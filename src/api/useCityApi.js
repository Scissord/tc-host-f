import { api } from '@api';

const useCityApi = () => {
  const getCities = async () => {
    const response = await api({
      method: 'GET',
      url: `/cities`,
    })

    return response.data;
  };

  const createCity = async (data) => {
    const response = await api({
      method: 'POST',
      url: '/cities',
      data
    });

    return response.data;
  };
  
  const updateCity = async (id, data) => {
    const response = await api({
      method: 'PATCH',
      url: `/cities/${id}`,
      data
    });

    return response.data;
  };

  const deleteCity = async (id) => {
    const response = await api({
      method: 'DELETE',
      url: `/cities/${id}`,
    });

    return response.data;
  };

  return {
    getCities,
    createCity,
    updateCity,
    deleteCity    
  };
};

export default useCityApi;
