'use client'

import { useState } from 'react'

interface Highlight {
  title: string
  description: string
}

export function WhyChooseAccordion({ highlights }: { highlights: Highlight[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="space-y-4">
      {highlights.map((item, index) => (
        <div
          key={item.title}
          className={`border rounded-lg overflow-hidden transition-all duration-300 ${
            activeIndex === index ? 'bg-white shadow-md border-pink/30' : 'bg-white border-gray-100'
          }`}
        >
          <button
            onClick={() => setActiveIndex(index)}
            className={`w-full flex justify-between items-center p-4 font-medium text-left transition-colors duration-200 ${
              activeIndex === index
                ? 'bg-pink text-white'
                : 'text-gray-700 hover:bg-gray-50 hover:text-pink'
            }`}
          >
            <span>{item.title}</span>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              activeIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
