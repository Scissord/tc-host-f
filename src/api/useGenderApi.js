import { api } from '@api';

const useGenderApi = () => {
  const getGenders = async () => {
    const response = await api({
      method: 'GET',
      url: `/genders`,
    })

    return response.data;
  };

  return {
    getGenders,
  };
};

export default useGenderApi;
