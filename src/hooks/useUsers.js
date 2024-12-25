import { reactive } from 'vue';
import { useUserApi } from '@api';

const useUsers = () => {
  const state = reactive({
    isDataLoaded: false,
    users: []
  });

  const { 
    getUsers,
    updateUser,
    deleteUser 
  } = useUserApi(); 
  
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
  
  const handleUsersGetData = async () => {
    state.isDataLoaded = false;
    const data = await getUsers();
    state.users = data.users.map(user => ({
      ...user,
      is_editable: false
    }));
    state.isDataLoaded = true; 
  };
  
  return {
    userState: state,
    handleEditUser,
    handleSaveUser,
    handleDeleteUser,
    handleUsersGetData 
  };
};

export default useUsers;
