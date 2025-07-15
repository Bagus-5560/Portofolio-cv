<script setup>
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import HeroInteraktif from './components/HeroInteraktif.vue'

// --- State untuk mendeteksi dark mode ---
const isDarkMode = ref(false)

// --- Variabel untuk efek light mode ---
const meteors = ref([])
const clickMeteors = ref([])
const particles = ref([])
const stars = ref([])
const glow = ref({ x: 0, y: 0 })
let lastX = 0
let lastY = 0

// --- Fungsi hanya untuk light mode ---
function randomRange(min, max) { return Math.random() * (max - min) + min }
const handleLightModeMouseMove = (e) => {
  const x = e.clientX, y = e.clientY; glow.value = { x, y }
  const dx = x - lastX, dy = y - lastY, angle = Math.atan2(dy, dx)
  const coneCount = 25, coneSpread = Math.PI / 10, coneLength = 20
  particles.value.push({ id: Date.now() + Math.random(), xStart: x, yStart: y, xEnd: x, yEnd: y, size: '6px', color: '#5e8fff', opacity: 1, blur: true })
  for (let i = 0; i < coneCount; i++) {
    const a = angle + randomRange(-coneSpread, coneSpread), dist = randomRange(10, coneLength)
    const px = x - Math.cos(a) * dist, py = y - Math.sin(a) * dist
    const t = i / coneCount, color = `hsl(220, 100%, ${95 - t * 40}%)`
    particles.value.push({ id: Date.now() + Math.random(), xStart: x, yStart: y, xEnd: px, yEnd: py, size: `${2 - t * 1.5}px`, color: '#585a8c', opacity: 0.6 - t * 0.5, blur: false })
  }
  lastX = x; lastY = y
  setTimeout(() => { particles.value.splice(0, coneCount + 1) }, 600)
}
const handleLightModeClick = (e) => {
  clickMeteors.value.push({ id: Date.now() + Math.random(), x: e.clientX, y: e.clientY })
  setTimeout(() => { clickMeteors.value.shift() }, 1500)
}

// --- Fungsi untuk mengelola efek berdasarkan mode ---
const setupLightModeEffects = (enable) => {
  if (enable) {
    stars.value = Array.from({ length: 60 }, () => ({ top: randomRange(0, 100), left: randomRange(0, 100), size: Math.random() < 0.33 ? 2 : 1, delay: randomRange(0, 3) }))
    meteors.value = Array.from({ length: 15 }, () => ({ top: randomRange(-10, 80) + '%', left: randomRange(-20, 90) + '%', delay: randomRange(0, 5) + 's', duration: randomRange(2, 5) + 's' }))
    window.addEventListener('mousemove', handleLightModeMouseMove)
    window.addEventListener('click', handleLightModeClick)
  } else {
    window.removeEventListener('mousemove', handleLightModeMouseMove)
    window.removeEventListener('click', handleLightModeClick)
  }
}

// PERBAIKAN: Gunakan watch untuk bereaksi terhadap perubahan isDarkMode
watch(isDarkMode, (isDark) => {
  setupLightModeEffects(!isDark) // Aktifkan efek light mode HANYA jika isDark bernilai false
}, { immediate: true }) // 'immediate' akan menjalankan watcher ini saat komponen pertama kali dimuat

let observer = null
onMounted(() => {
  // PERBAIKAN: Cara deteksi dark mode yang lebih kuat
  const checkDarkMode = () => document.documentElement.classList.contains('dark')

  isDarkMode.value = checkDarkMode()

  // Amati perubahan class pada tag <html> untuk mendeteksi toggle manual
  observer = new MutationObserver(() => {
    isDarkMode.value = checkDarkMode()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => {
  // Pastikan semua listener dan observer dibersihkan
  window.removeEventListener('mousemove', handleLightModeMouseMove)
  window.removeEventListener('click', handleLightModeClick)
  if (observer) observer.disconnect()
})
</script>

<template>
  <div class="relative min-h-screen font-sans dark:text-dark-text text-gray-800">

    <!-- Saat Dark Mode: Tampilkan HANYA komponen 3D interaktif -->
    <HeroInteraktif v-if="isDarkMode" />

    <!-- Saat Light Mode: Tampilkan SEMUA efek yang lama -->
    <div v-else>
      <!-- PERBAIKAN: Container efek lama juga dijadikan background layer -->
      <div class="fixed inset-0 -z-10 overflow-hidden">
        <!-- Glow -->
        <div
          class="pointer-events-none fixed w-32 h-32 bg-blue-500 opacity-10 blur-3xl rounded-full transition-transform duration-300"
          :style="{ top: glow.y + 'px', left: glow.x + 'px', transform: 'translate(-50%, -50%)' }" />

        <!-- Background dan efek lama -->
        <div class="absolute inset-0 bg-slate-50">
          <div
            class="absolute inset-0 bg-[linear-gradient(60deg,theme(colors.blue.100)_1.2px,transparent_1.2px),linear-gradient(-60deg,theme(colors.blue.100)_1.2px,transparent_1.2px),linear-gradient(to_bottom,theme(colors.blue.200)_1.2px,transparent_1.2px)] bg-[size:50px_100px]">
          </div>
          <template v-for="(star, i) in stars" :key="'star-' + i">
            <div class="absolute rounded-full bg-blue-300 animate-star-twinkle"
              :class="star.size === 2 ? 'w-[2px] h-[2px]' : 'w-[1px] h-[1px]'"
              :style="{ top: star.top + '%', left: star.left + '%', animationDelay: star.delay + 's' }" />
          </template>
          <template v-for="(m, idx) in meteors" :key="'meteor-' + idx">
            <span class="absolute bg-slate-400 rounded-full w-[2px] h-[2px] animate-meteor"
              :style="{ top: m.top, left: m.left, animationDelay: m.delay, animationDuration: m.duration, }" />
          </template>
          <template v-for="m in clickMeteors" :key="m.id">
            <span class="absolute bg-slate-400 w-[2px] h-[2px] rounded-full animate-meteor"
              :style="{ top: m.y + 'px', left: m.x + 'px', animationDuration: '1.5s', }" />
          </template>
          <template v-for="p in particles" :key="p.id">
            <div class="absolute rounded-full pointer-events-none transition-all duration-500 ease-out"
              :style="{ width: p.size, height: p.size, background: p.color, top: p.yStart + 'px', left: p.xStart + 'px', transform: `translate(${p.xEnd - p.xStart}px, ${p.yEnd - p.yStart}px)`, opacity: p.opacity, filter: p.blur ? 'blur(2px)' : 'blur(0.3px)', }" />
          </template>
        </div>
      </div>
    </div>

    <!-- PERUBAHAN KRITIS: RouterView diberi z-index agar selalu di depan -->
    <RouterView class="relative z-20" />
  </div>
</template>
