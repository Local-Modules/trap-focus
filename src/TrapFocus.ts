const focusableElements = `
  a[href]:not([disabled]), 
  button:not([disabled]), 
  input[type="text"]:not([disabled]),
  input[type="radio"]:not([disabled]), 
  input[type="checkbox"]:not([disabled]), 
  textarea:not([disabled]), 
  select:not([disabled]),
  div[role="button"]:not([disabled])
`

const getFocusableChildren = (element: HTMLElement): NodeListOf<HTMLElement> => element.querySelectorAll(focusableElements)


export type Options = {
  withInitialFocus: boolean
}

class TrapFocus {

  element: HTMLElement

  opts: Options = {
    withInitialFocus: true,
  }

  constructor(element: HTMLElement, options: Partial<Options> = {}) {
    this.element = element
    this.opts = { ...this.opts, ...options }
  }

  mount = () => {
    if (!this.element) {
      console.error('element was not provided in constructor')
      return
    }

    const focusableElements = getFocusableChildren(this.element)
    const firstFocusableEl = focusableElements[0]

    if (this.opts.withInitialFocus && firstFocusableEl) {
      firstFocusableEl.focus()
    }

    this.element.addEventListener('keydown', this.listener)
  }

  unmount = () => {
    if (!this.element) {
      console.error('element was not provided in constructor')
      return
    }

    this.element.removeEventListener('keydown', this.listener)
  }

  listener = (event: KeyboardEvent) => {
    const isTabPressed = event.key === 'Tab' || event.keyCode === 9

    if (!isTabPressed) {
      return
    }

    const focusableElements = getFocusableChildren(this.element)
    const firstFocusableEl = focusableElements[0]
    const lastFocusableEl = focusableElements[focusableElements.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus()
        event.preventDefault()
      }
    }
    else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus()
        event.preventDefault()
      }
    }
  }
}


export default TrapFocus
