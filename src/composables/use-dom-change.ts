import { onUnmounted, watch } from 'vue'
import type { Ref } from 'vue'

let observer: MutationObserver
const handlers: MutationCallback[] = []

export function useDomChange(target: Ref<Element | undefined>, handler: MutationCallback, options: MutationObserverInit = {}) {
  const isSupported = window && 'MutationObserver' in window
  const events: (keyof WindowEventMap)[] = ['scroll', 'resize']

  const cleanup = () => {
    events.forEach(event => {
      window.removeEventListener(event, () => handler([], observer))
    })
  }

  const stopWatch = watch(
    () => target,
    el => {
      cleanup()
      // run handler immediately when target is updated
      handler([], observer)
      events.forEach(event => {
        window.addEventListener(event, () => handler([], observer))
      })

      if (handlers.indexOf(handler) === -1) {
        handlers.push(handler)
      }
      let timer: number

      if (isSupported && window && el && !observer) {
        observer = new MutationObserver((mutations, mutationObserver) => {
          if (timer) clearTimeout(timer)

          timer = setTimeout(() => {
            handlers.forEach(handler => handler(mutations, mutationObserver))
          }, 300)
        })
        observer.observe(document.body, options)
      }
    },
    { immediate: true },
  )

  onUnmounted(() => {
    cleanup()
    stopWatch()
  })

  return {
    cleanup,
    stopWatch,
  }
}
