<template>
  <section class="p-6 bg-gray-50">
    <!-- Header -->
    <div class="mb-4">
      <h2 class="text-xl font-bold text-gray-800">Все пользователи</h2>
      <p class="text-sm text-gray-500">Список всех пользователей</p>
    </div>

    <!-- Table Controls -->
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center space-x-4">
        <select
          class="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600"
        >
          <option value="10">Показать 10</option>
          <option value="20">Показать 20</option>
          <option value="50">Показать 50</option>
        </select>
        <button
          class="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 text-gray-600"
        >
          <i class="fa-solid fa-download"></i> Экспорт
        </button>
      </div>
      <div class="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search User"
          class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring focus:ring-blue-300 w-48"
        />
        <div class="relative">
          <button
            class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-200 text-gray-600"
          >
            Выбрать роль
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3 text-sm font-semibold text-gray-700">ID</th>
            <th class="px-6 py-3 text-sm font-semibold text-gray-700">Пользователь</th>
            <th class="px-6 py-3 text-sm font-semibold text-gray-700">Логин</th>
            <th class="px-6 py-3 text-sm font-semibold text-gray-700">Пароль</th>
            <th class="px-6 py-3 text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          
          <tr v-for="user in users" :key="user.login" class="hover:bg-gray-50">
            <td class="px-6 py-4 w-1 text-gray-600 text-sm">{{ user.id }}</td>
            <td class="px-6 py-4 flex items-center gap-2">
              <img
                :src="user.avatar"
                alt="Profile Picture"
                class="w-8 h-8 rounded-full border"
              />
              <span class="text-gray-700 font-medium">{{ user.name }}</span>
            </td>
            <td class="px-6 py-4 text-gray-600 text-sm">{{ user.login }}</td>
            <td class="px-6 py-4 text-gray-600 text-sm">{{ user.password }}</td>
            <td class="px-6 py-4 text-gray-600 text-sm">{{ user.actions }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="p-4 border-t bg-gray-100 flex justify-between items-center">
        <p class="text-sm text-gray-600">Showing 1 to 10 of 50 entries</p>
        <div class="flex items-center gap-2">
          <button
            class="px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 text-gray-600"
          >
            1
          </button>
          <button
            class="px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 text-gray-600"
          >
            2
          </button>
          <button
            class="px-3 py-1 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 text-gray-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const users = [
  {
    id: "1",
    name: "Zsasza McCleverty",
    login: "zmcclevertye@soundcloud.com",
    password: "Password1",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp.webp",
  },
  {
    id: "2",
    name: "Yoko Pottie",
    login: "ypottiec@privacy.gov.au",
    password: "Subscriber",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp2.webp",
  },
  {
    id: "3",
    name: "Wesley Burland",
    login: "wburland@uiuc.edu",
    password: "Editor",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp.webp",
  },
  {
    id: "4",
    name: "Vladimir Koschek",
    login: "vkoschek17@abc.net.au",
    password: "Author",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp2.webp",
  },
  {
    id: "5",
    name: "Tyne Widmore",
    login: "twidmore12@bravesites.com",
    password: "Subscriber",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp.webp",
  },
  {
    id: "6",
    name: "Travus Bruntjen",
    login: "tbruntjen@sitemeter.com",
    password: "Admin",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp2.webp",
  },
  {
    id: "7",
    name: "Stu Delamaine",
    login: "sdelamainek@who.int",
    password: "Author",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp.webp",
  },
  {
    id: "8",
    name: "Saunder Offner",
    login: "soffner19@mac.com",
    password: "Maintainer",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp2.webp",
  },
  {
    id: "9",
    name: "Stephen MacGilfoyle",
    login: "smacgilfoyle@bigcartel.com",
    password: "Maintainer",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp.webp",
  },
  {
    id: "10",
    name: "Skip Hebblethwaite",
    login: "shebblethwaite10@arizona.edu",
    password: "Admin",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp2.webp",
  }
]
</script>
