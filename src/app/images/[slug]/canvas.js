'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Edit, Send, X } from 'react-feather'
import Draggable from 'react-draggable'

function CommentForm({ value, onSubmit, onChange, onBlur }) {
  return (
    <form className="flex items-center" onSubmit={onSubmit}>
      <input
        autoFocus
        type="text"
        name="text"
        placeholder="Add a note..."
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="bg-transparent outline-none w-32"
      />
      <button type="submit" className="ml-2">
        <Send size={16} className="rotate-45" />
      </button>
    </form>
  )
}

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
      { x: xPercent, y: yPercent, text: '', open: true, editable: true },
    ])
  }

  const handleInputChange = (e, index) => {
    const newAnnotations = [...annotations]
    newAnnotations[index].text = e.target.value
    setAnnotations(newAnnotations)
  }

  const handleInputBlur = (index) => {
    const newAnnotations = [...annotations]
    newAnnotations[index].open = false
    newAnnotations[index].editable = false

    if (!newAnnotations[index].text) {
      newAnnotations.splice(index, 1)
    }

    setAnnotations(newAnnotations)
  }

  const handleDragEnd = (e, data, index) => {
    const { deltaX, deltaY } = data
    const xPercent = annotations[index].x + (deltaX / 480) * 100
    const yPercent = annotations[index].y + (deltaY / 640) * 100
    const newAnnotations = [...annotations]
    newAnnotations[index].x = xPercent
    newAnnotations[index].y = yPercent
    setAnnotations(newAnnotations)
  }

  const hasOpenAnnotation = annotations.some(
    (annotation) => annotation.open === true,
  )

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
        <Draggable key={i} onStop={(e, data) => handleDragEnd(e, data, i)}>
          <div
            style={{
              position: 'absolute',
              left: `${annotation.x}%`,
              top: `${annotation.y}%`,
            }}
            className={`rounded-tr rounded-br rounded-bl p-2 text-slate-50 shadow whitespace-nowrap
            ${annotation.open ? ' bg-slate-800' : ' bg-slate-800/80'}
            ${hasOpenAnnotation && !annotation.open ? ' hidden' : ''}`}
          >
            {annotation.open ? (
              <div>
                <div className="flex justify-end mb-2 border-b border-slate-50">
                  <button
                    type="button"
                    onClick={() => {
                      const newAnnotations = [...annotations]
                      newAnnotations[i].open = false
                      newAnnotations[i].editable = false
                      setAnnotations(newAnnotations)
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
                {annotation.editable ? (
                  <CommentForm
                    value={annotation.text}
                    onChange={(e) => handleInputChange(e, i)}
                    onBlur={() => handleInputBlur(i)}
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleInputBlur(i)
                    }}
                  />
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
            ) : (
              <button
                type="button"
                className="px-2"
                onClick={() => {
                  const newAnnotations = [...annotations]
                  newAnnotations[i].open = true
                  setAnnotations(newAnnotations)
                }}
              >
                {i + 1}
              </button>
            )}
          </div>
        </Draggable>
      ))}
    </div>
  )
}
