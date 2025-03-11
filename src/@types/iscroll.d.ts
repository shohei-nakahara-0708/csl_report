// @types/iscrollを使用するとエラーになるため一部修正
// see: https://www.npmjs.com/package/@types/iscroll/v/5.2.4?activeTab=explore

export interface IScrollOptions {
  x?: number | undefined
  y?: number | undefined
  bounce?: boolean | undefined
  bounceLock?: boolean | undefined
  momentum?: boolean | undefined
  lockDirection?: boolean | undefined
  useTransform?: boolean | undefined
  useTransition?: boolean | undefined
  topOffset?: number | undefined
  checkDOMChanges?: boolean | undefined
  handleClick?: boolean | undefined

  // Scrollbar
  hScrollbar?: boolean | undefined
  vScrollbar?: boolean | undefined
  fixedScrollbar?: boolean | undefined
  hideScrollbar?: boolean | undefined
  fadeScrollbar?: boolean | undefined
  scrollbarClass?: string | undefined

  // Zoom
  zoom?: boolean | undefined
  zoomMin?: number | undefined
  zoomMax?: number | undefined
  doubleTapZoom?: number | undefined
  mouseWheel?: boolean | undefined
  wheelAction?: string | undefined
  snap?: string | boolean | undefined
  snapThreshold?: number | undefined

  // New in IScroll 5?
  resizeIndicator?: boolean | undefined
  mouseWheelSpeed?: number | undefined
  startX?: number | undefined
  startY?: number | undefined
  scrollX?: boolean | undefined
  scrollY?: boolean | undefined
  scrollbars?: boolean | string | undefined
  shrinkScrollbars?: string | undefined
  interactiveScrollbars?: boolean | undefined
  releaseScroll?: boolean | undefined
  fadeScrollbars?: boolean | undefined
  directionLockThreshold?: number | undefined

  bounceTime?: number | undefined

  ///String or function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bounceEasing?: string | { style: string; fn: (k: any) => any } | undefined

  preventDefault?: boolean | undefined
  // eslint-disable-next-line @typescript-eslint/ban-types
  preventDefaultException?: Array<RegExp> | Object | undefined

  HWCompositing?: boolean | undefined

  freeScroll?: boolean | undefined

  resizePolling?: number | undefined
  tap?: boolean | undefined
  click?: boolean | undefined
  invertWheelDirection?: boolean | undefined
  eventPassthrough?: string | boolean | undefined

  // iScroll probe edition
  probeType?: number | undefined

  // Pointer events
  disableMouse?: boolean | undefined
  disablePointer?: boolean | undefined
  disableTouch?: boolean | undefined
}

declare class IScroll {
  constructor(element: string, options?: IScrollOptions)
  constructor(element: HTMLElement, options?: IScrollOptions)

  x: number
  y: number
  scale: number

  destroy(): void
  refresh(): void
  scrollTo(x: number, y: number, time?: number, relative?: boolean): void
  scrollToElement(element: string, time?: number): void
  scrollToElement(element: HTMLElement, time?: number): void
  scrollToElement(
    element: HTMLElement,
    time?: number,
    offsetX?: number | boolean,
    offsetY?: number | boolean,
    // eslint-disable-next-line @typescript-eslint/ban-types
    easing?: Function
  ): void
  goToPage(pageX: number, pageY: number, time?: number): void
  disable(): void
  enable(): void
  stop(): void
  zoom(scale: number, x?: number, y?: number, time?: number): void
  isReady(): boolean

  // Events
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(type: string, fn: (evt?: any) => void): void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  off(type: string, fn?: (evt?: any) => void): void
}

declare module 'iscroll' {
  const iscroll: {
    new (element: Element | string, options?: IScrollOptions): IScroll
  }

  export = iscroll
}
