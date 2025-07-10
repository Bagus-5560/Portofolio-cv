<script setup>
import { onMounted, ref } from 'vue'
function randomRange(min, max) { return Math.random() * (max - min) + min }
const meteors = ref([])
onMounted(() => {
  const arr = Array.from({ length: 15 }, () => ({
    top: randomRange(-10, 90) + '%',
    left: randomRange(-20, 100) + '%',
    delay: randomRange(0, 5) + 's',
    duration: randomRange(2, 5) + 's',
  }))
  meteors.value = arr
})
</script>

<template>
  <div class="relative font-sans dark:text-dark-text text-gray-800">
    <div class="fixed inset-0 -z-10 bg-gray-100 dark:bg-dark-background overflow-hidden">
      <div class="hidden dark:block">
        <!-- Galaxy gradient shift -->
        <div
          class="absolute inset-0 opacity-20 animate-galaxy-shift bg-[radial-gradient(circle,_#0a0f21,_#0d1117,rgba(13,17,23,0))]"
        ></div>

        <!-- Star field -->
        <template v-for="i in 50" :key="i">
          <div
            :class="[
              'absolute bg-dark-primary rounded-full',
              i%3==0 ? 'w-[2px] h-[2px]'
                : i%3==1 ? 'w-[1px] h-[1px]'
                : 'w-[1px] h-[1px]'
            ]"
            :style="{ top: randomRange(0,100)+'%', left: randomRange(0,100)+'%' }"
            class="animate-star-twinkle"
          ></div>
        </template>

        <!-- Meteors -->
        <template v-for="(m, idx) in meteors" :key="idx">
          <span
            class="absolute bg-white rounded-full w-[2px] h-[2px] animate-meteor"
            :style="{
              top: m.top,
              left: m.left,
              animationDelay: m.delay,
              animationDuration: m.duration,
            }"
          ></span>
        </template>
      </div>
    </div>

    <RouterView />
  </div>
</template>
