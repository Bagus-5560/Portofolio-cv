<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SectionTitle from './SectionTitle.vue'; // Pastikan komponen ini ada

// State management untuk data dinamis
const skills = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/skills');
    skills.value = response.data;
  } catch (err) {
    console.error('Gagal mengambil data skills:', err);
    error.value = 'Gagal memuat data keahlian. Silakan coba lagi nanti.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section id="skill" class="py-20 dark:text-slate-300">
    <div class="container mx-auto px-6">
      <SectionTitle title="Keahlian & Teknologi" />

      <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400 mt-10">
        <p>Memuat data keahlian...</p>
      </div>

      <div v-else-if="error" class="text-center text-red-500 bg-red-100 dark:bg-red-900/20 dark:text-red-400 p-4 rounded-lg mt-10">
        <p>{{ error }}</p>
      </div>

      <div v-else-if="skills.length > 0" class="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md dark:border dark:border-slate-700 text-center transition-all hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-dark-primary/30 transform hover:-translate-y-2 duration-300"
        >
          <h3 class="text-lg font-bold text-gray-800 dark:text-slate-100">{{ skill.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-slate-400 mt-1">{{ skill.level }}</p>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 dark:text-gray-400 mt-10">
        <p>Tidak ada data keahlian untuk ditampilkan.</p>
      </div>

    </div>
  </section>
</template>
