import { api } from '@api';

const useAbilityApi = () => {
  const getAbilities = async () => {

  };

  const getAbilitiesForHeader = async () => {
    const response = await api({
      method: "GET",
      url: '/abilities/header',
    });
    
    return response.data;
  };

  return {
    getAbilitiesForHeader
  }
};

export default useAbilityApi;
