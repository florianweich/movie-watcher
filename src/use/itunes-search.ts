import { reactive, ref, watch } from 'vue'
import { ItunesSearchResult } from '../interfaces/ItunesSearchResult'

export function useItunesSearch() {
  const searchText = ref('')

  const iTunes = reactive<ItunesSearchReactive>({
    isSearching: false,
    result: null,
    error: '',
  })

  watch(searchText, (newText) => {
    if (!newText) iTunes.result = null
  })

  const searchItunes = async () => {
    if (iTunes.isSearching) return

    iTunes.isSearching = true
    iTunes.result = null
    iTunes.error = ''

    try {
      const res = await fetch(
        `https://itunes.apple.com/search?media=movie&country=de&term=${searchText.value}`
      )

      const result: ItunesSearchResult = await res.json()

      iTunes.result = result
    } catch (error) {
      iTunes.error = error.message ?? 'Unknown iTunes Search API error.'
    } finally {
      iTunes.isSearching = false
    }
  }

  return {
    searchText,
    iTunes,
    searchItunes,
  }
}

export interface ItunesSearchReactive {
  isSearching: boolean
  result: null | ItunesSearchResult
  error: ''
}
