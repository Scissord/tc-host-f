<script setup>
import { ref, watch } from 'vue';
import { useNotificationStore } from '@store';

const cities = [
  'AKSAI', 'AKTAU', 'AKTOBE', 'ALMATA', 'ASTANA-KURER', 'ATYRAU', 'KARAGANDA', 'KOKSHETAU', 'KOSTANAI', 'KYLSARY',
  'KYZYLORDA', 'PAVLODAR', 'PETROPAVLOVSK', 'Saryagash', 'SEMEI', 'SHIMKENT', 'TALDYKORGAN', 'TARAZ', 'TEMIRTAU',
  'TURKESTAN', 'URALSK', 'UST-KAMENOGORSK', 'ZHANAOZEN', 'Zhetysai', 'ZHEZKAZGAN', 'EKIBASTUZ', 'Balkhash', 'Kentau'
];

const deliveryMethods = [
  'Курьер', 'Почта', 'Экспресс', 'ДВД'
];

const genders = [
  'Мужской', 'Женский'
];

const languages = [
  'Казахский', 'Русский'
];

const payMethods = [
  'Наличный расчет', 'Kaspi (оплачено)', 'Kaspi Red'
];

const props = defineProps({
  order: Object,
  order_id: [String, Number],
  handleSaveOrder: Function
})

const notification = useNotificationStore();

const isPostIndexValid = ref(true);

const validatePostIndex = () => {
  isPostIndexValid.value = props.order.postIndex.toString().length >= 5;
};

const saveOrder = async () => {
  if(!isPostIndexValid.value) {
    notification.show('Неверный почтовый индекс!', 'error');
    return;
  }
  await props.handleSaveOrder(props.order_id, props.order);
};

// watch(() => props.order, (newVal, oldVal) => {
//   console.log("newVal", newVal);
//   console.log("oldVal", oldVal);
// }, { deep: true });

//should be watch to validate order.postIndex
</script>

<template>
  <div
    class="flex flex-col gap-3 border border-slate-200 rounded-lg p-6 mt-6"
  >
    <!-- FIO -->
    <div class="flex items-center justify-between">
      <p class="text-sm font-bold">
        ФИО:
      </p>
      <Input
        id="order.fio"
        type="text"
        v-model="order.fio"
        placeholder="Введите..."
        className="text-md w-1/2 h-8"
      />
    </div>
    <!-- QUANTITY -->
    <div class="flex items-center justify-between">
      <p class="text-sm font-bold">
        Колличество:
      </p>
      <Input
        id="order.quantity"
        type="number"
        v-model="order.quantity"
        placeholder="Введите..."
        className="text-md w-1/2 h-8"
      />
    </div>
    <!-- POST INDEX -->
    <div class="flex items-center justify-between">
      <p class="text-sm font-bold">
        Почтовый индекс:
      </p>
      <div class="w-1/2 relative flex items-center justify-end">
        <Input
          id="order.postIndex"
          type="number"
          v-model="order.postIndex"
          placeholder="Введите..."
          class="text-md w-full h-8"
          :onBlur="validatePostIndex"
        />
        <div
          v-if="!isPostIndexValid"
          class="absolute top-full mt-1 px-2 py-1 bg-red-500 text-white text-sm rounded shadow"
          style="z-index: 2;"
        >
          Введите минимум 5 символов
        </div>
      </div>
    </div>
    <!-- CITY -->
    <div class="flex items-center justify-between">
      <p class="text-sm font-bold">
        Город:
      </p>
      <vSelect
        v-model="order.city"
        :reduce="(option) => option"
        :options="cities"
        placeholder="Куда..."
        class="w-1/2"
      />
    </div>
    <!-- REGION -->
    <div class="flex items-center justify-between">
      <p class="text-sm font-bold">
        Регион:
      </p>
      <Input
        id="order.region"
        type="text"
        v-model="order.region"
        placeholder="Введите..."
        className="text-md w-1/2 h-8"
      />
    </div>
    <!-- COMMENT -->
    <div class="flex items-center justify-between">
      <p class="text-sm font-bold">
        Комментарий:
      </p>
      <Input
        id="order.comment"
        type="text"
        v-model="order.comment"
        placeholder="Введите..."
        className="text-md w-1/2 h-8"
      />
    </div>
    <!-- ADDRESS -->
    <div class="flex items-center justify-between">
      <p class="text-sm font-bold">
        Адрес:
      </p>
      <Input
        id="order.address"
        type="text"
        v-model="order.address"
        placeholder="Введите..."
        className="text-md w-1/2 h-8"
      />
    </div>
    <!-- ADDITIONAL1/ДАТА ДОСТАВКИ -->
    <div class="flex items-center justify-between">
      <p class="text-sm font-bold">
        Дата доставки:
      </p>
      <DatePicker
        v-model="order.additional1"
        auto-apply
        class="w-1/2"
      />
    </div>
    <!-- ADDITIONAL2/СПОСОБ ДОСТАВКИ -->
    <div class="flex items-center justify-between">
      <p class="text-sm font-bold">
        Способ доставки:
      </p>
      <vSelect
        v-model="order.additional2"
        :reduce="(option) => option"
        :options="deliveryMethods"
        placeholder="Как..."
        class="w-1/2"
      />
    </div>
    <!-- ADDITIONAL4/ПОЛ УОЛКЕР -->
    <div class="flex items-center justify-between">
      <p class="text-sm font-bold">
        Гендер:
      </p>
      <vSelect
        v-model="order.additional4"
        :reduce="(option) => option"
        :options="genders"
        placeholder="Выберите..."
        class="w-1/2"
      />
    </div>
    <!-- ADDITIONAL7/ДОПОЛНИТЕЛЬНЫЙ ТЕЛЕФОН -->
    <div class="flex items-center justify-between">
      <p class="text-sm font-bold">
        Доп телефон:
      </p>
      <Input
        id="order.additional7"
        type="text"
        v-model="order.additional7"
        placeholder="Введите..."
        className="text-md w-1/2 h-8"
      />
    </div>
    <!-- ADDITIONAL8/ЯЗЫК -->
    <div class="flex items-center justify-between">
      <p class="text-sm font-bold">
        Язык:
      </p>
      <vSelect
        v-model="order.additional8"
        :reduce="(option) => option"
        :options="languages"
        placeholder="Выберите..."
        class="w-1/2"
      />
    </div>
    <!-- ADDITIONAL12/ОПЛАТА -->
    <div class="flex items-center justify-between">
      <p class="text-sm font-bold">
        ОПЛАТА:
      </p>
      <vSelect
        v-model="order.additional12"
        :reduce="(option) => option"
        :options="payMethods"
        placeholder="Выберите..."
        class="w-1/2"
      />
    </div>
    <Button
      type="button"
      text="Сохранить"
      className="rounded-lg w-full bg-blue-500 focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-700"
      @click="saveOrder"
    />
  </div>
</template>
