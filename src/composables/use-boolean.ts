import { ref } from 'vue'

export function useBoolean(initialValue = false, effect: Function = () => {}) {
  const bool = ref(initialValue)

  function set(value: boolean) {
    bool.value = value
    effect(value)
  }

  function toggle() {
    bool.value = !bool.value
    effect(bool.value)
  }

  function setToFalse() {
    set(false)
  }

  function setToTrue() {
    set(true)
  }

  function reset() {
    set(initialValue)
  }

  return {
    bool,
    set,
    toggle,
    setToFalse,
    setToTrue,
    reset,
  }
}
