<template>
  <div class="p-3 bg-gray-100 shadow rounded-xl">
    <form @submit.prevent="searchItunes">
      <div class="flex">
        <input
          v-model="searchText"
          class="flex-1 p-3 border border-gray-300 rounded-md focus:border-transparent focus:ring-2 focus:ring-blue-500"
          type="search"
          placeholder="Suche nach Film in iTunes..."
          autocomplete="off"
          name="searchiTunes"
          id="search"
        />
      </div>
    </form>
  </div>

  <spinner :active="iTunes.isSearching" />

  <div v-if="iTunes.result?.resultCount" class="mt-6">
    <ul
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
    >
      <li
        class="flex col-span-1 row-span-1 overflow-hidden shadow bg-gray-50 rounded-xl"
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
    const { searchText, iTunes, searchItunes } = useItunesSearch()

    return { searchText, iTunes, searchItunes }
  },
})
</script>
