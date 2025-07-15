<script setup>
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import HeroInteraktif from './components/HeroInteraktif.vue'

// --- State untuk mendeteksi dark mode ---
const isDarkMode = ref(false)

// --- Variabel untuk efek (sekarang dipisah per mode) ---
const meteors = ref([]) // Hanya untuk dark mode
const stars = ref([])   // Hanya untuk dark mode
const glow = ref({ x: 0, y: 0 }) // Hanya untuk light mode

// --- Fungsi utilitas ---
function randomRange(min, max) { return Math.random() * (max - min) + min }

// --- Fungsi yang HANYA berjalan di LIGHT MODE ---
const handleLightModeMouseMove = (e) => {
  // Logika mouse move sekarang HANYA untuk memperbarui posisi glow. Jauh lebih ringan!
  glow.value = { x: e.clientX, y: e.clientY }
}

// --- Fungsi untuk mengelola efek berdasarkan mode ---
const setupEffectsForMode = (isDark) => {
  // Selalu bersihkan listener lama untuk mencegah duplikasi saat mode berganti
  window.removeEventListener('mousemove', handleLightModeMouseMove)

  if (isDark) {
    // Buat aset visual untuk dark mode
    // Tidak ada listener mouse di sini, karena HeroInteraktif sudah punya sendiri.
    // Ini menyelesaikan masalah konflik dan performa.
    stars.value = Array.from({ length: 60 }, () => ({ top: randomRange(0, 100), left: randomRange(0, 100), size: Math.random() < 0.33 ? 2 : 1, delay: randomRange(0, 3) }))
    meteors.value = Array.from({ length: 15 }, () => ({ top: randomRange(-10, 80) + '%', left: randomRange(-20, 90) + '%', delay: randomRange(0, 5) + 's', duration: randomRange(2, 5) + 's' }))
  } else {
    // Tambahkan listener interaktif HANYA untuk light mode
    window.addEventListener('mousemove', handleLightModeMouseMove)
  }
}

// Gunakan watch untuk bereaksi terhadap perubahan isDarkMode. Ini lebih andal.
watch(isDarkMode, (isDark) => {
  setupEffectsForMode(isDark)
}, { immediate: true }) // 'immediate: true' akan menjalankan ini saat komponen pertama kali dimuat

let observer = null
onMounted(() => {
  // Cara deteksi dark mode yang paling kuat adalah dengan mengamati perubahan class di tag <html>
  const checkDarkMode = () => document.documentElement.classList.contains('dark')
  isDarkMode.value = checkDarkMode()

  observer = new MutationObserver(() => {
    isDarkMode.value = checkDarkMode()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => {
  // Selalu bersihkan listener dan observer saat komponen dihancurkan
  window.removeEventListener('mousemove', handleLightModeMouseMove)
  if (observer) observer.disconnect()
})
</script>

<template>
  <div class="relative min-h-screen font-sans dark:text-dark-text text-gray-800">

    <!-- DARK MODE: Tampilan yang kamu suka, dengan struktur yang benar -->
    <template v-if="isDarkMode">
      <!-- Komponen 3D di lapisan depan background -->
      <HeroInteraktif />
      <!-- Bintang & Meteor di lapisan paling belakang -->
      <div class="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <template v-for="(star, i) in stars" :key="'star-' + i">
          <div class="absolute rounded-full animate-star-twinkle bg-slate-500"
            :style="{ width: star.size === 2 ? '2px' : '1px', height: star.size === 2 ? '2px' : '1px', top: star.top + '%', left: star.left + '%', animationDelay: star.delay + 's' }" />
        </template>
        <template v-for="(m, idx) in meteors" :key="'meteor-' + idx">
          <span class="absolute rounded-full w-[2px] h-[2px] animate-meteor bg-slate-400"
            :style="{ top: m.top, left: m.left, animationDelay: m.delay, animationDuration: m.duration, }" />
        </template>
      </div>
    </template>

    <!-- LIGHT MODE: Tampilan Neon Geometris yang modern -->
    <template v-else>
      <div class="fixed inset-0 -z-20 bg-slate-100 overflow-hidden">
        <!-- Latar Belakang Geometris (Grid) -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#e0e7ff_1px,transparent_1px),linear-gradient(to_bottom,#e0e7ff_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]"></div>

        <!-- Aura Neon Interaktif yang Mengikuti Mouse -->
        <div
          class="pointer-events-none fixed inset-0 transition-all duration-300"
          :style="{
            background: `radial-gradient(600px circle at ${glow.x}px ${glow.y}px, rgba(22, 163, 224, 0.15), transparent 80%)`
          }"
        />
      </div>
    </template>

    <!-- RouterView akan selalu ada di atas semua background, memastikan kontenmu selalu terlihat -->
    <RouterView class="relative z-20" />
  </div>
</template>
