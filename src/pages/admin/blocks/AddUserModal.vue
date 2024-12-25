<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const modal = useModalStore();
const notification = useNotificationStore();

const props = defineProps({
  createUser: {
    type: Function,
    required: true
  },
  users: {
    type: Array,
    required: true,
    default: []
  },
})

const user = reactive({
  login: "",
  password: "",
  name: "",
});

const handleCreateUser = async () => {
  if(!user.login || !user.password || !user.name){
    notification.show('Заполните все поля!', 'warning');
    return;
  };
  const data = await props.createUser(user);
  props.users.push(data.user);
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Логин</h1>
      <Input
        id="add_user_login"
        type="text"
        v-model="user.login"
        placeholder="..."
      />
      <h1>Пароль</h1>
      <Input
        id="add_user_password"
        type="password"
        v-model="user.password"
        placeholder="..."
      />
      <h1>Имя</h1>
      <Input
        id="add_user_name"
        type="text"
        v-model="user.name"
        placeholder="..."
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreateUser"
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