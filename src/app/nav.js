'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Home } from 'react-feather'

export default function RootNav({ images }) {
  const pathname = usePathname()

  return (
    <nav className="flex-shrink-0 h-full">
      <ul className="divide-y divide-slate-900 border-r border-slate-900 h-full">
        <li className="flex items-center justify-center h-16">
          <Link href="/" className="flex items-center text-lg font-bold">
            <Home className="mr-2" />
            Img Cmmnts
          </Link>
        </li>
        {images.map((img) => {
          const isActive = pathname === `/images/${img.image}`
          return (
            <li
              key={img.image}
              className={`flex focus:bg-blue-50 hover:bg-blue-50 transition-colors ${
                isActive ? 'bg-slate-50 font-medium' : ''
              }`}
            >
              <Link
                href={`images/${img.image}`}
                className="flex items-center text-sm w-full h-full"
              >
                <Image
                  alt=""
                  src={`/${img.image}`}
                  width={50}
                  height={50}
                  className="mr-2 border-r border-slate-900 h-[50px] w-[50px] object-cover bg-slate-200"
                />
                <span className="px-2">{img.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
