<script setup>
import { ref, onMounted } from 'vue';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

const props = defineProps({
  modelValue: {
    type: [String, Number, null],
    required: true
  },
});

const iti = ref({});
const error = ref("");

const emit = defineEmits(['update:modelValue']);

const onInput = (event) => {
  const value = event.target.value;
  emit('update:modelValue', value);
};

const onBlur = (event) => {
  error.value = "";

  if(props.modelValue && !iti.value.isValidNumber()) {
    error.value = 'Некорректный формат телефона!'
  };
};

onMounted(() => {
  const input = document.querySelector("#phone");
  iti.value = intlTelInput(input, {
    loadUtils: () => import("intl-tel-input/utils"),
  });
});
</script>

<template>
  <div class="relative">
    <input
      :value="modelValue"
      @input="onInput"
      @blur="onBlur"
      id="phone"
      type="text"
      name="phone"
      class="w-full bg-gray-200 rounded p-2 text-sm"
    />
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.iti {
  --iti-path-flags-1x: url('../../../../node_modules/intl-tel-input/build/img/flags.webp');
  --iti-path-flags-2x: url('../../../../node_modules/intl-tel-input/build/img/flags@2x.webp');
  --iti-path-globe-1x: url('../../../../node_modules/intl-tel-input/build/img/globe.webp');
  --iti-path-globe-2x: url('../../../../node_modules/intl-tel-input/build/img/globe@2x.webp');
}
</style>