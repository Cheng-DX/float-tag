import { ref, watch } from 'vue'
import { useDomChange } from './use-dom-change'
import type { Ref } from 'vue'

export function useDomPosition(target: Ref<Element | undefined>) {
  const position = ref()

  let cleanup = () => { }
  let stopWatch = () => { }

  const stopWatchTarget = watch(
    target,
    () => {
      if (!target.value) return

      const updatePosition = () => {
        const dom = target.value
        if (!dom) return
        const { left, top, right, bottom, width, height } = dom.getBoundingClientRect()
        position.value = {
          left,
          top,
          right,
          bottom,
          width,
          height,
        }
      }

      const cleans = useDomChange(target, updatePosition, {
        attributes: true,
        subtree: true,
        characterData: true,
      })

      cleanup = cleans.cleanup
      stopWatch = () => {
        cleans.stopWatch()
        stopWatchTarget()
      }
    },
    {
      immediate: true,
    },
  )

  return { position, stopWatch, cleanup }
}
