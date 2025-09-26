<script setup>
const props = defineProps({
  movie: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<template>
  <NuxtLink :to="`movie/${movie.id}`" class="block">
    <div class="card">
      <picture>
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          :alt="movie.title"
          class="rounded-lg mb-3 w-full h-48 object-cover"
          loading="lazy"
        />
      </picture>
      <h2 class="font-bold text-lg">{{ movie.title }}</h2>
      <p class="text-sm text-gray-600">
         Fecha: {{ movie.release_date }} - Idioma: {{ movie.original_language.toUpperCase() }}
      </p>
    </div>
  </NuxtLink>
</template>
