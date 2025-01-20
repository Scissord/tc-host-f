import { api } from '@api';

const useStatisticApi = () => {
  const getUserStatistic = async (start, end, group, webmaster_id, operator_id) => {
    const params = new URLSearchParams({
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
      group: group,
    });

    if (webmaster_id) params.append('webmaster_id', encodeURIComponent(webmaster_id));
    if (operator_id) params.append('operator_id', encodeURIComponent(operator_id));

    const response = await api({
      method: 'GET',
      url: `/statistics/user?${params.toString()}`,
    });

    return response.data;
  };

  const getWebmasterStatistic = async (start, end, webmaster_id) => {
    const params = new URLSearchParams({
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
    });

    if (webmaster_id) params.append('webmaster_id', encodeURIComponent(webmaster_id));

    const response = await api({
      method: 'GET',
      url: `/statistics/webmaster?${params.toString()}`,
    });

    return response.data;
  };

  const getOperatorStatistic = async (start, end, operator_id, by_date) => {
    const params = new URLSearchParams({
      by_date,
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
    });

    if (operator_id) params.append('operator_id', encodeURIComponent(operator_id));

    const response = await api({
      method: 'GET',
      url: `/statistics/operator?${params.toString()}`,
    });

    return response.data;
  };

  return {
    getUserStatistic,
    getWebmasterStatistic,
    getOperatorStatistic,
  };
};

export default useStatisticApi;
