<script setup>
import { useRouter } from 'vue-router';
import AuthForm from './blocks/AuthForm.vue';
const router = useRouter();

const handlePress = (url) => {
  router.push(`/auth/${url}`)
};
</script>

<template>
  <AuthForm>
    <div class="w-1/2 flex flex-col items-center justify-center gap-6 border-r border-slate-200 px-24">
      <Button
        text="Админ"
        class="rounded-lg w-full bg-blue-500 focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-700"        
        @click="() => handlePress('admin')"
      />
      <Button
        text="Вебмастер"
        class="rounded-lg w-full bg-blue-500 focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-700"        
        @click="() => handlePress('webmaster')"
      />
      <Button
        text="Оператор"
        class="rounded-lg w-full bg-blue-500 focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-700"        
        @click="() => handlePress('operator')"
      />
    </div>
  </AuthForm>
</template>
