import "./globals.css";
import { Inter, Poppins, Plus_Jakarta_Sans } from "next/font/google";
import AnimatedBackground from "../components/AnimatedBackground";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "800"],
  display: "swap",
  variable: "--font-poppins",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500"],
  style: ["italic", "normal"],
  display: "swap",
  variable: "--font-jakarta",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${jakarta.variable} font-sans`}>
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
