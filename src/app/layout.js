import { Victor_Mono } from "next/font/google";
import "./globals.css";

const victor_mono = Victor_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Tracker",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={victor_mono.className}>{children}</body>
    </html>
  );
}
