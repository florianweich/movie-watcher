<template>
  <div class="container">
    <header class="flex flex-wrap items-end gap-4">
      <h1 class="text-6xl font-black text-gray-600 dark:text-gray-400">
        iTunes Movies
      </h1>
      <h2 class="text-3xl font-bold text-gray-400 dark:text-gray-500">
        Price Watcher
      </h2>
    </header>

    <main class="mt-8">
      <section>
        <i-tunes-search-bar />
      </section>

      <section>
        <watch-list />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import iTunesSearchBar from './components/iTunesSearchBar.vue'
import WatchList from './components/WatchList.vue'

export default defineComponent({
  name: 'MoviePriceWatcher',

  components: {
    iTunesSearchBar,
    WatchList,
  },
})
</script>
