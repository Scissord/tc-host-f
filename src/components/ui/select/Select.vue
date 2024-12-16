<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [Object, Number, String],
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  value: {
    type: String,
    required: false
  },
  label: {
    type: String,
    required: false,
  },
});

const emits = defineEmits(['update:modelValue']);

// const loading = ref(false);
const isOpen = ref(false);

const selectOption = (option) => {
  emits('update:modelValue', props.value ? option[props.value] : option.id);
  isOpen.value = !isOpen.value;
};

const onSelectClick = () => {
  isOpen.value = !isOpen.value;
};

const closeMenuIfClickedOutside = (event) => {
  const container = document.querySelector('.select-container');
  if (container && !container.contains(event.target)) {
    isOpen.value = false;
  }
};

const displayedName = computed(() => {
  const option = props.options.find((option) => +option[props.value || 'value'] === +props.modelValue);
  return option ? (props.label ? option[props.label] : option.label) : '';
});

onMounted(() => {
  document.addEventListener('click', closeMenuIfClickedOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenuIfClickedOutside);
});

watch(props.options, (newVal) => console.log(newVal));
</script>

<template>
  <div class="select-container">
    <div
      class="selected"
      @click="onSelectClick"
    >
      <p v-if="modelValue" class="selected-text">
        {{ displayedName }}
      </p>
      <p v-else class="placeholder">
        SELECT...
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
        :key="value ? option[value] : option.id"
        class="menu-item"
        @click="selectOption(option)"
      >
        <p class="menu-item-text">
          {{ label ? option[label] : option.label }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.select-container {
  min-width: 100px;
  position: relative;
  background: white;
}

.selected {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 30px;
  padding: 8px;
  transition: .2s linear;
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

.placeholder {
  color: #64748b;
  font-size: 12px;
  letter-spacing: 1px;
  opacity: 1;
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
}

.menu-item:hover {
  background-color: #e5e7eb;
}

.menu-item-text {
  font-size: 12px;
  line-height: 1.25rem;
}

.icon {
  transition: transform 0.3s ease;
  transform-origin: center;
}
</style>
