<script setup>
import { useFetch } from 'nuxt/app'
const moviesList = ref([]);
const selectedPopularity = ref('asc');
const selectedLanguage = ref("");

const { data } = await useFetch('/api/movies');

moviesList.value = data.value?.results || [];

const locales = computed(() => {
  const languages = [];
  moviesList.value.forEach((movie) => {
    if(!languages.includes(movie.original_language)) {
      languages.push(movie.original_language)
    }
  })
  return languages;
});

const filteredLanguage = computed(() => {
  return moviesList.value.filter((movie) =>
    selectedLanguage.value ? movie.original_language === selectedLanguage.value : []
  );
});

const sortedMovies = computed(() => {
  if (!selectedPopularity.value) return filteredLanguage.value;
  return [...filteredLanguage.value].sort((a, b) => {
    if (selectedPopularity.value === "asc") {
      return b.popularity - a.popularity;
    } else {
      return a.popularity - b.popularity;
    }
  });
});

</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-600 mb-4">Catálogo de películas</h1>
    <div class="flex flex-wrap gap-4 mb-6">
      <select v-model="selectedLanguage" class="p-2 border rounded">
        <option value="">Todos los idiomas</option>
        <option
          v-for="language in locales"
          :key="language"
          :value="language"
        >
          {{ language }}
        </option>
      </select>
      <select v-model="selectedPopularity" class="p-2 border rounded">
        <option value="">Todas las popularidades</option>
        <option value="asc">Más populares</option>
        <option value="desc">Menos populares</option>
      </select>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <MovieCard v-for="movie in sortedMovies" :key="movie" :movie="movie" />
    </div>
  </div>
</template>
