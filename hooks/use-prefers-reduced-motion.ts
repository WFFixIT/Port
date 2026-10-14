"use client"

import * as React from "react"

const QUERY = "(prefers-reduced-motion: reduce)"

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

// false until hydrated so server and client markup match (framer-motion's hook doesn't)
export function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
}
