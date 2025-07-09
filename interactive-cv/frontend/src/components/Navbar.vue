<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDarkMode = ref(false)
const isScrolled = ref(false)
const activeSection = ref('profil')
const isMobileMenuOpen = ref(false)

// Toggle theme function
function toggleTheme() {
  if (isDarkMode.value) {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }
  isDarkMode.value = !isDarkMode.value
}

// Handle scroll event
function handleScroll() {
  isScrolled.value = window.scrollY > 50
}

// Intersection Observer for active section
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  },
  { rootMargin: '-30% 0px -70% 0px' }
)

onMounted(() => {
  // Check initial theme
  if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    isDarkMode.value = true
  }

  // Add scroll listener
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Check scroll position on load

  // Observe sections
  document.querySelectorAll('section').forEach((section) => {
    observer.observe(section)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  observer.disconnect()
})

const navLinks = [
  { id: 'profil', text: 'Profil' },
  { id: 'pendidikan', text: 'Pendidikan' },
  { id: 'skill', text: 'Skill' },
  { id: 'proyek', text: 'Proyek' },
  { id: 'contact', text: 'Kontak' },
]
</script>

<template>
  <!-- Header Utama -->
  <header
    :class="[
      'fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-300'
    ]"
  >
    <nav :class="[
        'container mx-auto px-4 py-2 flex justify-between items-center rounded-full transition-all duration-300',
        isScrolled ? 'bg-white/70 dark:bg-dark-background-light/70 backdrop-blur-lg shadow-lg' : 'bg-white/30 dark:bg-dark-background-light/30 backdrop-blur-sm'
    ]">
      <!-- Kiri: Nama -->
      <div class="text-xl font-bold text-gray-800 dark:text-dark-text">Bagus Putra Wiratama</div>

      <!-- Tengah: Navigasi Desktop -->
      <div class="hidden md:flex">
        <ul class="flex items-center space-x-2">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="`#${link.id}`"
              :class="[
                'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                activeSection === link.id
                  ? 'bg-white dark:bg-dark-background shadow-sm text-blue-600 dark:text-dark-primary'
                  : 'text-gray-600 dark:text-dark-text-secondary hover:text-blue-600 dark:hover:text-white'
              ]"
            >
              {{ link.text }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Kanan: Tombol Tema (Desktop) -->
      <div class="hidden md:flex">
        <button @click="toggleTheme" class="p-2 rounded-full hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition-colors duration-300">
          <svg v-if="isDarkMode" class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          <svg v-else class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
      </div>

      <!-- Tombol Navigasi Mobile -->
      <div class="md:hidden">
        <button @click="isMobileMenuOpen = true" class="p-2 rounded-full hover:bg-gray-300/50 dark:hover:bg-gray-600/50 transition-colors duration-300">
            <svg class="w-6 h-6 text-gray-800 dark:text-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
    </nav>
  </header>

  <!-- Panel Menu Mobile -->
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isMobileMenuOpen" class="md:hidden fixed inset-0 z-50">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" @click="isMobileMenuOpen = false"></div>

      <!-- Konten Menu -->
      <div class="fixed top-4 right-4 w-64 bg-white dark:bg-dark-background-light p-5 rounded-2xl shadow-2xl">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-bold text-gray-800 dark:text-dark-text">Menu</h2>
            <button @click="isMobileMenuOpen = false" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <ul class="flex flex-col space-y-2">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="`#${link.id}`"
              @click="isMobileMenuOpen = false"
              :class="[
                'block w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-300',
                activeSection === link.id
                  ? 'bg-blue-50 dark:bg-dark-primary/20 text-blue-600 dark:text-dark-primary'
                  : 'text-gray-600 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-gray-700/50'
              ]"
            >
              {{ link.text }}
            </a>
          </li>
        </ul>
        <div class="border-t border-gray-200 dark:border-gray-700 my-4"></div>
        <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600 dark:text-dark-text-secondary">Ganti Tema</span>
            <button @click="toggleTheme" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300">
                <svg v-if="isDarkMode" class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                <svg v-else class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            </button>
        </div>
      </div>
    </div>
  </transition>
</template>
