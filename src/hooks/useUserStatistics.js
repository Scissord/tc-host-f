import { onMounted, reactive } from 'vue';
import { useStatisticApi } from '@api';

const useUserStatistics = () => {
  const { getUserStatistic, getWebmasterStatistic, getOperatorStatistic } = useStatisticApi();

  const state = reactive({
    isDataLoaded: false,
    statistics: [],
    tab: 0,
    range: [],
    group: {
      id: 0,
      value: 'by_date',
    },
    webmaster_id: null,
    operator_id: null,
  });

  // groups
  const groups = [
    { id: 0, value: 'by_date', label: 'По дате', },
    { id: 1, value: 'by_region', label: 'По регионам' },
    { id: 2, value: 'by_city', label: 'По городам' },
    { id: 3, value: 'by_product', label: 'По товарам' },
  ];

  const handleChangeGroup = async (val) => {
    state.group.value = val;
    await handleGetData();
  };

  // tabs
  const handleChangeTab = async (val) => {
    state.tab = val;
    await handleGetData();
  };

  // requests
  const fetchData = async (tab, range, group, webmasterId, operatorId) => {
    switch (tab) {
      case 0:
        return await getUserStatistic(range[0], range[1], group.value, webmasterId, operatorId);
      case 1:
        return await getWebmasterStatistic(range[0], range[1], webmasterId);
      case 2:
        return await getOperatorStatistic(range[0], range[1], operatorId);
      default:
        return await getUserStatistic(range[0], range[1], group.value, webmasterId, operatorId);
    };
  };

  const handleGetData = async () => {
    state.isDataLoaded = false;
    const data = await fetchData(state.tab, state.range, state.group, state.webmaster_id, state.operator_id);
    state.statistics = data.statistics;
    state.isDataLoaded = true;
  };

  const css = {
    defaultTab: 'h-8 cursor-pointer select-none p-2 whitespace-nowrap',
    activeTab: 'border-t border-l border-r rounded-t-md',
    disabledTab: 'border-b'
  };

  onMounted(() => {
    const startDate = new Date();
    const endDate = new Date(new Date().setDate(startDate.getDate() + 6));
    state.range = [startDate, endDate];
  });

  return {
    groups,
    state,
    handleChangeGroup,
    handleChangeTab,
    handleGetData,
    css,
  };
};

export default useUserStatistics;
