import { useColumnsApi } from '@api';

const useColumns = () => {
  const {
    getColumns
  } = useColumnsApi();

  const handleGetColumns = async () => {
    const columns = await getColumns();
    return columns;
  };

  return {
    handleGetColumns
  }
};

export default useColumns;
