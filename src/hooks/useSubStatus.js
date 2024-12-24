import { reactive, h } from 'vue';
import { useModalStore } from '@store';
import { useSubStatusApi } from '@api';
import AddSubStatusModal from '@/pages/statuses/blocks/AddSubStatusModal.vue';

const useSubStatus = (status_id) => {
  const state = reactive({
    isDataLoaded: false,
    sub_statuses: []
  });

  const modal = useModalStore();

  const { 
    findSubStatuses,
    createSubStatus,
    updateSubStatus,
    deleteSubStatus 
  } = useSubStatusApi(); 
  
  const handleAddSubStatus = () => {
    modal.show({
      title: 'Добавление подстатуса',
      children: h(AddSubStatusModal, { 
        createSubStatus, 
        sub_statuses: state.sub_statuses,
        status_id
      }),
    })
  }; 
  
  const handleEditSubStatus = (id) => {
    const sub_status = state.sub_statuses.find((ss) => +ss.id === +id)
    if(sub_status) {
      sub_status.is_editable = !sub_status.is_editable;
    };
  };
  
  const handleSaveSubStatus = async (id) => {
    const sub_status = state.sub_statuses.find((ss) => +ss.id === +id)
    if(sub_status) {
      await updateSubStatus(id, {
        name: sub_status.name,
      });
    };
    sub_status.is_editable = false;
  };
  
  const handleDeleteSubStatus = async (id) => {
    const confirm = window.confirm('Вы уверены?'); 
    if(confirm) {
      await deleteSubStatus(id);
      state.sub_statuses = state.sub_statuses.filter((ss) => +ss.id !== +id);
    };
  };
  
  const handleGetData = async () => {
    state.isDataLoaded = false;
    const data = await findSubStatuses(status_id);
    state.sub_statuses = data.subStatuses.map(sub_status => ({
      ...sub_status,
      is_editable: false
    }));
    state.isDataLoaded = true; 
  };
  
  return {
    state,
    handleAddSubStatus,
    handleEditSubStatus,
    handleSaveSubStatus,
    handleDeleteSubStatus,
    handleGetData 
  };
};

export default useSubStatus;
