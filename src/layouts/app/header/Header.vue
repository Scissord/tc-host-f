<script setup>
import { ref } from "vue";
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
  css,
  isSidebarExpanded = ref(false),
} = useHeader();

// Handle sidebar hover
const handleSidebarHover = () => {
  isSidebarExpanded.value = true;
};

const handleSidebarLeave = () => {
  isSidebarExpanded.value = false;
};
</script>


<template>
  <header v-if='user.isAuthenticated' 
  :class="css.header"
  @mouseenter="handleSidebarHover"
  @mouseleave="handleSidebarLeave"
>
  <div :class="css.sidebarContainer">
    <div :class="css.topSection">
      <nav :class="css.nav">
        <!-- Главная -->
        <router-link
          to="/"
          v-if="user.data.abilities.includes(state.get_users)"
          :class="css.link"
        >
          <div :class="css.logoContainer" :style="{ marginLeft: isSidebarExpanded ? '35px' : 'auto'}">
          <img
            src="/pics/logo.png"
          />
          </div>
          <!-- </span> -->
        </router-link>
        <!-- Заказы (все)  -->
        <router-link
          to="/user/orders"
          v-if="user.data.abilities.includes(state.get_orders)"
          :class="css.link"
        >
          <Icon :class="css.icon" icon="fa-solid fa-cart-shopping" />
          <span v-if="isSidebarExpanded">Заказы</span>
        </router-link>
        
        <!-- Заказы вебмастер -->
        <router-link
          to="/webmaster/orders"
          v-if="user.data.webmaster_id"
          :class="css.link"
        >
          <Icon :class="css.icon" icon="fa-solid fa-cart-shopping" />
          <span v-if="isSidebarExpanded">Заказы</span>
        </router-link>

        <!-- Заказы оператор  -->
        <router-link
          to="/operator/orders"
          v-if="user.data.operator_id"
          :class="css.link"
        >
          <Icon :class="css.icon" icon="fa-solid fa-cart-shopping" />
          <span v-if="isSidebarExpanded">Заказы</span>
        </router-link>
        <!-- Офферы  -->
        <router-link
          to="/products"
          v-if="user.data.abilities.includes(state.get_products)"
          :class="css.link"
        >
          <Icon :class="css.icon" icon="fa-solid fa-circle" />
          <span v-if="isSidebarExpanded">Офферы</span>
        </router-link>
        <!-- Офферы  -->
        <router-link
          to="/cities"
          v-if="user.data.abilities.includes(state.get_cities)"
          :class="css.link"
        >
          <Icon :class="css.icon" icon="fa-solid fa-city" />
          <span v-if="isSidebarExpanded">Города</span>
        </router-link>
        <!-- Отделы  -->
        <router-link
          to="/departments"
          v-if="user.data.abilities.includes(state.get_departments)"
          :class="css.link"
        >
          <Icon :class="css.icon" icon="fa-solid fa-building-user" />
          <span v-if="isSidebarExpanded">Отделы</span>
        </router-link>
        <!-- Status  -->
        <router-link
          to="/statuses"
          v-if="user.data.abilities.includes(state.get_statuses)"
          :class="css.link"
        >
          <Icon :class="css.icon" icon="fa-solid fa-circle-check" />
          <span v-if="isSidebarExpanded">Статусы</span>
        </router-link>

        <!-- Admin  -->
        <router-link
          to="/admin"
          v-if="user.data.abilities.includes(state.get_users)"
          :class="css.link"
        >
          <Icon :class="css.icon" icon="fa-solid fa-user-tie" />
          <span v-if="isSidebarExpanded">Админ</span>
        </router-link>
    </nav>
  </div>
 

  <div :class="[css.bottomSection]">
    <!-- Language Icon with Text -->
    <div :class="[css.iconWithText]">
      <span><Icon icon="fa-solid fa-language"/>{{ isSidebarExpanded ? " Язык" : "" }}</span>
    </div>

    <!-- Theme Toggle Icon with Text -->
    <div :class="[css.iconWithText]">
      <Icon
        :icon="theme.theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"
        @click="theme.toggleTheme"/>
      <span v-if="isSidebarExpanded">
        {{ theme.theme === 'light' ? 'Темный Режим' : 'Светлый Режим' }}
      </span>
    </div>
          <div v-if="user.isAuthenticated" :class="css.iconWithText">
        <div :class="css.userMenuWrapper" @mouseleave="hideUserMenu">
          <!-- User Icon with Username -->
          <div
            @click="showUserMenu"
            title="User Menu"
            class="flex items-center gap-2 cursor-pointer"
          >
            <Icon icon="fa-solid fa-circle-user" />
            <span v-if="isSidebarExpanded">{{ user.data.login }}</span>
          </div>

          <!-- Dropdown Menu -->
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
  </div>

  </header>
</template>
