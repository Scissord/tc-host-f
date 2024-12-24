import { defineStore } from 'pinia';
import { reactive } from 'vue';

const useOperatorOrdersStore = defineStore('operator_order', () => {
  const state = reactive({});

  const bindEvents = () => {

  };

  return {
    state,
    bindEvents
  };
});

export default useOperatorOrdersStore;
