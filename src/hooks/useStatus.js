import { useStatusApi } from '@api';

const useStatus = () => {
  const {
    getStatuses
  } = useStatusApi();

  const handleGetStatuses = async () => {
    const statuses = await getStatuses();
    return statuses;
  };

  return {
    handleGetStatuses
  }
};

export default useStatus;
