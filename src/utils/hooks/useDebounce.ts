import {
  useEffect,
  useRef,
  useCallback
} from 'react'

export function useDebounce(fn: any, delay: number, dep:unknown[] = []): (...args: any[]) => void {
  const { current } = useRef({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [ fn ]);

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer as any);
    }
    current.timer = setTimeout(() => {
      current.fn(...args);
    }, delay) as any;
  }, dep)
}
