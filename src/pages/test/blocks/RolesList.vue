<script setup>
import ModalEdit from "./ModalEdit.vue";
import { ref } from "vue";

// Mock data for roles
const roles = [
  {
    name: "Супенадмин",
    usersCount: 4,
    users: [
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
    ],
    extraUsers: 3,
  },
  {
    name: "Админ",
    usersCount: 7,
    users: [
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
    ],
    extraUsers: 3,
  },
  {
    name: "Оператор",
    usersCount: 5,
    users: [
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
    ],
    extraUsers: 3,
  },
  {
    name: "Вебмастер",
    usersCount: 3,
    users: [
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
    ],
    extraUsers: 3,
  },
  {
    name: "Начальник отдела",
    usersCount: 5,
    users: [
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
    ],
    extraUsers: 3,
  },
  {
    name: "Руководитель отдела продаж",
    usersCount: 2,
    users: [
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
    ],
    extraUsers: 3,
  },
  {
    name: "Вебмастер Тимлид",
    usersCount: 2,
    users: [
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
    ],
    extraUsers: 3,
  },
];

const isModalVisible = ref(false);
const selectedRole = ref(null);

const openModal = (role) => {
  selectedRole.value = role;
  isModalVisible.value = true;
};
</script>

<template>
  <section class="p-6 bg-gray-50">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-800">Список ролей</h2>
      <p class="text-sm text-gray-500">
        Здесь показаны все роли что администратор создал.
      </p>
    </div>

    <!-- Roles Grid -->
    <div class="grid grid-cols-4 gap-5">
      <!-- Role Cards -->
      <div
        v-for="role in roles"
        :key="role.name"
        class="bg-white rounded-lg shadow p-4 hover:shadow-lg transition h-40 flex flex-col justify-between"
      >
        <!-- Role Header -->
        <div class="flex justify-between items-center">
          <p class="text-sm text-gray-500">
            Всего {{ role.usersCount }} пользователей
          </p>
          <div class="flex items-center space-x-2">
            <div
              v-for="(user, index) in role.users"
              :key="index"
              class="w-6 h-6 rounded-full overflow-hidden"
            >
              <img :src="user.avatar" alt="User Avatar" class="w-full h-full" />
            </div>
            <span v-if="role.extraUsers" class="text-xs text-gray-500">
              +{{ role.extraUsers }}
            </span>
          </div>
        </div>

        <!-- Role Name -->
        <h3 class="text-lg font-semibold text-gray-700">
          {{ role.name }}
        </h3>

        <!-- Edit Link -->
        <div class="flex justify-between items-center">
          <a
            href="#"
            class="text-blue-500 text-sm hover:underline"
            @click.prevent="openModal(role)"
          >
            Редактировать
          </a>
          <button class="text-gray-500 hover:text-gray-700">
            <i class="fa fa-copy"></i>
          </button>
        </div>
      </div>

      <!-- Add Role Card -->
      <div
        class="bg-white rounded-lg shadow p-4 hover:shadow-lg transition flex items-center justify-between h-40"
      >
        <!-- Image Section -->
        <img
          src="/pics/placeholders/newrole.webp"
          alt="Add Role Icon"
          class="w-16 h-22 object-contain"
        />

        <!-- Text and Button Section -->
        <div class="text-right ml-4">
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Добавить
          </button>
          <p class="text-sm text-gray-500 mt-2">
            Добавьте роль, если она не существует
          </p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <ModalEdit
      v-if="isModalVisible"
      :role="selectedRole"
      :isVisible="isModalVisible"
      @close="isModalVisible = false"
    />
  </section>
</template>

<style scoped>
/* Ensures consistent card heights */
.bg-white {
  height: 10rem;
}
</style>
