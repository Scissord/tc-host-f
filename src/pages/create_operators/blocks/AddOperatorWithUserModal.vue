<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const modal = useModalStore();
const notification = useNotificationStore();

const props = defineProps({
  createOperatorWithUser: {
    type: Function,
    required: true
  },
  teams: {
    type: Array,
    required: true,
    default: []
  },
});

const operator = reactive({
  login: null,
  password: null,
  name: null,
  team_id: null,
});

const handleCreateOperator = async () => {
  if(!operator.login || !operator.password || !operator.name || !operator.team_id){
    notification.show('Заполните все поля!', 'warning');
    return;
  };
  await props.createOperatorWithUser(operator);
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Логин</h1>
      <Input
        id="login"
        type="text"
        v-model="operator.login"
        placeholder="Логин..."
      />
      <h1>Пароль</h1>
      <Input
        id="password"
        type="text"
        v-model="operator.password"
        placeholder="******"
      />
      <h1>Имя</h1>
      <Input
        id="name"
        type="text"
        v-model="operator.name"
        placeholder="Имя..."
      />
      <h1>Команда</h1>
      <Select
        v-model="operator.team_id"
        :options="teams"
        value="id"
        label="title"
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreateOperator"
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