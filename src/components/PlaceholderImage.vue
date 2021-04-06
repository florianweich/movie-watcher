<template>
  <div class="overflow-hidden">
    <img
      class="block w-full h-auto transform scale-105 filter blur"
      :class="{ hidden: loaded }"
      :src="placeholderUrl"
    />
    <img
      class="w-full h-auto"
      :class="loaded ? 'block' : 'hidden'"
      :src="url"
      @load="loaded = true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  inheritAttrs: true,

  props: {
    placeholderUrl: String,
    url: String,
  },

  setup() {
    const loaded = ref(false)

    return {
      loaded,
    }
  },
})
</script>
