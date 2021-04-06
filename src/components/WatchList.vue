<template>
  <div class="my-10">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-4xl font-black">Watchlist</h2>
        <h3 class="text-xl font-semibold text-gray-400">
          Aktuell überwachte Filme
        </h3>
      </div>
      <div>
        <button
          @click="() => refreshWatchlist()"
          class="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          :class="{ 'animate-spin': updating }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-5 h-5 text-blue-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </div>

    <spinner :active="updating" />

    <div
      class="flex flex-col mt-6"
      v-if="!updating && watchlist?.length"
      :class="{ 'opacity-50': deleting }"
    >
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div
            class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Film
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase"
                  >
                    Preis
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Aktualisiert
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Aktionen</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="odd:bg-white even:bg-gray-50"
                  v-for="movie in watchlist"
                  :key="movie.itunesId"
                >
                  <td
                    class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap"
                  >
                    {{ movie.title }}
                  </td>
                  <td
                    class="px-6 py-4 text-sm text-right text-gray-500 whitespace-nowrap"
                  >
                    {{ formatPrice(movie.price) }}
                  </td>
                  <td
                    class="px-6 py-4 text-sm text-center text-gray-500 whitespace-nowrap"
                  >
                    {{ formatDate(movie.updatedAt) }}
                  </td>
                  <td
                    class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"
                  >
                    <ul class="flex space-x-4">
                      <li>
                        <a
                          :href="movie.link"
                          target="_blank"
                          class="text-blue-600 hover:text-blue-900"
                          >iTunes</a
                        >
                      </li>
                      <li>
                        <a
                          href="#"
                          @click.prevent="deleteMovie(movie.itunesId)"
                          class="text-red-600 hover:text-red-900"
                          >Löschen</a
                        >
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="!updating" class="flex justify-center my-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-20 h-20 text-gray-300"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useWatcher } from '../use/watcher'
import { formatPrice, formatDate } from '../helpers'
import Spinner from './Spinner.vue'

export default defineComponent({
  components: {
    Spinner,
  },

  setup() {
    const {
      updating,
      watchlist,
      refreshWatchlist,
      deleteMovie,
      deleting,
    } = useWatcher()

    onMounted(() => {
      refreshWatchlist()
    })

    return {
      updating,
      watchlist,
      refreshWatchlist,
      deleteMovie,
      formatPrice,
      formatDate,
      deleting,
    }
  },
})
</script>
