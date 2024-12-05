import { useColumnsApi } from '@api';

const useColumns = () => {
  const {
    getColumns, updateColumn
  } = useColumnsApi();

  const handleGetColumns = async () => {
    const columns = await getColumns();
    return columns;
  };

  const handleUpdateColumn = async (id, data) => {
    const column = await updateColumn(id, data);
    return column
  };

  return {
    handleGetColumns, handleUpdateColumn
  }
};

export default useColumns;
