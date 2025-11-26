'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';

const GA_ID = 'G-4S1ZKXXLT2';

export default function GaClient() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window || !(window as any).gtag) return;
    // Send a page_view on route change
    (window as any).gtag('event', 'page_view', {
      page_path: pathname,
    });
  }, [pathname]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}', { send_page_view: false });`}
      </Script>
    </>
  );
}
