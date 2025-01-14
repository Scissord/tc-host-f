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
    deleteWebmaster,
  } = useWebmasterApi();

  const handleDeleteWebmaster = async (id) => {
    const confirm = window.confirm('Вы уверены?');
    if (confirm) {
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
    handleDeleteWebmaster,
    handleWebmastersGetData
  };
};

export default useWebmasters;
