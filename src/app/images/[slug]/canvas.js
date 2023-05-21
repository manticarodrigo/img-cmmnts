'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { Edit, Send, X } from 'react-feather'
import Draggable from 'react-draggable'

import useClickOutside from '@/hooks/useClickOutside'

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
        className="bg-transparent outline-none w-full"
      />
      <button type="submit" className="ml-2">
        <Send size={16} className="rotate-45" />
      </button>
    </form>
  )
}

export default function Canvas({ slug }) {
  const [annotations, setAnnotations] = useState([])

  const hasOpenAnnotation = annotations.some(
    (annotation) => annotation.open === true,
  )

  const annotationRef = useRef(null)

  useClickOutside(annotationRef, () => {
    const newAnnotations = annotations.map((a) => ({
      ...a,
      open: false,
      comments: a.comments.filter((c) => c.text),
    }))
    setAnnotations(newAnnotations.filter((a) => a.comments.length))
  })

  const handleClick = (e) => {
    const image = e.currentTarget
    const rect = image.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xPercent = (x / rect.width) * 100
    const yPercent = (y / rect.height) * 100

    setAnnotations([
      ...annotations,
      {
        x: xPercent,
        y: yPercent,
        open: true,
        comments: [{ text: '', editable: true }],
      },
    ])
  }

  const handleInputChange = (e, annotationIndex, commentIndex) => {
    const newAnnotations = [...annotations]
    newAnnotations[annotationIndex].comments[commentIndex].text = e.target.value
    setAnnotations(newAnnotations)
  }

  const handleInputBlur = (annotationIndex, commentIndex) => {
    const newAnnotations = [...annotations]
    newAnnotations[annotationIndex].comments[commentIndex].editable = false

    if (!newAnnotations[annotationIndex].comments[commentIndex].text) {
      newAnnotations[annotationIndex].comments.splice(commentIndex, 1)
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

  return (
    <div className="relative">
      <Image
        priority
        src={`/${slug}`}
        alt=""
        height={640}
        width={480}
        onClick={hasOpenAnnotation ? undefined : handleClick}
        className="bg-slate-200"
      />
      {annotations.map((annotation, annotationIndex) => (
        <Draggable
          key={annotationIndex}
          onStop={(e, data) => handleDragEnd(e, data, annotationIndex)}
        >
          <div
            ref={annotation.open ? annotationRef : null}
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
              <div className="w-48">
                <div className="flex justify-end mb-4 p-2 border-b border-slate-50">
                  <button
                    type="button"
                    onClick={() => {
                      const newAnnotations = [...annotations]
                      newAnnotations[annotationIndex].open = false
                      setAnnotations(newAnnotations)
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
                {annotation.comments.map((comment, commentIndex) => (
                  <div key={commentIndex} className="p-2">
                    {comment.editable ? (
                      <CommentForm
                        value={comment.text}
                        onChange={(e) =>
                          handleInputChange(e, annotationIndex, commentIndex)
                        }
                        onBlur={() =>
                          handleInputBlur(annotationIndex, commentIndex)
                        }
                        onSubmit={(e) => {
                          e.preventDefault()
                          handleInputBlur(annotationIndex, commentIndex)
                        }}
                      />
                    ) : (
                      <div className="flex items-center">
                        {comment.text}
                        <button
                          type="button"
                          className="ml-2"
                          onClick={() => {
                            const newAnnotations = [...annotations]
                            newAnnotations[annotationIndex].comments[
                              commentIndex
                            ].editable = true
                            setAnnotations(newAnnotations)
                          }}
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <div className="rounded p-2 bg-slate-700">
                  <CommentForm
                    onSubmit={(e) => {
                      e.preventDefault()

                      const newAnnotations = [...annotations]
                      newAnnotations[annotationIndex].comments.push({
                        text: e.target.text.value,
                      })
                      setAnnotations(newAnnotations)

                      e.target.reset()
                    }}
                  />
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="px-2"
                onClick={() => {
                  const newAnnotations = [...annotations]
                  newAnnotations[annotationIndex].open = true
                  setAnnotations(newAnnotations)
                }}
              >
                {annotationIndex + 1}
              </button>
            )}
          </div>
        </Draggable>
      ))}
    </div>
  )
}
