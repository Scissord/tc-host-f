import { useTextsApi } from '@api';

const useTexts = () => {
  const {
    getTexts,
    createTextName,
    updateTextName,
    deleteText
  } = useTextsApi();

  const handleGetTexts = async (good_id) => {
    const texts = getTexts(good_id);
    return texts;
  }

  const handleCreateTextName = async (data) => {
    const text = await createTextName(data);
    return text;
  };

  const handleUpdateTextName = async (data) => {
    const text = await updateTextName(data.id, data);
    return text;
  };

  const handleDeleteText = async (id) => {
    await deleteText(id);
    return;
  }

  // const handleCreateChapter = async (name) => {
  //   const chapter = await createChapter(name);
  //   return chapter;
  // };

  // const handleDeleteChapter = async (id) => {
  //   await deleteChapter(id)
  //   return;
  // };

  return {
    handleGetTexts,
    handleCreateTextName,
    handleUpdateTextName,
    handleDeleteText
  }
};

export default useTexts;
