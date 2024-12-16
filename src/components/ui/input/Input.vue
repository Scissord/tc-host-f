<script setup>
const props = defineProps({
  id: {
    type: [String, Number],
    required: false,
    default: ''
  },
  type: {
    type: String,
    required: false,
    default: 'text'
  },
  modelValue: {
    type: [String, Number, null],
    required: true
  },
  placeholder: {
    type: String,
    required: false,
    default: '...'
  },
  required: {
    type: Boolean,
    required: false,
    default: false
  },
  onBlur: {
    type: Function,
    required: false
  },
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event) => {
  const value = event.target.value;
  emit('update:modelValue', value);
};
</script>

<template>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :required="required"
    class="input"
    @input="onInput"
    @blur="onBlur"
  />
</template>

<style>
.input {
  width: 100%;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  background-color: #e5e7eb;
  color: #333;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-sizing: border-box;
}

.input:focus {
  border-color: #d946ef;
  box-shadow: 0 0 0 3px rgba(146, 41, 195, 0.3);
  outline: none;
}

.input::placeholder {
  color: #999;
  font-style: italic;
}

.input.is-error {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.3);
}
</style>
