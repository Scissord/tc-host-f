<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthApi } from '@api';
import { useConnectionStore } from '@store';

const connection = useConnectionStore();

const router = useRouter();

const { signin } = useAuthApi();

const login = ref('');
const password = ref('');

const handleSignIn = async () => {
  await signin(login.value, password.value);
  // connection.connect();
  router.push('/');
};
</script>

<template>
  <form @submit.prevent="handleLogin" class="w-1/2 flex flex-col justify-between p-12">
    <div class="flex flex-col gap-6">
      <div class="flex items-center justify-center">
        <img
          src="/pics/logo.png"
          class="w-24"
        />
      </div>
      <h1 class="text-4xl font-semibold text-center">
        Авторизация
      </h1>
    </div>

    <div class="flex flex-col gap-6">
      <div class="mx-12">
        <label for="login" class="block text-sm font-medium">
          Логин
        </label>
        <Input
          id="login"
          type="text"
          v-model="login"
          placeholder="username"
          required
        />
      </div>

      <div class="mx-12">
        <label for="password" class="block text-sm font-medium">
          Пароль
        </label>
        <Input
          id="password"
          type="password"
          v-model="password"
          placeholder="******"
          class=""
          required
        />
      </div>
    </div>

    <div class="mx-12">
      <Button
        type="submit"
        text="Принять"
        class="rounded-lg w-full bg-blue-500 focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-700"        
        @click="handleSignIn"
      />
    </div>

    <div class="flex flex-col">
      <p class="text-sm text-center text-gray-600">
        Забыли свой пароль?
        <a href="#" class="text-blue-600 hover:underline">Восстановить</a>
      </p>
    </div>
  </form>
</template>

<style scoped>
</style>
