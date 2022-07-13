import { h, defineComponent, computed } from 'vue'
import type { DefineComponent } from 'vue'
import { useDomPosition, useDomRef, useBoolean } from '../composables'
import { createFloatStyle } from './utils'
import type { FloatTagProps } from './types'
import './index.css'

export const FloatTag = defineComponent({
  name: 'FloatTag',
  props: {
    tag: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    }
  },
  setup(props) {
    const { bool: tagVisible, setToFalse: hideTag } = useBoolean(true)

    const target = computed(() => props.tag.target)

    const dom = useDomRef(target)
    const { stopWatch, cleanup, position } = useDomPosition(dom)

    function closeTag() {
      hideTag()
      cleanup()
      stopWatch()
    }

    return () => {
      const { tag, options} = props as FloatTagProps

      return tagVisible.value
        ? h(
          'div',
          {
            style: createFloatStyle(position.value, tag.direction, options),
            class: [
              'wizard-tag-default',
              tag.direction ? `wizard-tag-${tag.direction}` : '',
              tag.href ? 'wizard-tag-link' : '',
            ],
            props: {
              closable: tag.cloesable,
            },
            onClick: () => {
              if (tag.href) {
                window.location.href = tag.href
              }
            },
          },
          tag.text,
        )
        : null
    }
  },
}) as DefineComponent<FloatTagProps>
