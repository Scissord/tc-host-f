<script setup>
</script>

<template>
  <div class="bg-white rounded-xl shadow-md w-[70%] h-[700px] flex z-10">
    <div class="w-1/2 flex items-center justify-center border-r border-slate-200 px-12">
      <img
        src="/pics/auth/shield.svg"
        class="w-[70%]"
      />
    </div>
    <slot/>
  </div>
</template>
