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
      logoContainer: `
          flex items-center justify-center
          transition-all duration-300 ease-in-out  
          w-11
    `,
      header: `
          fixed top-0 left-0 z-30
          h-screen flex flex-col
          bg-zinc-900 text-white
          bg-opacity-90
          transition-all duration-100 ease-in-out
          w-[5vw] hover:w-[15vw]
      `,
      sidebarContainer: `
          flex flex-col justify-between
          h-full
          transition-all duration-300 ease-in-out
        
      `,
      topSection: `
          flex flex-col gap-4 p-4
          pb-auto
      `,
      bottomSection: `
          flex flex-col items-left ml-4 gap-4 p-4
          w-full
          transition-all duration-300 ease-in-out
      `,
      link: `
          whitespace-nowrap
      `,
      nav: `
          flex flex-col items-start
          justify-start gap-8
          w-full
      `,
      icon: `
          flex-shrink-0 text-lg
          w-[2.5vw] text-center
      `,
      iconWithText: `
          flex items-center gap-4
          text-white text-lg
          whitespace-nowrap
          transition-all duration-300 ease-in-out
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
      // items-start justify-start
      //
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
