<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [Object, Number, String, Array, null],
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  value: {
    type: String,
    required: false,
    default: 'value',
  },
  label: {
    type: String,
    required: false,
    default: 'label',
  },
  multiple: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emits = defineEmits(['update:modelValue']);

const isOpen = ref(false);

const selectOption = (option) => {
  if (props.multiple) {
    const currentValue = Array.isArray(props.modelValue) ? props.modelValue : [];
    const optionValue = option[props.value || 'value'];

    if (currentValue.includes(+optionValue)) {
      // Если опция уже выбрана, убираем её из массива
      emits('update:modelValue', currentValue.filter((item) => +item !== +optionValue));
    } else {
      // Если опция не выбрана, добавляем её в массив
      emits('update:modelValue', [...currentValue, +optionValue]);
    }
  } else {
    // Для одиночного выбора
    emits('update:modelValue', option[props.value || 'value']);
    isOpen.value = false; // Закрыть меню
  }
};

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const isObject = computed(() => {
  return typeof props.modelValue === 'object' && props.modelValue !== null && !Array.isArray(props.modelValue);
});

const displayedName = computed(() => {
  if (props.multiple) {
    // Для мульти-выбора отображаем список выбранных опций
    const selectedOptions = props.options.filter((option) =>
      Array.isArray(props.modelValue) && props.modelValue.includes(+option[props.value || 'value'])
    );
    return selectedOptions.length
      ? selectedOptions.map((option) => option[props.label || 'label']).join(', ')
      : 'Выберите...';
  }

  let localValue = isObject.value
    ? +props.modelValue[props.value || 'value']
    : +props.modelValue;

  const option = props.options.find((option) => +option[props.value || 'value'] === localValue);

  return option ? (props.label ? option[props.label] : option.label) : 'Выберите...';
});
</script>

<template>
  <div class="select-container">
    <div class="selected" @click="toggleMenu">
      <p
        :class="[
          'selected-text',
          displayedName === 'Выберите...' ? 'text-gray-600' : 'text-black'
        ]"
      >
        {{ displayedName }}
      </p>
      <Icon
        :class="['icon']"
        :icon="['fas', 'chevron-up']"
        :style="{ transform: `rotate(${isOpen ? 0 : 180}deg)` }"
      />
    </div>
    <div v-if="isOpen" class="menu">
      <div
        v-for="option in options"
        :key="option[value || 'value']"
        class="menu-item"
        @click="selectOption(option)"
      >
        <p class="menu-item-text">
          {{ option[label || 'label'] }}
        </p>
        <span v-if="props.multiple && modelValue.includes(+option[value || 'value'])" class="selected-mark">✔</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-container {
  min-width: 100px;
  max-width: 250px;
  position: relative;
  background: white;
}

.selected {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  min-height: 30px;
  padding: 8px;
  transition: 0.2s linear;
  border: 1px solid #cbd5e1;
  cursor: pointer;
  user-select: none;
  border-radius: 6px;
}

.selected-text {
  font-size: 12px;
  letter-spacing: 1px;
  color: #64748b;
}

.menu {
  position: absolute;
  min-height: 100px;
  max-height: 300px;
  top: 100%;
  width: 100%;
  background: white;
  z-index: 10;
  overflow-y: auto;
}

.menu-item {
  cursor: pointer;
  background-color: white;
  transition: background-color 0.3s ease;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-item:hover {
  background-color: #e5e7eb;
}

.menu-item-text {
  font-size: 12px;
  line-height: 1.25rem;
  user-select: none;
}

.icon {
  transition: transform 0.3s ease;
  transform-origin: center;
}

.selected-mark {
  font-size: 12px;
  color: green;
}
</style>
