<script setup>
import { useFetch } from 'nuxt/app'

const movie = ref({});
const route = useRoute();

const { data } = await useFetch('/api/movie/' + route.params.id);
movie.value = data.value || {};

useHead({
  title: `${movie.value?.title} - Movie Catalog`,
});
</script>

<template>
  <div class="p-6">
    <button class="btn-primary">
      <NuxtLink to="/">&larr; Volver</NuxtLink>
    </button>
    <div v-if="movie" class="mt-4">
      <img
        :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : ''"
        :alt="movie.title"
        class="rounded-lg w-full max-h-96 object-cover mb-4"
      />
      <h1 class="text-3xl font-bold">{{ movie.title }}</h1>
      <p class="text-gray-600 mb-2">
        País: {{ movie.origin_country[0] }} - Idioma: {{ movie.original_language.toUpperCase() }}
      </p>
      <p class="mb-4">{{ movie.overview }}</p>
      <p class="text-sm">
        Fecha de lanzamiento: <strong>{{ movie.release_date }}</strong>
      </p>
      <div v-for="genre in movie.genres" :key="genre.id" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-2">
        #{{ genre.name }}
      </div>
    </div>
  </div>
</template>
