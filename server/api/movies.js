export default defineEventHandler(async () => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return { error: 'API key not found' };
  }
  try {
    const res = await $fetch('https://api.themoviedb.org/3/movie/popular?&language=en-US&page=1', {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
    return res;
  } catch (err) {
    return { error: err.message };
  }
});
