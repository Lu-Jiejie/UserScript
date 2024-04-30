export function throttle<T extends (...args: any[]) => void>(callback: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null
  return ((...args: Parameters<T>) => {
    if (!timer) {
      callback(...args)
      timer = setTimeout(() => {
        timer = null
      }, delay)
    }
  }) as T
}

export function debounce<T extends (...args: any[]) => void>(callback: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null
  return ((...args: Parameters<T>) => {
    if (timer)
      clearTimeout(timer)

    timer = setTimeout(() => {
      callback(...args)
      timer = null
    }, delay)
  }) as T
}
