<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const props = defineProps({
  department_id: [String, Number],
  createTeam: {
    type: Function,
    required: true
  },
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
})

const modal = useModalStore();
const notification = useNotificationStore();

const team = reactive({
  title: "",
  sub_status_ids: "",
  department_id: props.department_id,
});

const handleCreateTeam = async () => {
  if(!team.title || team.sub_status_ids.length === 0){
    notification.show('Заполните все поля!', 'warning');
    return;
  };
  const data = await props.createTeam(team);
  props.teams.push(data.team);
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Название команды</h1>
      <Input
        id="add_team_title"
        type="text"
        v-model="team.title"
        placeholder="Название..."
      />
    </div>
    <div class="grid grid-cols-2 gap-6">
      <h1>Статусы для обработки</h1>
      <Select
        v-model="team.sub_status_ids"
        :options="subStatuses"
        value="id"
        label="name"
        multiple
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreateTeam"
        class="bg-green-500 hover:bg-green-400"
      />
      <Button
        text="Закрыть"
        @click="modal.hide"
        class="bg-red-500 hover:bg-red-400"
      />
    </div>

  </div>
</template>