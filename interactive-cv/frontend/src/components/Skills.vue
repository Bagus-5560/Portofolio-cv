<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SectionTitle from './SectionTitle.vue';
const skills = ref([]);
onMounted(async () => {
  try {
    const response = await
      axios.get('http://localhost:3000/api/skills'); skills.value =
        response.data;
  } catch (error) { console.error(error); }
});
</script>
<template>
  <section id="skill" class="py-20 bg-gray-50 dark:bg-dark-background-light">
    <div class="container mx-auto px-6">
      <SectionTitle title="Keahlian & Teknologi" />

      <!-- Tampilkan jika data ada -->
      <div v-if="skills.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="bg-white dark:bg-dark-background p-6 rounded-lg shadow-md text-center transition-transform transform hover:-translate-y-1 duration-300"
        >
          <h3 class="text-lg font-bold text-gray-800 dark:text-dark-text">{{ skill.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-dark-text-secondary mt-2">{{ skill.level }}</p>
        </div>
      </div>

      <!-- Loading / error fallback -->
      <div v-else class="text-center text-gray-500 dark:text-gray-400 mt-10">Loading keahlian...</div>
    </div>
  </section>
</template>

