<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SectionTitle from './SectionTitle.vue';

// State management untuk data dinamis
const projects = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get('/api/projects');
    projects.value = response.data;
  } catch (err) {
    console.error('Gagal mengambil data proyek:', err);
    error.value = 'Gagal memuat data proyek. Silakan coba lagi nanti.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section id="proyek" class="py-20 md:py-28 dark:text-slate-300">
    <div class="container mx-auto px-6">
      <SectionTitle title="Proyek Unggulan" />

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="n in 3" :key="n" class="bg-white dark:bg-slate-800 rounded-lg shadow-md dark:border dark:border-slate-700 overflow-hidden">
          <div class="w-full h-48 bg-gray-300 dark:bg-slate-700 animate-pulse"></div>
          <div class="p-6">
            <div class="h-6 w-3/4 bg-gray-300 dark:bg-slate-700 animate-pulse rounded-md mb-4"></div>
            <div class="h-4 w-full bg-gray-300 dark:bg-slate-700 animate-pulse rounded-md mb-2"></div>
            <div class="h-4 w-5/6 bg-gray-300 dark:bg-slate-700 animate-pulse rounded-md"></div>
            <div class="flex gap-2 mt-4">
              <div class="h-6 w-16 bg-gray-300 dark:bg-slate-700 animate-pulse rounded-full"></div>
              <div class="h-6 w-20 bg-gray-300 dark:bg-slate-700 animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="text-center text-red-500 bg-red-100 dark:bg-red-900/20 dark:text-red-400 p-4 rounded-lg mt-10">
        <p>{{ error }}</p>
      </div>

      <div v-else-if="projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <a
          v-for="project in projects"
          :key="project.title"
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class=" bg-white dark:bg-slate-800 rounded-lg shadow-lg dark:border dark:border-slate-700 overflow-hidden group flex flex-col transition-all hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-dark-primary/30 duration-300 hover:-translate-y-2"
        >
          <div class="overflow-hidden">
            <img
              :src="getImageUrl(project.image)"
              :alt="`Gambar Proyek + {project.title}`"
              class="w-full h-48 object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-gray-800 dark:text-slate-100 mb-2">
              {{ project.title }}
            </h3>
            <p class="text-gray-600 dark:text-slate-400 text-sm mb-4 flex-grow">
              {{ project.description }}
            </p>
            <div class="mt-auto">
              <span
                v-for="t in project.tech"
                :key="t"
                class="inline-block bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold mr-2 mb-2 px-3 py-1 rounded-full"
              >
                {{ t }}
              </span>
            </div>
          </div>
        </a>
      </div>

      <div v-else class="text-center text-gray-500 dark:text-gray-400 mt-10">
        <p>Tidak ada data proyek untuk ditampilkan.</p>
      </div>
    </div>
  </section>
</template>
