import { readFileSync } from 'fs'
import path from 'path'

export async function getImages() {
  const file = path.join(process.cwd(), 'fixtures', 'data.json')
  return JSON.parse(readFileSync(file, 'utf8'))
}

export async function getImage(image) {
  const data = await getImages()
  return data.find((img) => img.image === image)
}
