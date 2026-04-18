import type { Metadata } from 'next';
import Script from 'next/script';
import { Bricolage_Grotesque, DM_Sans, Figtree } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";
import { getSiteUrlObject, getSocialImagePath } from '@/lib/config';

const META_PIXEL_ID = '1088877953440738';

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrlObject(),
  title: {
    template: 'Avo - %s',
    default: 'Avo | Menu digitale per ristoranti',
  },
  description:
    'Avo aiuta i ristoranti a pubblicare un menu digitale con QR code, traduzioni e gestione semplice dal back office.',
  applicationName: 'Avo',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'Avo',
    title: 'Avo | Menu digitale per ristoranti',
    description:
      'Menu digitale con QR code, traduzioni automatiche e back office semplice per ristoranti.',
    images: [
      {
        url: getSocialImagePath(),
        width: 2000,
        height: 1125,
        alt: 'Anteprima del menu digitale Avo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avo | Menu digitale per ristoranti',
    description:
      'Menu digitale con QR code, traduzioni automatiche e back office semplice per ristoranti.',
    images: [getSocialImagePath()],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={cn("font-sans", figtree.variable)}>
      <head>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </head>
      <body className={`${bricolage.variable} ${dmSans.variable} antialiased`}>
        {children}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}
