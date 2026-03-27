import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ConditionalNav } from './components/ConditionalNav'
import { ConditionalFooter } from './components/ConditionalFooter'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Ebrahim Nazmul | Freelance Developer',
  description: 'Ebrahim Nazmul — freelance developer. Web, games, and AI-driven products.',
  keywords: 'Ebrahim Nazmul, Freelance Developer, Web Development, Unity, C#, AI',
  authors: [{ name: 'Ebrahim Nazmul' }],
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans">
        <ConditionalNav />
        <main>{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  )
}
