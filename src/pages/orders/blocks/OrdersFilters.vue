<script setup>
import { ref } from 'vue';

const props = defineProps({
  status: [Number, null],
  statuses: Array,
  columns: Array,
  filters: Object
});

const isFiltersMenuOpen = ref(false);

const emit = defineEmits(['editStatus:status']);

const handleChangeStatus = (val) => {
  emit('editStatus:status', val.id);
};

const css = {
  label: 'font-semibold',
  input: 'text-sm p-1'
};

console.log(props.columns)
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <div
      v-for="s in statuses"
      :key="s.id"
      class="flex items-center gap-3"
    >
      <div
        v-for="sub in s.sub_statuses"
        :key="sub.id"
        :class="[
          'px-3 py-2 rounded-lg select-none cursor-pointer hover:bg-gray-300 transition duration-200 transform active:scale-90 transform-origin-center inline-block uppercase',
          status && sub.id === status ? 'bg-gray-300' : 'bg-gray-100',
        ]"
        @click="handleChangeStatus(sub)"
      >
        <p>{{ sub.name }}</p>
      </div>
    </div>
  </div>
  <div class="flex flex-col gap-3">
    <Button
      text="Расширенный поиск"
      @click="isFiltersMenuOpen = !isFiltersMenuOpen"
    />
    <div
      v-if="isFiltersMenuOpen"
      class="grid grid-cols-10 gap-3 bg-white border p-2 rounded-lg animate-fadeIn transition-opacity duration-500 ease-in-out"
    >
      <div class="flex flex-col gap-1">
        <p :class="css.label">ID</p>
        <Input
          id="order_id"
          type="text"
          v-model="filters.order_id"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Оператор</p>
        <Input
          id="operator"
          type="text"
          v-model="filters.operator"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Товар</p>
        <Input
          id="product"
          type="text"
          v-model="filters.product"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Вебмастер</p>
        <Input
          id="webmaster"
          type="text"
          v-model="filters.webmaster"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">ФИО</p>
        <Input
          id="fio"
          type="text"
          v-model="filters.fio"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Регион</p>
        <Input
          id="region"
          type="text"
          v-model="filters.region"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Город</p>
        <Input
          id="order_id"
          type="text"
          v-model="filters.order_id"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Адрес</p>
        <Input
          id="operator"
          type="text"
          v-model="filters.operator"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Коммент</p>
        <Input
          id="product"
          type="text"
          v-model="filters.product"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Почта</p>
        <Input
          id="webmaster"
          type="text"
          v-model="filters.webmaster"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Additional1</p>
        <Input
          id="fio"
          type="text"
          v-model="filters.fio"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Additional2</p>
        <Input
          id="region"
          type="text"
          v-model="filters.region"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Additional3</p>
        <Input
          id="order_id"
          type="text"
          v-model="filters.order_id"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Additional4</p>
        <Input
          id="operator"
          type="text"
          v-model="filters.operator"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Additional7</p>
        <Input
          id="product"
          type="text"
          v-model="filters.product"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Additional8</p>
        <Input
          id="webmaster"
          type="text"
          v-model="filters.webmaster"
          placeholder="..."
          :class="css.input"
        />
      </div>
      <div class="flex flex-col gap-1">
        <p :class="css.label">Additional12</p>
        <Input
          id="fio"
          type="text"
          v-model="filters.fio"
          placeholder="..."
          :class="css.input"
        />
      </div>
    </div>
  </div>
</template>