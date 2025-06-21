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

export const metadata = {
  title: 'Court Share | The Premier NBA Stock Market',
  description:
    'Buy and sell paper-trading shares of your favorite NBA players based on real-time market sentiment. Join the wait-list today!',

  // —— SEO ————————————————————————————
  alternates: {
    canonical: 'https://www.court-share.com',   // <link rel="canonical" …>
  },
  robots: {
    index: true,
    follow: true,
  },

  // —— Open Graph (Facebook, LinkedIn, etc.) ——
  openGraph: {
    type: 'website',
    url: 'https://www.court-share.com',
    title: 'Court Share | The Premier NBA Stock Market',
    description:
      'The first sentiment-driven stock market for NBA players. Secure early access to the paper-trading beta.',
    siteName: 'Court Share',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.court-share.com/social-card.png',
        width: 1200,
        height: 630,
        alt: 'Court Share – NBA Stock Market social card',
      },
    ],
  },

  // —— Twitter ————————————————————————
  twitter: {
    card: 'summary_large_image',
    creator: '@yourhandle',                // ← optional but nice
    site: '@courtshare',                   // ← optional if you have one
    title: 'Court Share | The Premier NBA Stock Market',
    description:
      'The first sentiment-driven stock market for NBA players. Join the wait-list for early access.',
    images: ['https://www.court-share.com/social-card.png'],
  },

  // —— Favicon / touch-icons ——————————
  icons: {
    icon: '/favicon.ico',                  // 32×32
    shortcut: '/favicon-16x16.png',        // optional
    apple: '/apple-touch-icon.png',        // 180×180
  },

  // —— Viewport settings ——————————
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

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
