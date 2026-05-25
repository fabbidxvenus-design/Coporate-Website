'use client'

import { useState } from 'react'

interface Activity {
  id: string
  icon: string
  label: string
  description: string
  imageUrl: string
}

export function ActivityTabs({ activities }: { activities: Activity[] }) {
  const [activeId, setActiveId] = useState(activities[0].id)
  const activeIndex = activities.findIndex(a => a.id === activeId)
  const activeActivity = activities.find(a => a.id === activeId) || activities[0]

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(activities.length - 1, index))
    setActiveId(activities[clamped].id)
  }

  return (
    <div className="max-w-[1120px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-1/4 bg-[#e6f4f5] rounded-xl p-4 flex flex-col space-y-2">
          {activities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => setActiveId(activity.id)}
              className={`flex items-center space-x-3 w-full p-4 rounded-lg text-left transition ${
                activeId === activity.id
                  ? 'bg-white text-teal-text hover:text-pink font-medium shadow-sm'
                  : 'text-gray-600 hover:bg-white/50 hover:text-pink'
              }`}
            >
              <span className="w-6 h-6 flex items-center justify-center bg-teal-text text-white rounded-none text-xs">{activity.icon}</span>
              <span>{activity.label}</span>
            </button>
          ))}
        </div>
        {/* Content Area */}
        <div className="w-full lg:w-3/4 bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-teal-text hover:text-pink transition-colors cursor-default mb-4">
            {activeActivity.label}
          </h3>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            {activeActivity.description}
          </p>
          <div className="relative">
            <img
              alt={activeActivity.label}
              className="w-full rounded-xl object-cover h-[350px]"
              src={activeActivity.imageUrl || '/images/Teambuilding-scaled.jpg'}
            />
            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous"
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-teal-text hover:text-white transition-all shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              {/* Dots */}
              <div className="flex gap-2">
                {activities.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`w-3 h-3 rounded-full transition-all ${i === activeIndex ? 'bg-teal-text w-8' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next"
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-teal-text hover:text-white transition-all shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
