<script setup>
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import HeroInteraktif from './components/HeroInteraktif.vue'
// Komponen Snow tidak lagi digunakan di sini, karena HeroInteraktif sudah menjadi background utama
// import Snow from './components/Snow.vue'

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
function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

const handleLightModeMouseMove = (e) => {
  const x = e.clientX
  const y = e.clientY
  glow.value = { x, y }

  const dx = x - lastX; const dy = y - lastY
  const angle = Math.atan2(dy, dx)
  const coneCount = 25; const coneSpread = Math.PI / 10; const coneLength = 20

  particles.value.push({ id: Date.now() + Math.random(), xStart: x, yStart: y, xEnd: x, yEnd: y, size: '6px', color: '#5e8fff', opacity: 1, blur: true })
  for (let i = 0; i < coneCount; i++) {
    const a = angle + randomRange(-coneSpread, coneSpread); const dist = randomRange(10, coneLength)
    const px = x - Math.cos(a) * dist; const py = y - Math.sin(a) * dist
    const t = i / coneCount; const color = `hsl(220, 100%, ${95 - t * 40}%)`
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
function setupEffectsForMode(isDark) {
  // Hapus listener lama untuk menghindari duplikasi
  window.removeEventListener('mousemove', handleLightModeMouseMove)
  window.removeEventListener('click', handleLightModeClick)

  if (isDark) {
    // Di dark mode, tidak ada yang perlu dilakukan di sini
    // karena semua logika ada di dalam HeroInteraktif.vue
  } else {
    // Jika di light mode, buat semua aset dan tambahkan listener
    stars.value = Array.from({ length: 60 }, () => ({ top: randomRange(0, 100), left: randomRange(0, 100), size: Math.random() < 0.33 ? 2 : 1, delay: randomRange(0, 3) }))
    meteors.value = Array.from({ length: 15 }, () => ({ top: randomRange(-10, 80) + '%', left: randomRange(-20, 90) + '%', delay: randomRange(0, 5) + 's', duration: randomRange(2, 5) + 's' }))
    window.addEventListener('mousemove', handleLightModeMouseMove)
    window.addEventListener('click', handleLightModeClick)
  }
}

onMounted(() => {
  // Inisialisasi pengecekan dark mode
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  isDarkMode.value = mediaQuery.matches
  setupEffectsForMode(isDarkMode.value)

  // Buat listener untuk mendeteksi perubahan mode (misal dari setting OS)
  mediaQuery.addEventListener('change', (e) => {
    isDarkMode.value = e.matches
    setupEffectsForMode(isDarkMode.value)
  })

  // Kamu mungkin punya tombol toggle manual, ini cara meng-handle-nya
  // Misalnya, jika tombolmu menambahkan/menghapus class 'dark' dari <html>
  const observer = new MutationObserver(() => {
    const newMode = document.documentElement.classList.contains('dark')
    if (newMode !== isDarkMode.value) {
      isDarkMode.value = newMode
      setupEffectsForMode(isDarkMode.value)
    }
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => {
  // Pastikan semua listener dibersihkan saat komponen dihancurkan
  window.removeEventListener('mousemove', handleLightModeMouseMove)
  window.removeEventListener('click', handleLightModeClick)
  // (Observer dan mediaQuery listener juga idealnya dibersihkan di sini)
})
</script>

<template>
  <div class="relative font-sans dark:text-dark-text text-gray-800">

    <!-- Saat Dark Mode: Tampilkan HANYA komponen 3D interaktif -->
    <HeroInteraktif v-if="isDarkMode" />

    <!-- Saat Light Mode: Tampilkan SEMUA efek yang lama -->
    <div v-else>
      <!-- Glow -->
      <div
        class="pointer-events-none fixed w-32 h-32 bg-blue-500 opacity-10 blur-3xl rounded-full -z-10 transition-transform duration-300"
        :style="{ top: glow.y + 'px', left: glow.x + 'px', transform: 'translate(-50%, -50%)' }" />

      <!-- Background dan efek lama -->
      <div class="fixed inset-0 -z-20 bg-slate-50 overflow-hidden">

        <!-- Background Geometris untuk Light Mode -->
        <div
          class="absolute inset-0 bg-[linear-gradient(60deg,theme(colors.blue.100)_1.2px,transparent_1.2px),linear-gradient(-60deg,theme(colors.blue.100)_1.2px,transparent_1.2px),linear-gradient(to_bottom,theme(colors.blue.200)_1.2px,transparent_1.2px)] bg-[size:50px_100px]"
        ></div>

        <!-- Stars -->
        <template v-for="(star, i) in stars" :key="'star-' + i">
          <div class="absolute rounded-full bg-blue-300 animate-star-twinkle"
            :class="star.size === 2 ? 'w-[2px] h-[2px]' : 'w-[1px] h-[1px]'" :style="{
              top: star.top + '%',
              left: star.left + '%',
              animationDelay: star.delay + 's'
            }" />
        </template>

        <!-- Background meteors -->
        <template v-for="(m, idx) in meteors" :key="'meteor-' + idx">
          <span class="absolute bg-slate-400 rounded-full w-[2px] h-[2px] animate-meteor" :style="{
            top: m.top,
            left: m.left,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }" />
        </template>

        <!-- Click-triggered meteors -->
        <template v-for="m in clickMeteors" :key="m.id">
          <span class="absolute bg-slate-400 w-[2px] h-[2px] rounded-full animate-meteor" :style="{
            top: m.y + 'px',
            left: m.x + 'px',
            animationDuration: '1.5s',
          }" />
        </template>

        <!-- Particles (mouse trail) -->
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
    </div>

    <!-- RouterView akan selalu ada di atas semua background -->
    <RouterView class="relative z-10" />
  </div>
</template>
