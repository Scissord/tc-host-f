import { ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from '@store';
import { socket } from "@/plugins/socket";

const useConnectionStore = defineStore("connection", () => {
  const user = useUserStore();
  const isConnected = ref(false);

  const bindEvents = () => {
    socket.on("connect", () => {
      console.log('socket connected', socket.id);
      isConnected.value = true;
    });

    socket.on("disconnect", () => {
      console.log('socket disconnected');
      isConnected.value = false;
    });
  };

  const connect = () => {
    socket.io.opts.query = { user_id: user.data.id };
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  };

  return {
    isConnected,
    bindEvents,
    connect,
    disconnect
  };
});

export default useConnectionStore;
