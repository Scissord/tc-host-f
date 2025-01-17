import { api } from '@api';

const useKetApi = () => {
  const sendKet = async (data) => {
    const response = await api({
      method: 'POST',
      url: `/ket/dvd`,
      data,
    })

    return response.data;
  };

  return {
    sendKet,
  };
};

export default useKetApi;
