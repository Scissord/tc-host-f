import { reactive } from 'vue';
import { useAbilityApi } from '@api';

const useAbilities = () => {
  const state = reactive({
    isDataLoaded: false,
    abilities: []
  });

  const {
    getAbilities,
  } = useAbilityApi();

  const handleAbilityGetData = async () => {
    state.isDataLoaded = false;
    const data = await getAbilities();
    console.log(data);
    state.abilities = data.abilities;
    state.isDataLoaded = true;
  };

  return {
    abilityState: state,
    handleAbilityGetData
  };
};

export default useAbilities;
