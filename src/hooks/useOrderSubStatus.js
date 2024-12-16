import { useOrderSubStatusApi } from '@api';

const useOrderSubStatus = () => {
  const {
    getSubStatuses
  } = useOrderSubStatusApi();

  const fetchSubStatuses = async () => {
    const orders = await getSubStatuses();
    return orders;
  };

  return {
    fetchSubStatuses
  }
};

export default useOrderSubStatus;
