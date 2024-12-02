import { useChaptersApi } from '@api';

const useChapters = () => {
  const {
    getChapters, createChapter,
    updateChapter, deleteChapter
  } = useChaptersApi();

  const handleGetChapters = async (good_id) => {
    const chapters = await getChapters(good_id);
    return chapters;
  };

  const handleCreateChapter = async (name) => {
    const chapter = await createChapter(name);
    return chapter;
  };

  const handleUpdateChapter = async (id, name) => {
    const chapter = await updateChapter(id, name);
    return chapter;
  };

  const handleDeleteChapter = async (id) => {
    await deleteChapter(id)
    return;
  };

  return {
    handleGetChapters, handleCreateChapter,
    handleUpdateChapter, handleDeleteChapter
  }
};

export default useChapters;
