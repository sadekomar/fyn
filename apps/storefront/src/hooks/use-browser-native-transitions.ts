import { usePathname } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import { useHash } from "./use-hash";

// TODO: This implementation might not be complete when there are nested
// Suspense boundaries during a route transition. But it should work fine for
// the most common use cases.

export function useBrowserNativeTransitions() {
  const pathname = usePathname();
  const currentPathname = useRef(pathname);

  /* DIFFERENCE FROM ORIGINAL: Added scroll position tracking
   * Store scroll positions by pathname to enable proper scroll restoration
   * on browser back/forward navigation
   */
  const scrollPositions = useRef(new Map<string, { x: number; y: number }>());

  // This is a global state to keep track of the view transition state.
  const [currentViewTransition, setCurrentViewTransition] = useState<
    | null
    | [
        // Promise to wait for the view transition to start
        Promise<void>,
        // Resolver to finish the view transition
        () => void,
      ]
  >(null);

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
          /* console.log('🏃 Throttle: Executing immediately (first call)'); */
          // Execute immediately on first call
          fn(...args);

          timeout = setTimeout(() => {
            /* console.log('⏰ Throttle: Timer expired, executing with latest args'); */
            // Execute with latest args after wait period
            if (lastArgs) {
              fn(...lastArgs);
            }
            timeout = null;
            lastArgs = null;
          }, wait);
        } else {
          /* console.log('🚫 Throttle: Skipping (waiting for timer)'); */
        }
      };
    };

    const onScroll = () => {
      /* console.log('📍 Saving scroll for', pathname, ':', window.scrollX, window.scrollY); */
      scrollPositions.current.set(pathname, {
        x: window.scrollX,
        y: window.scrollY,
      });
      /* console.log('📦 All saved positions:', Array.from(scrollPositions.current.entries())); */
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

  useEffect(() => {
    if (!("startViewTransition" in document)) {
      return () => {};
    }

    const onPopState = () => {
      /* console.log('🔙 POPSTATE EVENT FIRED');
      console.log('🗺️ Current saved positions before restore:', Array.from(scrollPositions.current.entries())); */

      let pendingViewTransitionResolve: () => void;

      const pendingViewTransition = new Promise<void>((resolve) => {
        pendingViewTransitionResolve = resolve;
      });

      const pendingStartViewTransition = new Promise<void>((resolve) => {
        /* DIFFERENCE FROM ORIGINAL: Changed to async function for scroll restoration
         * The original only handles the view transition, we add scroll restoration
         */
        document.startViewTransition(async () => {
          resolve();
          await pendingViewTransition;

          /* DIFFERENCE FROM ORIGINAL: Added delay and scroll restoration logic
           * Small delay to ensure DOM is ready before restoring scroll.
           * TanStack Router also faces similar timing challenges with restoring
           * scroll before DOM paint (see their issue #2601)
           */
          await new Promise((r) => setTimeout(r, 50));

          /* Restore scroll position for the destination page from our saved positions
           * Unlike TanStack which uses sessionStorage, we use an in-memory Map
           * for simplicity since view transitions don't survive page reloads anyway
           */
          const destinationPath = window.location.pathname;
          /* console.log('🎯 Trying to restore scroll for path:', destinationPath); */
          const savedPosition = scrollPositions.current.get(destinationPath);

          if (savedPosition) {
            /* console.log('✅ Found saved position:', savedPosition); */
            window.scrollTo(savedPosition.x, savedPosition.y);
          } else {
            /* console.log('❌ No saved position, scrolling to top'); */
            /* No saved position means it's a new page, scroll to top */
            window.scrollTo(0, 0);
          }
        });
      });

      setCurrentViewTransition([
        pendingStartViewTransition,
        pendingViewTransitionResolve!,
      ]);
    };
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // eslint-disable-next-line
  if (currentViewTransition && currentPathname.current !== pathname) {
    // Whenever the pathname changes, we block the rendering of the new route
    // until the view transition is started (i.e. DOM screenshotted).
    use(currentViewTransition[0]);
  }

  // Keep the transition reference up-to-date.
  const transitionRef = useRef(currentViewTransition);
  useEffect(() => {
    transitionRef.current = currentViewTransition;
  }, [currentViewTransition]);

  const hash = useHash();

  useEffect(() => {
    // When the new route component is actually mounted, we finish the view
    // transition.
    currentPathname.current = pathname;
    if (transitionRef.current) {
      transitionRef.current[1]();
      transitionRef.current = null;
    }
  }, [hash, pathname]);
}
