import { ref } from 'vue'
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
    if (result.itunesId) added.value = true

    adding.value = false
  }

  return {
    addMovie,
    added,
    adding,
  }
}
