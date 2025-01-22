import { reactive, onMounted } from 'vue';
import { useStatisticApi } from '@api';
import { useUserStore } from '@store';

const useWebmasterStatistics = () => {
  const user = useUserStore();
  const { getWebmasterStatistic } = useStatisticApi();

  const state = reactive({
    isDataLoaded: false,
    statistics: [],
    range: [],
    webmaster_id: user.data.webmaster_id,
  });

  const handleGetData = async () => {
    state.isDataLoaded = false;
    const data = await getWebmasterStatistic(state.range[0], state.range[1], state.webmaster_id);
    console.log(data.result);
    state.statistics = data.result[0];
    state.isDataLoaded = true;
  };

  onMounted(() => {
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 6));
    state.range = [startDate, endDate];
  });

  return {
    state,
    handleGetData,
  };
};

export default useWebmasterStatistics;
