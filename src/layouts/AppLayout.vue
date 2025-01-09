<script setup>
import { onMounted } from 'vue';
import { useUserStore, useModalStore, useThemeStore } from '@store';
import { useRoute, useRouter } from 'vue-router';
import Header from "./app/header/Header.vue";
import Footer from "./app/footer/Footer.vue";

const user = useUserStore();
const theme = useThemeStore();
const modal = useModalStore();

const route = useRoute();
const router = useRouter();

onMounted(() => {
  if(route.path === '/') {
    if(user.data.webmaster_id) {
      return router.push('/webmaster/statistics');
    };
    if(user.data.operator_id) {
      return router.push('/operator/statistics');
    };
    return router.push('/user/statistics');
  }
});
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
