import { reactive, h } from 'vue';
import { useModalStore } from '@store';
import { useDepartmentApi, useSubStatusApi } from '@api';
import AddDepartmentModal from '@/pages/departments/blocks/AddDepartmentModal.vue';

const useDepartments = () => {
  const state = reactive({
    isDataLoaded: false,
    departments: [],
    subStatuses: [],
  });

  const modal = useModalStore();

  const { getSubStatuses } = useSubStatusApi();

  const {
    getDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment
  } = useDepartmentApi();

  const handleAddDepartment = () => {
    modal.show({
      title: 'Добавление отдела',
      children: h(AddDepartmentModal, {
        createDepartment,
        departments: state.departments,
        subStatuses: state.subStatuses,
      }),
    })
  };

  const handleEditDepartment = (id) => {
    const department = state.departments.find((d) => +d.id === +id)
    if (department) {
      department.is_editable = !department.is_editable;
    };
  };

  const handleSaveDepartment = async (id) => {
    const department = state.departments.find((d) => +d.id === +id)
    if (department) {
      await updateDepartment(id, {
        title: department.title,
        sub_status_ids: department.sub_status_ids
      });
    };
    department.is_editable = false;
  };

  const handleDeleteDepartment = async (id) => {
    const confirm = window.confirm('Вы уверены?');
    if (confirm) {
      await deleteDepartment(id);
      state.departments = state.departments.filter((d) => +d.id !== +id);
    };
  };

  const handleGetData = async () => {
    state.isDataLoaded = false;
    const subStatusesData = await getSubStatuses();

    console.log(subStatusesData.subStatuses)
    state.subStatuses = subStatusesData.subStatuses;
    const departmentsData = await getDepartments();
    state.departments = departmentsData.departments.map(department => ({
      ...department,
      is_editable: false
    }));
    state.isDataLoaded = true;
  };

  return {
    state,
    handleAddDepartment,
    handleEditDepartment,
    handleSaveDepartment,
    handleDeleteDepartment,
    handleGetData
  };
};

export default useDepartments;
