import Link from 'next/link'
import Image from 'next/image'

const data = [
  { title: 'Autumn Puppy', image: 'remy1.jpg' },
  { title: 'Sleepy Puppy', image: 'remy2.jpg' },
  { title: 'Snowy Puppy', image: 'remy3.jpg' },
  { title: 'Playful Puppy', image: 'remy4.jpg' },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="mb-4 text-2xl font-bold">Image Comments</h1>
      <ul className="space-y-2">
        {data.map((img) => {
          return (
            <li
              key={img.image}
              className="rounded-lg border border-slate-900 p-4 focus:bg-slate-50 hover:bg-slate-50 transition-colors"
            >
              <Link
                href={`images/${img.image}`}
                className="flex items-center text-xl"
              >
                <Image
                  alt=""
                  src={`/${img.image}`}
                  width={50}
                  height={50}
                  className="mr-2 rounded-md h-[50px] w-[50px] object-cover"
                />
                {img.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
