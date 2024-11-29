import { useUserStore } from '@store';
import { useAuthApi } from '@api';

const useAuth = () => {
  const userStore = useUserStore();
  const { signin, logout } = useAuthApi();

  const handleSignIn = async (username, password) => {
    const data = await signin({ username, password });

    console.log(data);

    // set To Locale Storage and Pinia
    const user = {
      ...data.user,
      permissions: data.permissions
    };

    userStore.setUser(user);
    userStore.setAccessToken(data.access_token);
  };

  const handleLogout = async () => {
    const data = await logout();
    if(data.status === "ok") {
      userStore.clearUser();
    }
  };

  return {
    handleSignIn,
    handleLogout
  }
};

export default useAuth;
