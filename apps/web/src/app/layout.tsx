import "./globals.css";

import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { MobileNavBar } from "@/components/navigation/MobileNavBar/MobileNavBar";
import { Footer } from "@/components/navigation/Footer/Footer";
import QueryProvider from "@/lib/provider";

export const metadata = {
  title: "Loom",
  description: "Loom wow yeah",
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
              <Footer />
            </div>
          </QueryProvider>
        </Theme>
      </body>
    </html>
  );
}
