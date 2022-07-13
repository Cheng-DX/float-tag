import { onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useDomRef(selectorRef: Ref<string>) {
  const dom = ref<Element>()

  onMounted(() => {
    const el = document.querySelector(selectorRef.value)
    if (el) dom.value = el
  })

  watch(
    selectorRef,
    () => {
      const el = document.querySelector(selectorRef.value)
      if (el) dom.value = el
    },
    { immediate: true },
  )

  return dom
}
