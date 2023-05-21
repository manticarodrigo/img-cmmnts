import './globals.css'

import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { getImages } from '@/app/api/images/model'
import RootNav from '@/app/nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Image Comments',
  description: 'View and add image comments',
}

export default async function RootLayout(props) {
  const { children } = props
  const images = await getImages()

  return (
    <html lang="en" className="w-full h-full">
      <body className={inter.className + ' w-full h-full'}>
        <div className="flex w-full h-full">
          <RootNav images={images} />
          <main className="flex flex-col items-center p-24 w-full h-full overflow-auto">
            {children}
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
