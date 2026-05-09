"use client";

import NProgress from "nprogress";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

NProgress.configure({
  showSpinner: false,
  minimum: 0.12,
  speed: 350
});

function isModifiedEvent(event: MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || isModifiedEvent(event)) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (url.origin === currentUrl.origin && url.href !== currentUrl.href) {
        NProgress.start();
      }
    }

    function handleSubmit(event: SubmitEvent) {
      const form = event.target as HTMLFormElement | null;
      if (form?.method.toLowerCase() !== "dialog") {
        NProgress.start();
      }
    }

    window.addEventListener("beforeunload", NProgress.start);
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("submit", handleSubmit);

    return () => {
      window.removeEventListener("beforeunload", NProgress.start);
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
