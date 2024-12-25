import { reactive, h } from 'vue';
import { useModalStore } from '@store';
import { useUserApi } from '@api';
import AddUserModal from '@/pages/admin/blocks/AddUserModal.vue';

const useUsers = () => {
  const state = reactive({
    isDataLoaded: false,
    users: []
  });

  const modal = useModalStore();

  const { 
    getUsers,
    createUser,
    updateUser,
    deleteUser 
  } = useUserApi(); 
  
  const handleAddUser = () => {
    modal.show({
      title: 'Добавление товара',
      children: h(AddUserModal, { 
        createUser, 
        users: state.users, 
      }),
    })
  }; 
  
  const handleEditUser = (id) => {
    const user = state.users.find((u) => +u.id === +id)
    if(user) {
      user.is_editable = !user.is_editable;
    };
  };
  
  const handleSaveUser = async (id) => {
    const user = state.users.find((u) => +u.id === +id)
    if(user) {
      const updatedUser = await updateUser(id, {
        name: user.name,
        login: user.login,
        password: user.password,
      }); 

      if(updatedUser.user.password !== user.password) {
        user.password = updatedUser.user.password
      };
    };
    user.is_editable = false;
  };
  
  const handleDeleteUser = async (id) => {
    const confirm = window.confirm('Вы уверены?'); 
    if(confirm) {
      await deleteUser(id);
      state.users = state.users.filter((u) => +u.id !== +id);
    };
  };
  
  const handleGetData = async () => {
    state.isDataLoaded = false;
    const data = await getUsers();
    state.users = data.users.map(user => ({
      ...user,
      is_editable: false
    }));
    state.isDataLoaded = true; 
  };
  
  return {
    state,
    handleAddUser,
    handleEditUser,
    handleSaveUser,
    handleDeleteUser,
    handleGetData 
  };
};

export default useUsers;
