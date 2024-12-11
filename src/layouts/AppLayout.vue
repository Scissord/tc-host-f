<script setup>
import { watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useModalStore, useThemeStore, useUserStore } from '@store';
import { initWebSocket } from '@/plugins/websocket';
import Header from "./app/header/Header.vue";
import Footer from "./app/footer/Footer.vue";

const router = useRouter();

const user = useUserStore();
const theme = useThemeStore();
const modal = useModalStore();

let websocket = null;

onMounted(() => {
  if (!user.isAuthenticated) {
    router.push('/auth');
  } else {
    // connectWebSocket();
  }
});

const connectWebSocket = () => {
  const id = user.data.user_id;

  if (!id) {
    console.error("Не удалось подключиться к WebSocket: token отсутствует");
    return;
  };

  // websocket = initWebSocket(`ws://192.168.0.142:8000/${id}`);

  // websocket.on("serverEvent", (payload) => {
  //   console.log("Сообщение от сервера:", payload);
  // });
};

watch(
  () => user.isAuthenticated,
  (isAuthenticated) => {
    if (!isAuthenticated) {
      if (websocket) {
        websocket.disconnect();
        websocket = null;
      }
      router.push('/auth');
    } else {
      connectWebSocket();
    }
  }
);
</script>

<template>
  <div :class="theme.theme === 'dark' ? 'dark' : 'light'">
    <Modal
      v-if="modal.isVisible"
      :title="modal.title"
      :children="modal.children"
    />
    <Header/>

    <main>
      <router-view/>
    </main>

    <Footer/>
  </div>
</template>

<style>
</style>
