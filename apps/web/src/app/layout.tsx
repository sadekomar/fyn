import "./globals.css";

import { Theme } from "@radix-ui/themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import "@radix-ui/themes/styles.css";
import { MobileNavBar } from "@/components/navigation/MobileNavBar/MobileNavBar";
import { Footer } from "@/components/navigation/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/lib/provider";
import { GuestSessionProvider } from "./guest-session-provider";

export const metadata = {
  title: "Loom",
  description: "Loom is a platform for buying and selling products online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#A6A2DE" />

        {/* start of pwa-asset-generator */}
        <link
          rel="apple-touch-icon"
          href="/assets/apple-icon-180-DH6EReZ1.png"
        />

        <meta name="apple-mobile-web-app-capable" content="yes" />

        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-2048-2732-m70GSkUF.jpg"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-2732-2048-DmOrnaqG.jpg"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-1668-2388-Bq2iFpO7.jpg"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-2388-1668-B_9BvOU9.jpg"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-1536-2048-DOUKhJyQ.jpg"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-2048-1536-BqebbH2h.jpg"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-1668-2224-a3_gfYkm.jpg"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-2224-1668-D9GAu-BZ.jpg"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-1620-2160-CqC1qPRL.jpg"
          media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-2160-1620-OhXmozgX.jpg"
          media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-1284-2778-DDElygQD.jpg"
          media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-2778-1284-D9JzrvYW.jpg"
          media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-1170-2532-BEfWBQyf.jpg"
          media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-2532-1170-0CrzmrYt.jpg"
          media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-1125-2436-wtIR4fXL.jpg"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-2436-1125-CMU-PcRe.jpg"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-1242-2688-D-EQ9ZAZ.jpg"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-2688-1242-CMGyhY7A.jpg"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-828-1792-ggS5g7A-.jpg"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-1792-828-Dce01fKA.jpg"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-1242-2208-CYj3rstY.jpg"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-2208-1242-C9i8BosC.jpg"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-750-1334-YKth-ZWa.jpg"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-1334-750-DmAGM07F.jpg"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-640-1136-BUT1xbqL.jpg"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/assets/apple-splash-1136-640-C7NHWVVf.jpg"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        {/* end of pwa generator */}
      </head>
      <body>
        <Theme>
          <QueryProvider>
            <MobileNavBar />
            <div className="footer-outlet">
              <div className="outlet-wrapper">{children}</div>
              <Analytics />
              <GoogleTagManager gtmId="G-60WV7K1R86" />
              <GoogleAnalytics gaId="G-60WV7K1R86" />
              <SpeedInsights />
              <Toaster />
              <Footer />
              <GuestSessionProvider />
            </div>
          </QueryProvider>
        </Theme>
      </body>
    </html>
  );
}
