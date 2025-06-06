import "./globals.css";

import { Theme } from "@radix-ui/themes";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager } from "@next/third-parties/google";
import "@radix-ui/themes/styles.css";
import { MobileNavBar } from "@/components/navigation/MobileNavBar/MobileNavBar";
import { Footer } from "@/components/navigation/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/lib/provider";

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
      <body>
        <Theme>
          <QueryProvider>
            <MobileNavBar />
            <div className="footer-outlet">
              <div className="outlet-wrapper">{children}</div>
              <Analytics />
              <GoogleTagManager gtmId="G-60WV7K1R86" />
              <SpeedInsights />
              <Toaster />
              <Footer />
            </div>
          </QueryProvider>
        </Theme>
      </body>
    </html>
  );
}
