<script setup>
import movies from "@/assets/pelis.json";
const route = useRoute();
const movie = computed(() => {
  return movies.find((m) => m.id === parseInt(route.params.id));
});

useHead({
  title: `${movie.value?.title} - ErikaLust`,
});
</script>

<template>
  <div class="p-6">
    <button class="btn-primary">
      <NuxtLink to="/">&larr; Volver</NuxtLink>
    </button>
    <div v-if="movie" class="mt-4">
      <img
        :src="movie.image"
        :alt="movie.title"
        class="rounded-lg w-full max-h-96 object-cover mb-4"
      />
      <h1 class="text-3xl font-bold">{{ movie.title }}</h1>
      <p class="text-gray-600 mb-2">
        {{ movie.category }} - {{ movie.duration }} min.
      </p>
      <p class="mb-4">{{ movie.synopsis }}</p>
      <p class="text-sm">
        Actors: <strong>{{ movie.actors.join(", ") }}</strong>
      </p>
    </div>
  </div>
</template>
