import { reactive } from 'vue';
import { useWebmasterApi } from '@api';

const useWebmasters = () => {
  const state = reactive({
    isDataLoaded: false,
    webmasters: [],
    free_webmasters: [],
  });

  const { 
    getWebmasters,
    getFreeWebmasters,
    updateWebmaster,
    deleteWebmaster,
  } = useWebmasterApi(); 
  
  const handleEditWebmaster = (id) => {
    const webmaster = state.webmasters.find((w) => +w.id === +id)
    if(webmaster) {
      webmaster.is_editable = !webmaster.is_editable;
    };
  };
  
  const handleSaveWebmaster = async (id) => {
    const webmaster = state.webmasters.find((w) => +w.id === +id)
    if(webmaster) {
      await updateWebmaster(id, {
        user_id: webmaster.user_id,
      }); 
    };
    webmaster.is_editable = false;
  };
  
  const handleDeleteWebmaster = async (id) => {
    const confirm = window.confirm('Вы уверены?'); 
    if(confirm) {
      await deleteWebmaster(id);
      state.webmasters = state.webmasters.filter((w) => +w.id !== +id);
    };
  };
  
  const handleWebmastersGetData = async () => {
    state.isDataLoaded = false;
    const webmasterData = await getWebmasters();
    const freeWebmasterData = await getFreeWebmasters();
    state.webmasters = webmasterData.webmasters.map(webmaster => ({
      ...webmaster,
      is_editable: false
    }));
    state.free_webmasters = freeWebmasterData.free_webmasters;
    state.isDataLoaded = true; 
  };
  
  return {
    webmasterState: state,
    handleEditWebmaster,
    handleSaveWebmaster,
    handleDeleteWebmaster,
    handleWebmastersGetData 
  };
};

export default useWebmasters;
