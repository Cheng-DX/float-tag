
export interface TagOptions {
  height: string,
  maxWidth: string,
  /**
   * unit: px
   */
  offset: number,
  transition: string,
  backgroundColor: string,
  color: string,
  zIndex: number,
}

export type TagDirection = 'right' | 'left' | 'top' | 'bottom'

export interface Tag {
  cloesable: boolean,
  target: string,
  text: string,
  href?: string,
  direction?: TagDirection,
}

export interface FloatTagProps {
  tag: Tag,
  options?: TagOptions,
}

export interface Position {
  left: number,
  top: number,
  right: number,
  width: number,
  height: number,
  bottom: number,
}

export interface FloatStyle {
  height: string;
  maxWidth: string;
  transition: string;
  color: string;
  '--tag-background-color': string;
  '--tag-z-index': number;
  left?: string;
  top?: string;
  display?: string;
}