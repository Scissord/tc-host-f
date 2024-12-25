import { onMounted, ref } from 'vue';
import { useAuthApi, useAbilityApi } from '@api';
import { useConnectionStore } from '@store';
import { reactive } from 'vue';

const useHeader = () => {
  const state = reactive({
    get_orders: null,
    get_products: null,
    get_cities: null,
    get_departments: null,
    get_statuses: null,
    get_users: null,
  });

  const { logout } = useAuthApi();
  const { getAbilitiesForHeader } = useAbilityApi();

  const connection = useConnectionStore();

  const isUserMenuOpen = ref(false);

  const showUserMenu = () => {
    isUserMenuOpen.value = true;
  };

  const hideUserMenu = () => {
    isUserMenuOpen.value = false;
  };

  const handleLogout = async () => {
    connection.disconnect();
    await logout();
  };

  const handleGetUrls = async () => {
    const abilities = await getAbilitiesForHeader();
    state.get_orders = abilities.get_orders;
    state.get_products = abilities.get_products;
    state.get_cities = abilities.get_cities;
    state.get_departments = abilities.get_departments;
    state.get_statuses = abilities.get_statuses;
    state.get_users = abilities.get_users;
  };

  onMounted(async () => {
    await handleGetUrls();
  });

  const css = {
    header: `
      sticky top-0 w-full z-30
      h-[6vh] flex items-center
      justify-center bg-zinc-900
      text-white bg-opacity-90
    `,
    container: `
      h-full container mx-auto
      flex items-center
      justify-between
    `,
    logo: `
      w-8 cursor-pointer
    `,
    nav: `
      flex items-center
      justify-around
      gap-8 text-sm
      w-full
    `,
    link: `
      hover:text-neutral-200
      hover:text-opacity-50
      transition duration-300
      ease cursor-pointer
    `,
    icon: `
      hover:text-neutral-200
      hover:text-opacity-50
      transition duration-300
      ease cursor-pointer text-lg
    `,
    avatar: `
      hover:bg-opacity-50
      transition duration-300
      ease cursor-pointer
      rounded-full w-5
    `,
    userMenuWrapper: `
      relative inline-block
    `,
    userMenu: `
      absolute bg-white border
      rounded shadow-md
      text-black text-sm 
      left-1/2 transform 
      -translate-x-1/2
    `,
    userLink: `
      p-1 hover:bg-gray-100
      cursor-pointer
    `
  };

  return {
    state,
    isUserMenuOpen,
    showUserMenu,
    hideUserMenu,
    handleLogout,
    css
  };
};

export default useHeader; 
