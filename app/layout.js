import "./globals.css";
import { Merriweather, Open_Sans } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "Panchiko",
  description: "Library Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${merriweather.variable} ${openSans.variable} bg-[#2e2e2e] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
