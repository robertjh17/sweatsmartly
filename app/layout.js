import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "../components/ui/provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Fitness App",
  description: "Boost je progressie met gepersonaliseerde fitnessadviezen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          {children}
        </Provider>
          
      </body>
    </html>
  );
}
