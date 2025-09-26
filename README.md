# Nuxt Minimal Starter

This project is a Nuxt 3 application that fetches popular movies from the [TMDB API](https://developer.themoviedb.org/docs) using secure server-side rendering (SSR) and a custom API endpoint.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, yarn, or bun

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sergioges/test-nuxt.git
   cd test-nuxt
   ```
2. Install dependencies:
   ```bash
   # npm
   npm install
   # pnpm
   pnpm install
   # yarn
   yarn install
   # bun
   bun install
   ```
3. Create a `.env` file in the project root and add your TMDB API key:
   ```env
   TMDB_API_KEY=your_tmdb_api_key_here
   ```
   > **Note:** Do NOT use the `NUXT_PUBLIC_` prefix. This key is only used server-side.

### Development Server
Start the development server at `http://localhost:3000`:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

## Production
Build the application for production:
```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun run build
```
Preview the production build locally:
```bash
npm run preview
# or
yarn preview
# or
pnpm preview
# or
bun run preview
```
See the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more info.

## TMDB API Integration & SSR Fetching

This app uses the TMDB API to fetch popular movies. To keep your API key secure and leverage SSR, all fetching is done via a Nuxt server API endpoint.

### Secure API Endpoint
The file `/server/api/movies.js` acts as a secure proxy between your frontend and TMDB:
```js
export default defineEventHandler(async (event) => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) return { error: 'API key not found' };
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
```

### Fetching from the Frontend
In your Vue components, fetch data using `useFetch` pointing to the local endpoint:
```js
onMounted(async () => {
  const { data } = await useFetch('/api/movies');
  moviesList.value = data.value?.results || [];
});
```
This way, your TMDB key is never exposed to the client, and you can add caching or pagination logic in the endpoint if needed.

### Benefits of this Approach
- **Security:** The API key never reaches the browser.
- **SSR:** Data can be pre-rendered for better SEO and performance.
- **Flexibility:** Easily add caching, pagination, or data transformation in the server endpoint.
