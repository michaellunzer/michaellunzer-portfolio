import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Michael Lunzer',
  description: 'Personal Site',
  authors: [{ name: '@michaellunzer' }],
  metadataBase: new URL('https://www.michaellunzer.com'),
  openGraph: {
    title: 'Michael Lunzer',
    description: 'Personal Site',
    url: 'https://www.michaellunzer.com',
    siteName: 'Michael Lunzer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Michael Lunzer',
    description: 'Personal Site',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/style.css" />
        <link rel="stylesheet" href="/font-awesome.css" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 