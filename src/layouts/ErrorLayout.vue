<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <main class="relative min-h-screen">
    <Icon
      :icon="['fas', 'circle-arrow-left']"
      class="absolute top-5 left-5 text-2xl cursor-pointer hover:text-gray-300 transition duration-300 ease-in-out"
      @click="router.push('/')"
    />
    <router-view/>
  </main>
</template>

<style>
</style>
