"use client"

import * as React from "react"

// true while the element's content is wider than the element, so it scrolls sideways
export function useOverflowsX(ref: React.RefObject<HTMLElement | null>) {
  const [overflows, setOverflows] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setOverflows(el.scrollWidth - el.clientWidth > 4)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref])

  return overflows
}
