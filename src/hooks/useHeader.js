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
  const isSidebarExpanded = ref(false);

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

  // Handle sidebar hover
  const handleSidebarHover = () => {
    isSidebarExpanded.value = true;
  };

  const handleSidebarLeave = () => {
    isSidebarExpanded.value = false;
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
      fixed top-0 left-0 z-30
      h-screen flex flex-col justify-between
      bg-zinc-900 text-white
      bg-opacity-90
      transition-all duration-300 ease-in-out
      w-[5vw] hover:w-[12vw]
    `,
    nav: `
      flex flex-col items-center
      py-6
    `,
    link: `
      w-full flex items-center gap-3
      whitespace-nowrap cursor-pointer
      transition-all duration-300 ease-in-out
    `,
    openLink: `
      justify-start hover:bg-gray-400 
      py-1 px-3 rounded-lg
    `,
    closedLink: `
      justify-center
    `,
    logo: `
      transition-all duration-300 ease-in-out  
    `,
    icon: `
      text-lg
    `,
    userMenuExpanded: `
      absolute bottom-full left-0
      bg-white border rounded shadow-md
      text-black text-sm
      w-[150px]
      opacity-100 pointer-events-auto
      transition-all duration-300 ease-in-out
    `,
    userMenuCollapsed: `
      mt-2 bg-white border rounded shadow-md
      text-black text-sm
      w-0 opacity-0
      pointer-events-none
      transition-all duration-300 ease-in-out
      absolute left-0
    `,
    userMenuWrapper: `
      relative
      flex flex-col items-start
    `,
    userMenu: `
      bg-white border rounded shadow-md
      text-black text-sm
    `,
    userLink: `
      flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer
    `,
  };

  return {
    state,
    isUserMenuOpen,
    showUserMenu,
    hideUserMenu,
    handleLogout,
    isSidebarExpanded,
    handleSidebarHover,
    handleSidebarLeave,
    css
  };
};

export default useHeader; 
