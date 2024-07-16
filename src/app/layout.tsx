import { type Metadata } from 'next'
import '@/styles/tailwind.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    template: 'Tim Jackson : %s',
    default: "Tim Jackson's Portfolio",
  },
  description: "A collection of Tim Jackson's work and projects.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-white antialiased">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
        />
        <meta property="og:site_name" content="tj2904.com" />
      </head>
      <body className="flex min-h-full">
        <div className="w-full">{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
