<script setup>
import { useRouter } from 'vue-router';

defineProps({
  teams: {
    type: Array,
    required: true,
    default: []
  },
  subStatuses: {
    type: Array,
    required: true,
    default: []
  },
  handleEditTeam: {
    type: Function,
    required: true
  },
  handleSaveTeam: {
    type: Function,
    required: true
  },
  handleDeleteTeam: {
    type: Function,
    required: true
  },
});

const router = useRouter();

const css = {
  th: 'text-left border border-slate-200 p-1 whitespace-nowrap',
  td: 'border border-slate-200 p-1',
  icon: 'hover:text-gray-300 cursor-pointer',
};
</script>

<template>
  <div class="z-1 w-full">
    <table class="z-1 w-full border-collapse border border-slate-200 table-fixed">
      <thead>
        <tr>
          <th 
            :class="[css.th, 'w-[50px]']"
          >
          </th>
          <th 
            :class="[css.th, 'w-[50px]']"
          >
            ID
          </th>
          <th 
            :class="[css.th, 'w-[150px]']"
          >
            Название
          </th>
          <th 
            :class='css.th'
          >
            Статусы
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="team in teams"
          :key="team.id"
          class="bg-white z-1"
        >
          <td :class='css.td'>
            <div
              class="flex justify-center items-center space-x-2"
            >
              <Icon 
                v-if="!team.is_editable"
                :icon="['fas', 'pen-to-square']" 
                :class="css.icon"
                @click="handleEditTeam(team.id)"
              />
              <Icon 
                v-else
                :icon="['fas', 'floppy-disk']" 
                :class="css.icon"
                @click="handleSaveTeam(team.id)"
              />
              <Icon 
                :icon="['fas', 'trash']" 
                :class="css.icon"
                @click="handleDeleteTeam(team.id)"
              />
            </div>
          </td>
          <td :class="[css.td, 'w-[50px]']">
            <p 
              class="text-blue-900 font-semibold cursor-pointer hover:underline"
              @click="() => router.push(`/teams/${team.id}`)"
            >
              {{ team.id ?? "-" }}
            </p>
          </td>
          <td :class="[css.td, 'w-[200px]']">
            <p v-if="!team.is_editable">{{ team.title ?? '-' }}</p>
            <Input
              v-else
              :id="'team' + team.id"
              type="text"
              v-model="team.title"
              placeholder="Название..."
              class="text-xs p-1"
            />
          </td>
          <td :class="[css.td, 'w-[200px]']">
            <div 
              v-if="!team.is_editable"  
              class="flex items-center gap-3"
            >
              <p 
                v-for="sub_status in team.sub_status_ids"
                :key="sub_status"
              >
                {{ sub_status }}
              </p>
            </div>
            <Select
              v-else
              v-model="team.sub_status_ids"
              :options="subStatuses"
              value="id"
              label="name"
              multiple
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-center justify-center" v-if="teams.length === 0">
    <p class="font-bold text-2xl">Города не найдены</p>
  </div>
</template>