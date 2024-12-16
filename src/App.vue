<script setup>
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { socket } from '@/plugins/socket';
import { useUserStore, useConnectionStore } from '@store';
import { useOrder } from '@hooks';

const route = useRoute();
const router = useRouter();

const user = useUserStore();
const connection = useConnectionStore();

const order = useOrder();

socket.off();
connection.bindEvents();
order.bindEvents();

watch(() => user.isAuthenticated, (isAuthenticated) => {
  if(!isAuthenticated) {
    router.push('/auth');
  } else {
    connection.connect();
  };
});

onMounted(() => {
  if(route.path !== 'auth' && !connection.isConnected) {
    if(!user.isAuthenticated) {
      connection.disconnect();
      router.push('/auth')
      return
    }
    connection.connect();
  };
});
</script>

<template>
  <div 
    :class="[
      'absolute top-2 right-2 text-white p-1 z-50',
      connection.isConnected ? 'bg-green-500' : 'bg-red-500'
    ]"
  >
    {{ connection.isConnected }}
  </div>
  <router-view />
</template>

<style>
</style>
