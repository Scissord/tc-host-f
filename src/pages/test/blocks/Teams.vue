<template>
  <section class="p-6 bg-gray-50">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-800">Команды</h2>
      <p class="text-sm text-gray-500">
        Здесь показаны все команды, которые доступны.
      </p>
    </div>

    <!-- Teams Grid -->
    <div class="grid grid-cols-4 gap-5">
      <!-- Team Cards -->
      <div
        v-for="team in teams"
        :key="team.name"
        class="bg-white rounded-lg shadow p-4 hover:shadow-lg transition h-40 flex flex-col justify-between"
      >
        <!-- Team Header -->
        <div class="flex justify-between items-center">
          <p class="text-sm text-gray-500">
            Всего {{ team.membersCount }} участников
          </p>
          <div class="flex items-center space-x-2">
            <div
              v-for="(member, index) in team.members"
              :key="index"
              class="w-6 h-6 rounded-full overflow-hidden"
            >
              <img
                :src="member.avatar"
                alt="Member Avatar"
                class="w-full h-full"
              />
            </div>
            <span v-if="team.extraMembers" class="text-xs text-gray-500">
              +{{ team.extraMembers }}
            </span>
          </div>
        </div>

        <!-- Team Name -->
        <h3 class="text-lg font-semibold text-gray-700">
          {{ team.name }}
        </h3>

        <!-- Edit Link -->
        <div class="flex justify-between items-center">
          <a href="#" class="text-blue-500 text-sm hover:underline">
            Редактировать
          </a>
          <button class="text-gray-500 hover:text-gray-700">
            <i class="fa fa-users"></i>
          </button>
        </div>
      </div>

      <!-- Add Team Card -->
      <div
        class="bg-white rounded-lg shadow p-4 hover:shadow-lg transition flex items-center justify-between h-40"
      >
        <!-- Image Section -->
        <img
          src="/pics/placeholders/newrole.webp"
          alt="Add Team Icon"
          class="w-16 h-22 object-contain"
        />

        <!-- Text and Button Section -->
        <div class="text-right ml-4">
          <button
            @click.prevent="openTeamModal"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Добавить
          </button>
          <p class="text-sm text-gray-500 mt-2">
            Добавьте команду, если она не существует
          </p>
        </div>
      </div>
    </div>

    <!-- Teams Add Modal -->
    <TeamsAddModal
      :isVisible="isTeamModalVisible"
      @close="isTeamModalVisible = false"
      @teamAdded="handleNewTeam"
    />
  </section>
</template>

<script setup>
import TeamsAddModal from "./TeamsAddModal.vue";
import { ref } from "vue";

// Teams Data
const teams = [
  {
    name: "Сатурн",
    membersCount: 10,
    members: [
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp2.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
    ],
    extraMembers: 7,
  },
  {
    name: "Марс",
    membersCount: 8,
    members: [
      { avatar: "/pics/placeholders/pfp2.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp2.webp" },
    ],
    extraMembers: 5,
  },
  {
    name: "Меркурий",
    membersCount: 6,
    members: [
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp2.webp" },
    ],
    extraMembers: 4,
  },
  {
    name: "Венера",
    membersCount: 12,
    members: [
      { avatar: "/pics/placeholders/pfp2.webp" },
      { avatar: "/pics/placeholders/pfp.webp" },
      { avatar: "/pics/placeholders/pfp2.webp" },
    ],
    extraMembers: 9,
  },
];

// Modal States
const isTeamModalVisible = ref(false);

const openTeamModal = () => {
  isTeamModalVisible.value = true;
};

const handleNewTeam = (newTeam) => {
  console.log("New team added:", newTeam);
  // Handle adding new team to the list
};
</script>
