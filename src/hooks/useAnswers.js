import { useAnswersApi } from '@api';

const useAnswers = () => {
  const {
    createAnswer, updateAnswer,
    deleteAnswer
  } = useAnswersApi();

  const handleCreateAnswer = async (data) => {
    const text = await createAnswer(data);
    return text;
  };

  const handleUpdateAnswer = async (id, data) => {
    const text = await updateAnswer(id, data);
    return text;
  };

  const handleDeleteAnswer = async (id) => {
    await deleteAnswer(id);
    return;
  }

  return {
    handleCreateAnswer, handleUpdateAnswer,
    handleDeleteAnswer
  }
};

export default useAnswers;
