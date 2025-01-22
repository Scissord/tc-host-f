<template>
  <section class="p-6 bg-gray-50">
    <!-- Header -->
    <div class="mb-4">
      <h2 class="text-xl font-bold text-gray-800">Роли</h2>
      <p class="text-sm text-gray-500">Список ролей пользователей</p>
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
            <th class="px-6 py-3 text-sm font-semibold text-gray-700">
              Пользователь
            </th>
            <th class="px-6 py-3 text-sm font-semibold text-gray-700">Город</th>
            <th class="px-6 py-3 text-sm font-semibold text-gray-700">
              Команда
            </th>
            <th class="px-6 py-3 text-sm font-semibold text-gray-700">
              Зарплата
            </th>
            <th class="px-6 py-3 text-sm font-semibold text-gray-700">
              Дата начала работы
            </th>
            <th class="px-6 py-3 text-sm font-semibold text-gray-700">Логин</th>
            <th class="px-6 py-3 text-sm font-semibold text-gray-700">
              Пароль
            </th>
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
            <td class="px-6 py-4 text-gray-600 text-sm">{{ user.city }}</td>
            <td class="px-6 py-4 text-gray-600 text-sm">{{ user.team }}</td>
            <td class="px-6 py-4 text-gray-600 text-sm">{{ user.wage }}</td>
            <td class="px-6 py-4 text-gray-600 text-sm">{{ user.date }}</td>
            <td class="px-6 py-4 text-gray-600 text-sm">{{ user.login }}</td>
            <td class="px-6 py-4 text-gray-600 text-sm">{{ user.password }}</td>
            <td class="px-6 py-4 text-gray-600 text-sm">
              <button
                class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition flex items-center space-x-2"
              >
                <i class="fa fa-plus"></i>
                <span>Изменить</span>
              </button>
            </td>
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
    name: "Skip Hebblethwaite",
    city: "London",
    team: "Satourn",
    wage: "120.000kzt",
    date: "12.12.2012",
    login: "shebblethwaite10@arizona.edu",
    password: "Admin",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp2.webp",
  },
  {
    id: "2",
    name: "Albert Cook",
    city: "New York",
    team: "Asteroid",
    wage: "150.000kzt",
    date: "23.11.2015",
    login: "albertcook@email.com",
    password: "Editor",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp.webp",
  },
  {
    id: "3",
    name: "Trevor Baker",
    city: "Chicago",
    team: "Comet",
    wage: "130.000kzt",
    date: "08.06.2018",
    login: "trevorbaker@email.com",
    password: "Author",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp2.webp",
  },
  {
    id: "4",
    name: "Jerry Milton",
    city: "Los Angeles",
    team: "Galaxy",
    wage: "110.000kzt",
    date: "14.04.2020",
    login: "jerrymilton@email.com",
    password: "Maintainer",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp.webp",
  },
  {
    id: "5",
    name: "Barry Hunter",
    city: "San Francisco",
    team: "Star",
    wage: "140.000kzt",
    date: "22.02.2019",
    login: "barryhunter@email.com",
    password: "Subscriber",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp2.webp",
  },
  {
    id: "6",
    name: "Yoko Pottie",
    city: "Tokyo",
    team: "Moon",
    wage: "125.000kzt",
    date: "18.10.2021",
    login: "yokopottie@email.com",
    password: "Admin",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp.webp",
  },
  {
    id: "7",
    name: "Wesley Burland",
    city: "Berlin",
    team: "Asteroid",
    wage: "135.000kzt",
    date: "30.07.2017",
    login: "wesleyburland@email.com",
    password: "Author",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp2.webp",
  },
  {
    id: "8",
    name: "Vladimir Koschek",
    city: "Moscow",
    team: "Comet",
    wage: "145.000kzt",
    date: "05.03.2016",
    login: "vladimirkoschek@email.com",
    password: "Editor",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp.webp",
  },
  {
    id: "9",
    name: "Tyne Widmore",
    city: "Sydney",
    team: "Galaxy",
    wage: "115.000kzt",
    date: "27.09.2019",
    login: "tynewidmore@email.com",
    password: "Maintainer",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp2.webp",
  },
  {
    id: "10",
    name: "Stu Delamaine",
    city: "Paris",
    team: "Star",
    wage: "120.000kzt",
    date: "15.05.2014",
    login: "studelamaine@email.com",
    password: "Subscriber",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp.webp",
  },
  {
    id: "11",
    name: "Saunder Offner",
    city: "Rome",
    team: "Moon",
    wage: "150.000kzt",
    date: "19.11.2013",
    login: "saunderoffner@email.com",
    password: "Admin",
    actions: "some actions",
    avatar: "/pics/placeholders/pfp2.webp",
  },
];
</script>
