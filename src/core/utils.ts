import type { FloatStyle, Position, TagDirection, TagOptions } from "./types"

export function createFloatStyle(position: Position, direction: TagDirection | undefined, options?: TagOptions): FloatStyle {

  if (!direction) direction = 'right'
  const { left = 0, top = 0, right = 0, width = 0, height = 0 } = position || {}

  const {
    height: floatHeight = '',
    maxWidth: floatMaxWidth = '300px',
    offset = 10,
    transition = '',
    backgroundColor = '#f18744',
    color = '#fff',
    zIndex = 999,
  } = options || {}

  const baseStyle = {
    height: floatHeight,
    maxWidth: floatMaxWidth,
    transition,
    color,
    '--tag-background-color': backgroundColor,
    '--tag-z-index': zIndex,
  }
  let dirctionStyle = {}
  switch (direction) {
    case 'right':
      dirctionStyle = {
        top: `${top + height / 2}px`,
        left: `${left + width + offset}px`,
        transform: 'translateY(-50%)',
      }
      break
    case 'top':
      dirctionStyle = {
        top: `${top - offset}px`,
        left: `${right}px`,
        transform: `translateX(-50%) translate(-${width / 2}px, -100%)`,
      }
      break
    case 'bottom':
      dirctionStyle = {
        top: `${top + height + offset}px`,
        left: `${right}px`,
        transform: `translateX(-50%) translate(-${width / 2}px, 0px)`,
      }
      break
    case 'left':
      dirctionStyle = {
        top: `${top + height / 2}px`,
        left: `${right - width - offset}px`,
        transform: 'translate(-100%, -50%)',
      }
      break
    default:
      dirctionStyle = {
        display: 'none',
      }
  }
  return { ...baseStyle, ...dirctionStyle }
}
