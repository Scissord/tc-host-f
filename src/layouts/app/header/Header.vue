<script setup>
import { computed, ref } from 'vue';
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
  isSidebarExpanded,
  handleSidebarHover,
  handleSidebarLeave,
  css,
} = useHeader();

const rootUrl = computed(() => {
  if(user.data.webmaster_id) {
    return '/webmaster/statistics';
  };
  if(user.data.operator_id) {
    return '/operator/statistics';
  };
  return '/user/statistics';
});
</script>


<template>
  <header v-if='user.isAuthenticated' 
    :class="css.header"
    @mouseenter="handleSidebarHover"
    @mouseleave="handleSidebarLeave"
  >
    <nav :class="[css.nav, isSidebarExpanded ? 'px-4 gap-4' : 'gap-7']">
      <!-- Главная -->
      <router-link
        :to="rootUrl"
        :class="[css.link, 'justify-center']"
      >
        <img
          src="/pics/logo.png"
          :class="[css.logo, isSidebarExpanded ? 'w-16' : 'w-11']"
        />
      </router-link>
      <!-- Заказы (все)  -->
      <router-link
        to="/user/orders"
        v-if="user.data.abilities.includes(state.get_orders)"
        :class="[css.link, isSidebarExpanded ? css.openLink : css.closedLink]"
      >
        <Icon :class="css.icon" icon="fa-solid fa-cart-shopping" />
        <span v-if="isSidebarExpanded">Заказы</span>
      </router-link>
      <!-- Заказы вебмастер -->
      <router-link
        to="/webmaster/orders"
        v-if="user.data.webmaster_id"
        :class="[css.link, isSidebarExpanded ? css.openLink : css.closedLink]"
      >
        <Icon :class="css.icon" icon="fa-solid fa-cart-shopping" />
        <span v-if="isSidebarExpanded">Заказы</span>
      </router-link>
      <!-- Заказы оператор  -->
      <router-link
        to="/operator/orders"
        v-if="user.data.operator_id && !user.data.abilities.includes(state.get_orders)"
        :class="[css.link, isSidebarExpanded ? css.openLink : css.closedLink]"
      >
        <Icon :class="css.icon" icon="fa-solid fa-cart-shopping" />
        <span v-if="isSidebarExpanded">Заказы</span>
      </router-link>
      <!-- Офферы  -->
      <router-link
        to="/products"
        v-if="user.data.abilities.includes(state.get_products)"
        :class="[css.link, isSidebarExpanded ? css.openLink : css.closedLink]"
      >
        <Icon :class="css.icon" icon="fa-solid fa-box" />
        <span v-if="isSidebarExpanded">Офферы</span>
      </router-link>
      <!-- Офферы  -->
      <router-link
        to="/cities"
        v-if="user.data.abilities.includes(state.get_cities)"
        :class="[css.link, isSidebarExpanded ? css.openLink : css.closedLink]"
      >
        <Icon :class="css.icon" icon="fa-solid fa-city" />
        <span v-if="isSidebarExpanded">Города</span>
      </router-link>
      <!-- Отделы  -->
      <router-link
        to="/departments"
        v-if="user.data.abilities.includes(state.get_departments)"
        :class="[css.link, isSidebarExpanded ? css.openLink : css.closedLink]"
      >
        <Icon :class="css.icon" icon="fa-solid fa-building-user" />
        <span v-if="isSidebarExpanded">Отделы</span>
      </router-link>
      <!-- Status  -->
      <router-link
        to="/statuses"
        v-if="user.data.abilities.includes(state.get_statuses)"
        :class="[css.link, isSidebarExpanded ? css.openLink : css.closedLink]"
      >
        <Icon :class="css.icon" icon="fa-solid fa-circle-check" />
        <span v-if="isSidebarExpanded">Статусы</span>
      </router-link>
      <!-- Admin  -->
      <router-link
        to="/admin"
        v-if="user.data.abilities.includes(state.get_users)"
        :class="[css.link, isSidebarExpanded ? css.openLink : css.closedLink]"
      >
        <Icon :class="css.icon" icon="fa-solid fa-lock" />
        <span v-if="isSidebarExpanded">Админ</span>
      </router-link>
    </nav>

    <div :class="[css.nav, isSidebarExpanded ? 'px-4 gap-4' : 'gap-7']">
      <!-- <div 
        :class="[css.link, isSidebarExpanded ? css.openLink : css.closedLink]"
      >
        <Icon icon="fa-solid fa-language"/>
        <span v-if="isSidebarExpanded">Язык</span>
      </div>

      <div 
        :class="[css.link, isSidebarExpanded ? css.openLink : css.closedLink]"
        @click="theme.toggleTheme"
      >
        <Icon
          :icon="theme.theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"
        />
        <span v-if="isSidebarExpanded">
          {{ theme.theme === 'light' ? 'Темная' : 'Светлая' }}
        </span>
      </div> -->

      <div 
        v-if="user.isAuthenticated"
        @click="showUserMenu"
        :class="[css.link, isSidebarExpanded ? css.openLink : css.closedLink]"
      >
        <div :class="css.userMenuWrapper" @mouseleave="hideUserMenu">
          <div
            title="User Menu"
            class="flex items-center gap-2 cursor-pointer"
          >
            <Icon :class="css.icon" icon="fa-solid fa-circle-user" />
            <span v-if="isSidebarExpanded">{{ user.data.login.length > 8 ? user.data.login.slice(0, 8) : user.data.login }}</span>
          </div>
          <div
            v-if="isUserMenuOpen"
            :class="css.userMenuExpanded"
          >
            <div :class="css.userLink" @click="hideUserMenu">
              <Icon icon="fa-solid fa-cog" />
              <span>Настройки</span>
            </div>
            <div :class="css.userLink" @click="handleLogout">
              <Icon icon="fa-solid fa-sign-out-alt" />
              <span>Выход</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
