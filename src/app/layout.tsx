import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

export const dmSerif = localFont({
  src: '../assets/fonts/subset-DMSerifText-Regular.woff2',
  variable: '--font-dm-serif-text',
  display: 'swap',
})

export const zain = localFont({
  src: [
    { path: '../assets/fonts/subset-Zain-ExtraLight.woff2', weight: '200' },
    { path: '../assets/fonts/subset-Zain-Light.woff2', weight: '300' },
    { path: '../assets/fonts/subset-Zain-LightItalic.woff2', weight: '300' },
    { path: '../assets/fonts/subset-Zain-Regular.woff2', weight: '400' },
    // { path: '../assets/fonts/subset-Zain-Italic.woff2', weight: '400' },
    { path: '../assets/fonts/subset-Zain-Bold.woff2', weight: '700' },
    { path: '../assets/fonts/subset-Zain-ExtraBold.woff2', weight: '800' },
    { path: '../assets/fonts/subset-Zain-Black.woff2', weight: '900' },
  ],
  variable: '--font-zain',
  display: 'swap',
})



export const metadata: Metadata = {
  title: {
    default: 'إيميرالد | حجر طبيعي',
    template: '%s | إميرالد',
  },
  description:
    'نوفر أجود أنواع الرخام والغرانيت والكوارتز بأفضل الأسعار في سوريا . جودة عالية وتوريد موثوق.',
  keywords: [
    'رخام',
    'إيميرالد للرخام و الغرانيت',
    'سوريا',
    'حماه',
    'غرانيت',
    'كوارتز',
    'حجر طبيعي',
    'حجر بناء',
    'توريد رخام',
  ],
  openGraph: {
    title: 'إميرالد | حجر طبيعي',
    description:
      'تشكيلة واسعة من الأحجار الطبيعية عالية الجودة.',
    type: 'website',
    locale: 'ar_AR',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${zain.className}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
