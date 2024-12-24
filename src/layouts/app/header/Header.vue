<script setup>
import { useHeader } from "@hooks";
import { useUserStore, useThemeStore } from "@store";

const user = useUserStore();
const theme = useThemeStore();

const { 
  state,
  isUserMenuOpen,
  showUserMenu,
  hideUserMenu,
  handleLogout,
  css
} = useHeader();
</script>

<template>
  <header v-if='user.isAuthenticated' :class="css.header">
    <div :class="css.container">
      <nav :class="css.nav">
        <!-- Главная -->
        <router-link
          to="/"
          :class="css.link"
        >
          <img
            src="/pics/logo.png"
            :class="css.logo"
          />
        </router-link>
        <!-- Заказы (все)  -->
        <router-link
          to="/user/orders"
          v-if="user.data.abilities.includes(state.get_orders)"
          :class="css.link"
        >
          Заказы
        </router-link>
        <!-- Заказы вебмастер -->
        <router-link
          to="/webmaster/orders"
          v-if="user.data.webmaster_id"
          :class="css.link"
        >
          Заказы
        </router-link>
        <!-- Заказы оператор  -->
        <router-link
          to="/operator/orders"
          v-if="user.data.operator_id"
          :class="css.link"
        >
          Заказы
        </router-link>
        <!-- Офферы  -->
        <router-link
          to="/products"
          v-if="user.data.abilities.includes(state.get_products)"
          :class="css.link"
        >
          Офферы
        </router-link>
        <!-- Офферы  -->
        <router-link
          to="/cities"
          v-if="user.data.abilities.includes(state.get_cities)"
          :class="css.link"
        >
          Города
        </router-link>
        <!-- Отделы  -->
        <router-link
          to="/departments"
          v-if="user.data.abilities.includes(state.get_departments)"
          :class="css.link"
        >
          Отделы
        </router-link>
        <!-- Отделы  -->
        <router-link
          to="/statuses"
          v-if="user.data.abilities.includes(state.get_statuses)"
          :class="css.link"
        >
          Статусы
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
              <li :class="css.userLink">{{ user.data.login }}</li>
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
