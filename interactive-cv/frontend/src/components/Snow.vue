<script setup>
const snowflakes = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 5 + Math.random() * 5,
}))
</script>

<template>
  <div class="fixed inset-0 -z-30 pointer-events-none dark:hidden">
    <template v-for="flake in snowflakes" :key="flake.id">
      <div
        class="absolute w-[4px] h-[4px] bg-white rounded-full opacity-70 animate-fall-snow"
        :style="{
          top: flake.top + '%',
          left: flake.left + '%',
          animationDelay: flake.delay + 's',
          animationDuration: flake.duration + 's',
        }"
      />
    </template>
  </div>
</template>
