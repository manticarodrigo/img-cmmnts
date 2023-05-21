import { getImage } from '@/app/api/images/get'
import Canvas from './canvas'

export default async function Preview({ params }) {
  const { slug } = params

  const image = await getImage(slug)

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">{image.title}</h1>
      <Canvas slug={slug} />
    </>
  )
}
