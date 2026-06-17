import type { Metadata } from "next";
import Providers  from "./providers";
import Analytics from "@/components/Analytics";
import Script from "next/script";
export const metadata: Metadata = {
  title: "SweatSmartly",
  description: "SweatSmartly is een innovatieve app die je helpt om je fitnessdoelen te bereiken door middel van gepersonaliseerde trainingsschema's en voedingsadvies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" style={{ overflowX: 'hidden' }}>
      <head>
      <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>
        <Providers>
          <Analytics />
          {children}
        </Providers>
      </body>
    </html>
  )
}
