import { reactive, h } from 'vue';
import { useModalStore } from '@store';
import { useStatusApi } from '@api';
import AddStatusModal from '@/pages/statuses/blocks/AddStatusModal.vue';

const useStatuses = () => {
  const state = reactive({
    isDataLoaded: false,
    statuses: []
  });

  const modal = useModalStore();

  const { 
    getStatuses,
    createStatus,
    updateStatus,
    deleteStatus 
  } = useStatusApi(); 
  
  const handleAddStatus = () => {
    modal.show({
      title: 'Добавление статуса',
      children: h(AddStatusModal, { 
        createStatus, 
        statuses: state.statuses 
      }),
    })
  }; 
  
  const handleEditStatus = (id) => {
    const status = state.statuses.find((s) => +s.id === +id)
    if(status) {
      status.is_editable = !status.is_editable;
    };
  };
  
  const handleSaveStatus = async (id) => {
    const status = state.statuses.find((s) => +s.id === +id)
    if(status) {
      await updateStatus(id, {
        name: status.name,
        color: status.color
      });
    };
    status.is_editable = false;
  };
  
  const handleDeleteStatus = async (id) => {
    const confirm = window.confirm('Вы уверены?'); 
    if(confirm) {
      await deleteStatus(id);
      state.statuses = state.statuses.filter((s) => +s.id !== +id);
    };
  };
  
  const handleGetData = async () => {
    state.isDataLoaded = false;
    const data = await getStatuses();
    state.statuses = data.statuses.map(status => ({
      ...status,
      is_editable: false
    }));
    state.isDataLoaded = true; 
  };
  
  return {
    state,
    handleAddStatus,
    handleEditStatus,
    handleSaveStatus,
    handleDeleteStatus,
    handleGetData 
  };
};

export default useStatuses;
