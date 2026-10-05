import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Binary and Decimal Converter | Amine Aslimani",
  description: "An educational integer converter with step-by-step explanations.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
