<template>
  <div class="p-3 bg-gray-100 shadow dark:bg-gray-900 rounded-xl">
    <form @submit.prevent="searchItunes">
      <div class="flex gap-3">
        <input
          v-model="searchText"
          class="flex-1 p-3 border border-gray-300 rounded-md dark:border-gray-600 dark:placeholder-gray-500 dark:text-gray-100 dark:bg-gray-700 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          type="search"
          placeholder="Nach einem Film in iTunes suchen..."
          autocomplete="off"
          name="searchiTunes"
          id="search"
        />

        <select
          v-model="mediaType"
          class="py-3 border border-gray-300 rounded-md dark:border-gray-600 dark:placeholder-gray-500 dark:text-gray-100 dark:bg-gray-700 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          name="media"
          id="media"
        >
          <option value="" disabled>Medientyp</option>
          <option value="movie">Film</option>
          <option value="tvShow">Serie</option>
        </select>
      </div>
    </form>
  </div>

  <spinner :active="iTunes.isSearching" />

  <div v-if="iTunes.result?.resultCount" class="mt-6">
    <ul
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <li
        class="flex col-span-1 row-span-1 overflow-hidden shadow bg-gray-50 dark:bg-gray-900 rounded-xl"
        v-for="movie in iTunes.result.results"
        :key="movie.trackId"
      >
        <movie-card :movie="movie" />
      </li>
    </ul>
  </div>

  <div v-else-if="iTunes.result && !iTunes.result.resultCount">
    <p class="py-8 text-lg italic text-center text-gray-400">
      Keine Ergebnisse gefunden.
    </p>
  </div>

  <div v-else-if="iTunes.error">
    <p class="py-8 text-sm italic font-medium text-center text-red-500">
      {{ iTunes.error }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useItunesSearch } from '../use/itunes-search'

import MovieCard from './MovieCard.vue'
import Spinner from './Spinner.vue'

export default defineComponent({
  components: {
    MovieCard,
    Spinner,
  },

  setup() {
    const { searchText, iTunes, searchItunes, mediaType } = useItunesSearch()

    return { searchText, iTunes, searchItunes, mediaType }
  },
})
</script>
