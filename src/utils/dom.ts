/**
 * Observes when an element becomes visible and calls the callback once.
 * Disconnects the observer after the first visibility event.
 * @param el - Target element
 * @param onVisible - Callback when element becomes visible
 * @param options - IntersectionObserver options
 * @returns Cleanup function that disconnects the observer
 */
export function observeVisibility(
  el: Element,
  onVisible: () => void,
  options?: IntersectionObserverInit
): () => void {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      onVisible()
      observer.disconnect()
    }
  }, options)
  observer.observe(el)
  return () => observer.disconnect()
}

/**
 * Observes resize events on an element using ResizeObserver.
 * @param el - Target element
 * @param onResize - Callback with the ResizeObserverEntry
 * @returns Cleanup function that disconnects the observer
 */
export function observeResize(
  el: Element,
  onResize: (entry: ResizeObserverEntry) => void
): () => void {
  const observer = new ResizeObserver(([entry]) => onResize(entry))
  observer.observe(el)
  return () => observer.disconnect()
}

/**
 * Observes DOM mutations on a node.
 * @param el - Target node
 * @param onMutate - Callback on mutation
 * @param options - MutationObserver options (default: { childList: true, subtree: true })
 * @returns Cleanup function that disconnects the observer
 */
export function observeMutations(
  el: Node,
  onMutate: () => void,
  options?: MutationObserverInit
): () => void {
  const observer = new MutationObserver(() => onMutate())
  observer.observe(el, { childList: true, ...options })
  return () => observer.disconnect()
}

/**
 * Returns a debounced version of the function.
 * The debounced function delays invoking `fn` until `ms` milliseconds
 * have elapsed since the last invocation.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number,
  options?: { leading?: boolean }
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  let leadingCalled = false
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const callNow = options?.leading && !leadingCalled
    if (callNow) {
      leadingCalled = true
      fn.apply(this, args)
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      leadingCalled = false
      fn.apply(this, args)
    }, ms)
  }
}

/**
 * Returns a throttled version of the function.
 * The throttled function invokes `fn` at most once every `ms` milliseconds.
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let lastTime = 0
  let trailingTimer: ReturnType<typeof setTimeout>
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now()
    const remaining = ms - (now - lastTime)
    if (remaining <= 0) {
      if (trailingTimer) {
        clearTimeout(trailingTimer)
        trailingTimer = undefined as unknown as ReturnType<typeof setTimeout>
      }
      lastTime = now
      fn.apply(this, args)
    } else {
      clearTimeout(trailingTimer)
      trailingTimer = setTimeout(() => {
        lastTime = Date.now()
        trailingTimer = undefined as unknown as ReturnType<typeof setTimeout>
        fn.apply(this, args)
      }, remaining)
    }
  }
}

/**
 * Attaches a delegated event listener to a container.
 * Uses `closest(selector)` on the event target to determine if the
 * event should be handled.
 * @param selector - CSS selector for target elements
 * @param eventType - Event type (e.g. 'click')
 * @param handler - Event handler receiving the event and matched target
 * @param container - Container element (default: document)
 * @returns Cleanup function that removes the event listener
 */
export function delegateEvent<T extends Event>(
  selector: string,
  eventType: string,
  handler: (event: T, target: Element) => void,
  container: HTMLElement
): () => void {
  const listener = (event: Event) => {
    const target = (event.target as Element | null)?.closest(selector)
    if (target) handler(event as T, target)
  }
  container.addEventListener(eventType, listener)
  return () => container.removeEventListener(eventType, listener)
}

/**
 * Escapes HTML special characters in a string.
 * Converts &, <, >, ", ' to their HTML entity equivalents.
 */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#47;',
  }
  return str.replace(/[&<>"'/]/g, ch => map[ch])
}

/**
 * Creates a minimal state store with get, set, and subscribe.
 * @param initial - Initial state
 * @returns Store with get(), set(partial), and subscribe(fn) methods
 */
export function createStore<T extends Record<string, unknown>>(initial: T): {
  get: () => T
  set: (partial: Partial<T>) => void
  subscribe: (fn: (state: T) => void) => () => void
} {
  let state = { ...initial }
  const subscribers = new Set<(state: T) => void>()

  return {
    get: () => state,
    set: (partial: Partial<T>) => {
      state = { ...state, ...partial }
      subscribers.forEach(fn => fn(state))
    },
    subscribe: (fn: (state: T) => void) => {
      subscribers.add(fn)
      return () => subscribers.delete(fn)
    },
  }
}

/**
 * Creates a Map from an array using a key function.
 * Useful for O(1) lookups by key.
 * @param items - Array of items
 * @param keyFn - Key extraction function
 * @returns Map of key → item
 */
export function queryMap<K extends string, T>(
  items: T[],
  keyFn: (item: T) => K
): Map<K, T> {
  const map = new Map<K, T>()
  for (const item of items) map.set(keyFn(item), item)
  return map
}

/**
 * Groups array items by the result of a key function.
 * @param items - Array of items
 * @param keyFn - Key extraction function
 * @returns Map of key → array of items
 */
export function groupBy<T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K
): Map<K, T[]> {
  const map = new Map<K, T[]>()
  for (const item of items) {
    const key = keyFn(item)
    const group = map.get(key)
    if (group) group.push(item)
    else map.set(key, [item])
  }
  return map
}
