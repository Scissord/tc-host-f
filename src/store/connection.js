import { ref } from "vue";
import { defineStore } from "pinia";
import { socket } from "@/plugins/socket";

const useConnectionStore = defineStore("connection", () => {
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
    socket.connect();
  };

  const disconnect = () => {
    socket.disconnect();
  }

  return {
    isConnected,
    bindEvents,
    connect,
    disconnect
  };
});

export default useConnectionStore;
