<script setup>
import { ref } from 'vue';
import { useAuthApi } from '@api';
import { useUserStore, useThemeStore } from "@store";
import { useConnectionStore } from '@store';

const connection = useConnectionStore();

const user = useUserStore();
const theme = useThemeStore();

const { logout } = useAuthApi();

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
</script>

<template>
  <header v-if='user.isAuthenticated' :class="css.header">
    <div :class="css.container">
      <nav :class="css.nav">
        <router-link
          to="/"
          :class="css.link"
        >
          <img
            src="/pics/logo.png"
            :class="css.logo"
          />
        </router-link>
        <router-link
          to="/orders"
          v-if="user.data.abilities.includes('get_orders')"
          :class="css.link"
        >
          Заказы
        </router-link>
        <router-link
          to="/departments"
          :class="css.link"
        >
          Отделы
        </router-link>
        <!-- <router-link
          :to='`/webmaster/${user.data.role_id}`'
          v-if="+user.data.role.id === 4"
          :class="css.link"
        >
          Вебмастер
        </router-link> -->
        <!-- <router-link
          to="/script/1284255/202690"
          :class="css.link"
        >
          Скрипт
        </router-link> -->
        <!-- <router-link
          to="/edit_script"
          :class="css.link"
        >
          Редактор скрипта
        </router-link> -->
        <router-link
          to="/admin"
          v-if="user.data.abilities.includes('superadmin_page')"
          :class="css.link"
        >
          Админ
        </router-link>
        <router-link
          to="/products"
          v-if="user.data.abilities.includes('get_products')"
          :class="css.link"
        >
          Товары
        </router-link>
        <Icon
          icon="fa-solid fa-language"
          :class="css.icon + ' ml-auto'"
        />
        <Icon
          :icon="theme.theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"
          :class="css.icon"
          @click="theme.toggleTheme"
        />
        <div v-if="user.isAuthenticated" :class="css.userMenuWrapper">
          <Icon
            icon="fa-solid fa-circle-user"
            :class="css.icon"
            @mouseover="showUserMenu"
          />
          <div
            v-if="isUserMenuOpen"
            :class="css.userMenu"
            @mouseover="showUserMenu"
            @mouseleave="hideUserMenu"
          >
            <ul class="p-2">
              <li :class="css.userLink">Profile</li>
              <li :class="css.userLink">Setting</li>
              <li
                :class="css.userLink"
                @click="handleLogout"
              >
                Exit
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<style>
</style>
