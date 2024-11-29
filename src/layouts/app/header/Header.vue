<script setup>
import { useUserStore, useThemeStore } from "@store";
import { useRouter } from "vue-router";

const user = useUserStore();
const theme = useThemeStore();
const router = useRouter();

const css = {
  header: `
    sticky top-0 w-full z-30
    h-[6vh] flex items-center
    justify-center bg-zinc-900
    text-white bg-opacity-75
  `,
  container: `
    h-full container mx-auto
    px-40 flex items-center
    justify-between
  `,
  logo: `
    w-10 cursor-pointer
  `,
  nav: `
    flex items-center
    gap-8 text-sm w-full
  `,
  link: `
    hover:text-neutral-200
    hover:text-opacity-50
    transition duration-300
    ease cursor-pointer
  `,
};
</script>

<template>
  <header :class="css.header">
    <div :class="css.container">
      <nav :class="css.nav">
        <img
          src="/pics/logo.png"
          :class="css.logo"
        />
        <router-link
          to="/script/1284255/202690"
          :class="css.link"
        >
          Скрипт
        </router-link>
        <router-link
          to="/admin"
          :class="css.link"
        >
          Админ
        </router-link>
        <Icon
          icon="fa-solid fa-language"
          :class="css.link"
        />
        <Icon
          :icon="theme.theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"
          :class="css.link"
          @click="theme.toggleTheme"
        />
        <Icon
          v-if="!user.isAuthenticated"
          icon="fa-solid fa-circle-user"
          :class="css.  k"
          @click='router.push("/auth")'
        />
      </nav>
    </div>
  </header>
</template>

<style>
</style>
