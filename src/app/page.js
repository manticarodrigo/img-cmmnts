import Link from 'next/link'
import Image from 'next/image'
import { getImages } from '@/app/api/images/get'

export default async function Home() {
  const data = await getImages()
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-4 text-2xl font-bold">Image Comments</h1>
      <ul className="space-y-2">
        {data.map((img) => {
          return (
            <li
              key={img.image}
              className="rounded-lg border border-slate-900 focus:bg-slate-50 hover:bg-slate-50 transition-colors overflow-hidden"
            >
              <Link
                href={`images/${img.image}`}
                className="flex items-center text-xl w-full h-full"
              >
                <Image
                  alt=""
                  src={`/${img.image}`}
                  width={50}
                  height={50}
                  className="mr-2 border-r border-slate-900 h-[50px] w-[50px] object-cover bg-slate-200"
                />
                <span className="px-4">{img.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
