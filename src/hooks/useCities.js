import { reactive, h } from 'vue';
import { useModalStore } from '@store';
import { useCityApi } from '@api';
import AddCityModal from '@/pages/cities/blocks/AddCityModal.vue';

const useCities = () => {
  const state = reactive({
    isDataLoaded: false,
    cities: []
  });

  const modal = useModalStore();

  const { 
    getCities,
    createCity,
    updateCity,
    deleteCity 
  } = useCityApi(); 

  const handleAddCity = () => {
    modal.show({
      title: 'Добавление города',
      children: h(AddCityModal, { 
        createCity, 
        cities: state.cities 
      }),
    })
  }; 

  const handleEditCity = (id) => {
    const city = state.cities.find((c) => +c.id === +id)
    if(city) {
      city.is_editable = !city.is_editable;
    };
  };

  const handleSaveCity = async (id) => {
    const city = state.cities.find((c) => +c.id === +id)
    if(city) {
      await updateCity(id, {
        name: city.name,
      }); 
    };
    city.is_editable = false;
  };

  const handleDeleteCity = async (id) => {
    const confirm = window.confirm('Вы уверены?'); 
    if(confirm) {
      await deleteCity(id);
      state.cities = state.cities.filter((c) => +c.id !== +id);
    };
  };

  const handleGetData = async () => {
    state.isDataLoaded = false;
    const data = await getCities();
    state.cities = data.cities.map(city => ({
      ...city,
      is_editable: false
    }));
    state.isDataLoaded = true; 
  };

  return {
    state,
    handleAddCity,
    handleEditCity,
    handleSaveCity,
    handleDeleteCity,
    handleGetData
  };
};

export default useCities;
