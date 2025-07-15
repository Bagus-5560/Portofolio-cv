<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import Snow from './components/Snow.vue'
import HeroInteraktif from './components/HeroInteraktif.vue'
import Snow from './components/Snow.vue'

const isDarkMode = ref(false)

function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

const meteors = ref([])
const clickMeteors = ref([])
const particles = ref([])
const stars = ref([])
const glow = ref({ x: 0, y: 0 })

onMounted(() => {
  // ⭐ Static Stars
  stars.value = Array.from({ length: 60 }, () => ({
    top: randomRange(0, 100),
    left: randomRange(0, 100),
    size: Math.random() < 0.33 ? 2 : 1,
    delay: randomRange(0, 3),
  }))

  // ☄️ Meteors (background)
  meteors.value = Array.from({ length: 15 }, () => ({
    top: randomRange(-10, 80) + '%',
    left: randomRange(-20, 90) + '%',
    delay: randomRange(0, 5) + 's',
    duration: randomRange(2, 5) + 's',
  }))

  let lastX = 0
  let lastY = 0

  // 🌠 Asteroid trail from mouse
  const handleMouseMove = (e) => {
    const x = e.clientX
    const y = e.clientY
    glow.value = { x, y }

    const dx = x - lastX
    const dy = y - lastY
    const angle = Math.atan2(dy, dx)

    // Core particle
    particles.value.push({
      id: Date.now() + Math.random(),
      xStart: x,
      yStart: y,
      xEnd: x,
      yEnd: y,
      size: '6px',
      color: '#5e8fff',
      opacity: 1,
      blur: true,
    })

    // Cone trail
    const coneCount = 25
    const coneSpread = Math.PI / 10
    const coneLength = 20

    for (let i = 0; i < coneCount; i++) {
      const a = angle + randomRange(-coneSpread, coneSpread)
      const dist = randomRange(10, coneLength)
      const px = x - Math.cos(a) * dist
      const py = y - Math.sin(a) * dist

      const t = i / coneCount
      const lightness = 95 - t * 40
      const color = `hsl(220, 100%, ${lightness}%)`

      particles.value.push({
        id: Date.now() + Math.random(),
        xStart: x,
        yStart: y,
        xEnd: px,
        yEnd: py,
        size: `${2 - t * 1.5}px`,
        color: '#585a8c',
        opacity: 0.6 - t * 0.5,
        blur: false,
      })
    }

    lastX = x
    lastY = y

    setTimeout(() => {
      particles.value.splice(0, coneCount + 1)
    }, 600)
  }

  // 🌟 Click = new falling meteor
  const handleClick = (e) => {
    clickMeteors.value.push({
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    })

    setTimeout(() => {
      clickMeteors.value.shift()
    }, 1500)
  }

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('click', handleClick)

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('click', handleClick)
  })
})
</script>

<template>
  <div class="relative font-sans dark:text-dark-text text-gray-800">
    <!-- Glow -->
    <div
      class="pointer-events-none fixed w-32 h-32 bg-blue-500 opacity-10 blur-3xl rounded-full -z-10 transition-transform duration-300"
      :style="{ top: glow.y + 'px', left: glow.x + 'px', transform: 'translate(-50%, -50%)' }" />

    <!-- Background dan efek -->
    <div class="fixed inset-0 -z-20 bg-[#ffffff] dark:bg-dark-background overflow-hidden">
      <!-- ❄️ Salju khusus mode terang -->
      <Snow class="hidden dark:hidden" />
      <HeroInteraktif class="hidden dark:block" />

      <div class="absolute inset-0 bg-[linear-gradient(to_right,#e0e7ff_1px,transparent_1px),linear-gradient(to_bottom,#e0e7ff_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] overflow-hidden">
      </div>

      <!-- Galaxy background -->
      <div
        class="absolute inset-0 opacity-20 animate-galaxy-shift bg-[radial-gradient(circle,_#0a0f21,_#0d1117,rgba(13,17,23,0))]" />

      <!-- Stars -->
      <template v-for="(star, i) in stars" :key="'star-' + i">
        <div class="absolute rounded-full bg-dark-primary animate-star-twinkle"
          :class="star.size === 2 ? 'w-[2px] h-[2px]' : 'w-[1px] h-[1px]'" :style="{
            top: star.top + '%',
            left: star.left + '%',
            animationDelay: star.delay + 's'
          }" />
      </template>

      <!-- Background meteors -->
      <template v-for="(m, idx) in meteors" :key="'meteor-' + idx">
        <span class="absolute bg-white rounded-full w-[2px] h-[2px] animate-meteor" :style="{
          top: m.top,
          left: m.left,
          animationDelay: m.delay,
          animationDuration: m.duration,
        }" />
      </template>

      <!-- Click-triggered meteors -->
      <template v-for="m in clickMeteors" :key="m.id">
        <span class="absolute bg-white w-[2px] h-[2px] rounded-full animate-meteor" :style="{
          top: m.y + 'px',
          left: m.x + 'px',
          animationDuration: '1.5s',
        }" />
      </template>

      <!-- Particles (mouse trail + meteor from click) -->
      <template v-for="p in particles" :key="p.id">
        <div class="absolute rounded-full pointer-events-none transition-all duration-500 ease-out" :style="{
          width: p.size,
          height: p.size,
          background: p.color,
          top: p.yStart + 'px',
          left: p.xStart + 'px',
          transform: `translate(${p.xEnd - p.xStart}px, ${p.yEnd - p.yStart}px)`,
          opacity: p.opacity,
          filter: p.blur ? 'blur(2px)' : 'blur(0.3px)',
        }" />
      </template>

    </div>

    <RouterView />
  </div>
</template>
