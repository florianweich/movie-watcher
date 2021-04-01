<template>
  <div class="flex flex-col flex-1">
    <img
      :src="movie.artworkUrl100"
      :alt="movie.trackName"
      class="block w-full h-auto"
    />
    <div class="flex flex-col flex-1 p-3">
      <h3 class="text-xl font-bold">{{ movie.trackName }}</h3>

      <span class="block text-lg font-semibold text-blue-600">{{
        formatPrice(movie.collectionHdPrice)
      }}</span>

      <p class="mt-auto text-sm line-clamp-3" :title="movie.longDescription">
        {{ movie.longDescription }}
      </p>

      <p class="mt-2 text-sm">
        <span class="block"
          ><strong class="font-medium">Regie:</strong>
          {{ movie.artistName }}</span
        >
        <span class="block"
          ><strong class="font-medium">VÖ:</strong>
          {{ formatDate(movie.releaseDate) }}</span
        >
      </p>

      <button
        :disabled="added || adding"
        @click.prevent="addMovie(movie.trackId)"
        class="flex items-center justify-center p-2 mt-3 font-semibold text-white rounded-lg flex-nowrap focus:ring-offset-white focus:ring-offset-2 focus:outline-none focus:ring-2"
        :class="
          added || adding
            ? 'bg-gray-500 focus:ring-gray-500'
            : 'bg-blue-600 focus:ring-blue-600 hover:bg-blue-700'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-4 h-4 mr-1 text-white"
        >
          <path
            d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
          /></svg
        ><span>{{ added || adding ? 'Watching...' : 'Watch' }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Result } from '../interfaces/ItunesSearchResult'
import { useWatcher } from '../use/watcher'

export default defineComponent({
  props: {
    movie: { type: Object as PropType<Result>, required: true },
  },

  setup() {
    const formatPrice = (price?: number) => {
      return new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      }).format(price ?? 0)
    }

    const formatDate = (raw: string) => {
      const date = new Date(raw)
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      //@ts-ignore
      return date.toLocaleDateString('de-DE', options)
    }

    const { added, addMovie, adding } = useWatcher()

    return { formatPrice, formatDate, addMovie, added, adding }
  },
})
</script>
