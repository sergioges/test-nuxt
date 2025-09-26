<script setup>
defineProps({
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
          :src="movie.image"
          :alt="movie.title"
          class="rounded-lg mb-3 w-full h-48 object-cover"
          loading="lazy"
        />
      </picture>
      <h2 class="font-bold text-lg">{{ movie.title }}</h2>
      <p class="text-sm text-gray-600">
        {{ movie.category }} - {{ movie.duration }}
      </p>
    </div>
  </NuxtLink>
</template>
