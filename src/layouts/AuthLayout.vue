<script setup>
import { onMounted, watch } from 'vue';
import { useUserStore } from '@store';
import { useRouter } from 'vue-router';

const user = useUserStore();
const router = useRouter();

onMounted(() => {
  if (user.isAuthenticated) {
    router.push('/');
  }
});
</script>

<template>
  <main class="min-h-screen flex items-center justify-center relative bg-[url('/pics/auth/forest.jpg')] bg-no-repeat bg-center bg-cover">
    <div className="absolute inset-0 bg-black bg-opacity-50" />
    <router-view/>
  </main>
</template>

<style>
</style>
