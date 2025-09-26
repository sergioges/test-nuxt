<script setup>
import movies from "@/assets/pelis.json";

//const categories = [...new Set(movies.map((m) => m.category))];

const categories = [];
movies.forEach((movie) => {
  if (!categories.includes(movie.category)) {
    categories.push(movie.category);
  }
});

const selectedCategory = ref("");
const selectedDuration = ref("");

const filteredCategory = computed(() => {
  return movies.filter((movie) =>
    selectedCategory.value ? movie.category === selectedCategory.value : []
  );
});

const filteredDuration = computed(() => {
  const matchDuration = [];
  movies.filter((movie) => {
    if (selectedDuration.value === "<30" && movie.duration < 30)
      matchDuration.push(movie);
    if (
      selectedDuration.value === "30-60" &&
      movie.duration >= 30 &&
      movie.duration <= 60
    )
      matchDuration.push(movie);
    if (selectedDuration.value === ">60" && movie.duration > 60)
      matchDuration.push(movie);
  });
  return matchDuration;
});

const filteredMovies = computed(() => {
  if (!selectedDuration.value && !selectedCategory.value) {
    return movies;
  }

  // If no duration is selected, use category filter
  if (!selectedDuration.value) {
    return filteredCategory.value;
  }

  // If no category is selected, use duration filter
  if (!selectedCategory.value) {
    return filteredDuration.value;
  }

  // If both filters are active, return movies that match both conditions
  return filteredCategory.value.filter((movie) =>
    filteredDuration.value.includes(movie)
  );
});
</script>

<template>
  <div class="p-6">
    <Navbar />
    <h1 class="text-3xl font-bold text-gray-600 mb-4">Catálogo de películas</h1>
    <div class="flex flex-wrap gap-4 mb-6">
      <select v-model="selectedCategory" class="p-2 border rounded">
        <option value="">Todas las categorías</option>
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
      <select v-model="selectedDuration" class="p-2 border rounded">
        <option value="">Todas las duraciones</option>
        <option value="<30">Menos de 30 min.</option>
        <option value="30-60">De 30 a 60 min.</option>
        <option value=">60">Más de 60 min.</option>
      </select>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg: grid-cols-3 gap-6">
      <MovieCard v-for="movie in filteredMovies" :key="movie" :movie="movie" />
    </div>
  </div>
</template>
