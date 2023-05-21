import { getImage } from '@/app/api/images/get'
import Image from 'next/image'

export default async function Preview({ params }) {
  const { slug } = params

  const image = await getImage(slug)

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-4 text-2xl font-bold">{image.title}</h1>
      <Image
        src={`/${slug}`}
        alt="13"
        height={640}
        width={480}
        priority
        className="bg-slate-200"
      />
    </main>
  )
}
