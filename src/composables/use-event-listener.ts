import { onMounted, onUnmounted } from 'vue'

export function useEventListener<K extends keyof WindowEventMap>(type: K, handler: (this: Window, ev: WindowEventMap[K]) => any) {
  const noop = () => { }
  let cleanup = noop

  onMounted(() => {
    window.addEventListener(type, handler)

    cleanup = () => {
      window.removeEventListener(type, handler)
      cleanup = noop
    }
  })

  onUnmounted(cleanup)

  return cleanup
}
