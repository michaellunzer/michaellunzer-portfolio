import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import '../css/style.css'
import '../css/font-awesome.css'

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
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 