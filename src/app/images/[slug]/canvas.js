'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Edit, Send } from 'react-feather'

export default function Canvas({ slug }) {
  const [annotations, setAnnotations] = useState([])

  const handleClick = (e) => {
    const image = e.currentTarget
    const rect = image.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xPercent = (x / rect.width) * 100
    const yPercent = (y / rect.height) * 100

    setAnnotations([
      ...annotations,
      { x: xPercent, y: yPercent, text: '', editable: true },
    ])
  }

  const handleInputChange = (e, index) => {
    const newAnnotations = [...annotations]
    newAnnotations[index].text = e.target.value
    setAnnotations(newAnnotations)
  }

  const handleInputBlur = (index) => {
    const newAnnotations = [...annotations]
    newAnnotations[index].editable = false

    if (!newAnnotations[index].text) {
      newAnnotations.splice(index, 1)
    }

    setAnnotations(newAnnotations)
  }

  return (
    <div className="relative">
      <Image
        priority
        src={`/${slug}`}
        alt=""
        height={640}
        width={480}
        onClick={handleClick}
        className="bg-slate-200"
      />
      {annotations.map((annotation, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${annotation.x}%`,
            top: `${annotation.y}%`,
          }}
          className="rounded-tr rounded-br rounded-bl p-2 text-slate-50 bg-slate-800/80 shadow whitespace-nowrap"
        >
          {annotation.editable ? (
            <form
              className="flex items-center"
              onSubmit={(e) => {
                e.preventDefault()
                handleInputBlur(i)
              }}
            >
              <input
                autoFocus
                type="text"
                name="text"
                placeholder="Add a note..."
                value={annotation.text}
                onChange={(e) => handleInputChange(e, i)}
                onBlur={() => handleInputBlur(i)}
                className="bg-transparent outline-none w-32"
              />
              <button type="submit" className="ml-2">
                <Send size={16} className="rotate-45" />
              </button>
            </form>
          ) : (
            <div className="flex items-center">
              {annotation.text}
              <button
                type="button"
                className="ml-2"
                onClick={() => {
                  const newAnnotations = [...annotations]
                  newAnnotations[i].editable = true
                  setAnnotations(newAnnotations)
                }}
              >
                <Edit size={16} />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
