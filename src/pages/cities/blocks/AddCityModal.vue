<script setup>
import { reactive } from 'vue';
import { useModalStore, useNotificationStore } from '@store';

const modal = useModalStore();
const notification = useNotificationStore();

const props = defineProps({
  createCity: {
    type: Function,
    required: true
  },
  cities: {
    type: Array,
    required: true,
    default: []
  },
})

const city = reactive({
  name: "",
});

const handleCreateCity = async () => {
  if(!city.name){
    notification.show('Заполните все поля!', 'warning');
    return;
  };
  const data = await props.createCity(city);
  props.cities.push(data.city);
  modal.hide();
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid grid-cols-2 gap-6">
      <h1>Название города</h1>
      <Input
        id="add_city_name"
        type="text"
        v-model="city.name"
        placeholder="Название..."
      />
    </div>
    <div class="flex items-center gap-3 justify-end">
      <Button
        text="Сохранить"
        @click="handleCreateCity"
        class="bg-green-500 hover:bg-green-400"
      />
      <Button
        text="Закрыть"
        @click="modal.hide"
        class="bg-red-500 hover:bg-red-400"
      />
    </div>

  </div>
</template>