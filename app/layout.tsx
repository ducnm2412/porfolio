import type { Metadata } from "next";
import { Baloo_2, Be_Vietnam_Pro, Pacifico } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin", "vietnamese"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kaito Dog — Portfolio",
  description: "Siêu trộm là nghệ sĩ, thám tử chỉ là nhà phê bình.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${baloo.variable} ${beVietnam.variable} ${pacifico.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
