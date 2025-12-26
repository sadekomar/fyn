import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useHash } from "./use-hash";

// TODO: This implementation might not be complete when there are nested
// Suspense boundaries during a route transition. But it should work fine for
// the most common use cases.

export function useBrowserNativeTransitions() {
  const pathname = usePathname();

  /* DIFFERENCE FROM ORIGINAL: Added scroll position tracking
   * Store scroll positions by pathname to enable proper scroll restoration
   * on browser back/forward navigation
   */
  const scrollPositions = useRef(new Map<string, { x: number; y: number }>());

  /* FIX: Disable browser's automatic scroll restoration
   * The browser's default scrollRestoration='auto' causes a race condition
   * with View Transitions API. The browser restores scroll position between
   * when startViewTransition() is called and when its callback executes,
   * causing the snapshot to be taken at the wrong scroll position.
   * Setting it to 'manual' gives us full control over scroll restoration.
   */
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  /* DIFFERENCE FROM ORIGINAL: Added continuous scroll position tracking
   * This effect continuously saves the scroll position as the user scrolls,
   * ensuring we always have the latest position saved for each pathname.
   *
   * COPIED FROM TANSTACK ROUTER: We use their exact throttle implementation
   * from packages/router-core/src/scroll-restoration.ts
   * This throttles scroll events to fire at most once per 100ms
   */
  useEffect(() => {
    /* TanStack Router's throttle with a critical fix:
     * - Executes IMMEDIATELY on first call (captures initial scroll)
     * - Then waits 100ms and executes with the LATEST args (captures final position)
     * This ensures we never miss scroll positions while still throttling
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const throttle = (fn: (...args: Array<any>) => void, wait: number) => {
      let timeout: NodeJS.Timeout | null = null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let lastArgs: Array<any> | null = null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (...args: Array<any>) => {
        lastArgs = args;

        if (!timeout) {
          // Execute immediately on first call
          fn(...args);

          timeout = setTimeout(() => {
            // Execute with latest args after wait period
            if (lastArgs) {
              fn(...lastArgs);
            }
            timeout = null;
            lastArgs = null;
          }, wait);
        }
      };
    };

    const onScroll = () => {
      scrollPositions.current.set(pathname, {
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    /* Apply TanStack's 100ms throttle to scroll events
     * Note: TanStack uses { capture: true } but we use { passive: true }
     * for better performance in React
     */
    const throttledScroll = throttle(onScroll, 100);
    window.addEventListener("scroll", throttledScroll, { passive: true });

    /* Don't save initial position on mount - it's always 0,0 after navigation
     * Let the scroll events capture the actual scrolled positions
     */

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      /* Don't save on unmount - the scroll is already at 0 when navigating away
       * The throttled scroll handler already captured the last position
       */
    };
  }, [pathname]);

  /* Track if navigation was triggered by popstate (back/forward) */
  const isPopstateNavigation = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      /* Mark this as a popstate navigation so we can restore scroll after pathname changes */
      isPopstateNavigation.current = true;
    };
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const hash = useHash();
  const prevPathname = useRef(pathname);

  /* Restore scroll position after pathname changes (works for both forward and back navigation) */
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      if (isPopstateNavigation.current) {
        /* Back/forward navigation: restore saved scroll position */
        const savedPosition = scrollPositions.current.get(pathname);

        /* Use requestAnimationFrame to ensure DOM is ready */
        requestAnimationFrame(() => {
          if (savedPosition) {
            window.scrollTo(savedPosition.x, savedPosition.y);
          } else {
            window.scrollTo(0, 0);
          }
        });

        isPopstateNavigation.current = false;
      } else {
        /* Forward navigation (link click): scroll to top */
        window.scrollTo(0, 0);
      }

      prevPathname.current = pathname;
    }
  }, [pathname, hash]);
}
