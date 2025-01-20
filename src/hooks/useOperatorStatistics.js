import { reactive, onMounted } from 'vue';
import { useStatisticApi } from '@api';
import { useUserStore } from '@store';

const useOperatorStatistics = () => {
  const user = useUserStore();
  const { getOperatorStatistic } = useStatisticApi();

  const state = reactive({
    isDataLoaded: false,
    statistics: [],
    by_date: false,
    range: [],
    operator_id: user.data.operator_id,
  });

  const handleGetData = async () => {
    state.isDataLoaded = false;
    const data = await getOperatorStatistic(state.range[0], state.range[1], state.operator_id, state.by_date);
    state.statistics = data.result[user.data.operator_id];
    console.log(state.statistics);
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

export default useOperatorStatistics;
