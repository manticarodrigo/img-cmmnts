import { getAnnotations, setAnnotations } from './model'

export const runtime = 'edge'

export async function GET(request) {
  const { slug } = await request.json()
  const response = await getAnnotations(slug)
  return Response.json(response)
}

export async function POST(request) {
  const { slug, annotations } = await request.json()
  const response = await setAnnotations(slug, annotations)
  return Response.json(response)
}
