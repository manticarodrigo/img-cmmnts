import { getImage } from '@/app/api/images/model'
import { getAnnotations } from '@/app/api/annotations/model'
import Canvas from './canvas'

export default async function Preview({ params }) {
  const { slug } = params

  const image = await getImage(slug)
  const annotations = await getAnnotations(slug)

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">{image.title}</h1>
      <Canvas slug={slug} annotations={annotations} />
    </>
  )
}
