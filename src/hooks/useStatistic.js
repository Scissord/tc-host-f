import { useStatisticApi } from '@api';

const useStatistic = () => {
  const {
    getStatistic, 
    getStatisticForWebmaster,
    getStatisticForOperator
  } = useStatisticApi();

  const handleGetStatistic = async (filters) => {
    let queries = "";

    if(filters.length > 0) {
      const filteredFilters = filters.filter(filter => filter.value !== null && filter.value !== "" && filter.value !== undefined);
      const queryParams = filteredFilters
        .map(item => `${encodeURIComponent(item.name)}=${encodeURIComponent(item.value)}`)
        .join('&');

      queries = `?${queryParams}`;
    };

    const statistic = await getStatistic(queries);
    return statistic;
  };

  const handleGetStatisticForWebmaster = async (filters) => {
    let queries = "";

    if(filters.length > 0) {
      const filteredFilters = filters.filter(filter => filter.value !== null && filter.value !== "" && filter.value !== undefined);
      const queryParams = filteredFilters
        .map(item => `${encodeURIComponent(item.name)}=${encodeURIComponent(item.value)}`)
        .join('&');

      queries = `?${queryParams}`;
    };

    const statistic = await getStatisticForWebmaster(queries);
    return statistic;
  };

  const handleGetStatisticForOperator = async (filters) => {
    let queries = "";

    if(filters.length > 0) {
      const filteredFilters = filters.filter(filter => filter.value !== null && filter.value !== "" && filter.value !== undefined);
      const queryParams = filteredFilters
        .map(item => `${encodeURIComponent(item.name)}=${encodeURIComponent(item.value)}`)
        .join('&');

      queries = `?${queryParams}`;
    };

    const statistic = await getStatisticForOperator(queries);
    return statistic;
  };

  return {
    handleGetStatistic, 
    handleGetStatisticForWebmaster,
    handleGetStatisticForOperator  
  }
};

export default useStatistic;
