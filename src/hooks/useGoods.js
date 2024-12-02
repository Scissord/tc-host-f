import { useGoodsApi } from '@api';

const useGoods = () => {
  const {
    getGoods,
    getScript,
  } = useGoodsApi();

  const handleGetGoods = async () => {
    const goods = await getGoods();
    return goods;
  };

  const handleGetScript = async (text_id) => {
    const script = await getScript(text_id);
    return script;
  };

  return {
    handleGetGoods,
    handleGetScript,
  };
};

export default useGoods;
