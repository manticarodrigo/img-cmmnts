import { kv } from '@vercel/kv'

export async function getAnnotations(slug) {
  const annotations = await kv.get(slug)
  return annotations
}

export async function setAnnotations(slug, annotations) {
  await kv.set(slug, JSON.stringify(annotations))
  return getAnnotations(slug)
}
