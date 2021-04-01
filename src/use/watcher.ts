import { nextTick, ref } from 'vue'
import { WatcherAddResult } from '../interfaces/WatcherAddResult'

export function useWatcher() {
  /// Already added?
  const added = ref<boolean>(false)

  /// Adding?
  const adding = ref<boolean>(false)

  /// Add movie
  const addMovie = async (itunesId: string | number) => {
    const watcherApiUrl = import.meta.env.VITE_WATCHER_API_URL as string

    /// Request body
    const body = { itunesId, notify: true }

    /// Fire request
    adding.value = true
    const res = await fetch(watcherApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    })

    const result = (await res.json()) as WatcherAddResult
    if (result.itunesId) {
      added.value = true
      nextTick(() => refreshWatchlist())
    }

    adding.value = false
  }

  const updating = ref(false)
  const watchlist = ref<null | WatcherAddResult[]>(null)

  const refreshWatchlist = async (updatePrices: boolean = false) => {
    const watcherApiUrl = `${import.meta.env.VITE_WATCHER_API_URL as string}${
      updatePrices ? '/update' : '/list'
    }`

    updating.value = true

    const res = await fetch(watcherApiUrl)
    const result = (await res.json()).filter(
      (r: WatcherAddResult | null) => r !== null
    )

    watchlist.value = result

    updating.value = false
  }

  const deleting = ref(false)

  const deleteMovie = async (itunesId: string | number) => {
    const watcherApiUrl = import.meta.env.VITE_WATCHER_API_URL as string

    const body = { itunesId }

    deleting.value = true

    const res = await fetch(watcherApiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(body),
    })

    deleting.value = false

    if (res.status === 204) nextTick(() => refreshWatchlist())
  }

  return {
    addMovie,
    added,
    adding,
    refreshWatchlist,
    watchlist,
    updating,
    deleteMovie,
    deleting,
  }
}
