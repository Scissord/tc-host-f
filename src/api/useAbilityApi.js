import { api } from '@api';

const useAbilityApi = () => {
  const getAbilities = async () => {
    const response = await api({
      method: "GET",
      url: '/abilities',
    });

    return response.data;
  };

  const getAbilitiesForHeader = async () => {
    const response = await api({
      method: "GET",
      url: '/abilities/header',
    });

    return response.data;
  };

  return {
    getAbilities,
    getAbilitiesForHeader,
  }
};

export default useAbilityApi;
