import { getImages } from './model'

export async function GET(_) {
  const data = await getImages()
  return Response.json(data)
}
