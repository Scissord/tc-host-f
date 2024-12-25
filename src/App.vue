<script setup>
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { socket } from '@/plugins/socket';
import { useUserStore, useConnectionStore } from '@store';
import { 
  useUserOrdersStore,
  useWebmasterOrdersStore,  
  useOperatorOrdersStore, 
  useOrderStore 
} from '@store';
import { setup } from '@api';

setup();

const route = useRoute();
const router = useRouter();

const user = useUserStore();
const connection = useConnectionStore();

const userOrders = useUserOrdersStore();
const webmasterOrders = useWebmasterOrdersStore();
const operatorOrders = useOperatorOrdersStore();
const order = useOrderStore();

socket.off();
connection.bindEvents();
userOrders.bindEvents();
webmasterOrders.bindEvents();
operatorOrders.bindEvents();
order.bindEvents();

watch(() => user.isAuthenticated, (isAuthenticated) => {
  if(!isAuthenticated) {
    router.push('/auth');
  } else {
    connection.connect();
  };
});

onMounted(() => {
  if((
    route.path !== 'auth' || 
    route.path !== '/auth/user' ||
    route.path !== '/auth/webmaster' ||
    route.path !== '/auth/operator'
  ) && !connection.isConnected) {
    if(!user.isAuthenticated) {
      connection.disconnect();
      router.push('/auth');
      return;
    }
    connection.connect();
  };
});
</script>

<template>
  <div 
    :class="[
      'fixed top-2 right-2 text-white p-1 z-50',
      connection.isConnected ? 'bg-green-500' : 'bg-red-500'
    ]"
  >
    {{ connection.isConnected }}
  </div>
  <router-view />
</template>

<style>
</style>
