import { useRef, useEffect } from 'react'

import TrapFocus from './TrapFocus'
import type { Options } from './TrapFocus'


const useTrapFocus = (opts?: Options) => {
  const ref = useRef<HTMLElement>()

  useEffect(() => {
    // could be "null" if modal opened in iframe
    if (ref.current) {
      const trapFocus = new TrapFocus(ref.current, opts)

      ref.current.focus()
      trapFocus.mount()

      return () => {
        trapFocus.unmount()
      }
    }
  }, [])

  return ref
}


export default useTrapFocus
