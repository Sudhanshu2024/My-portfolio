'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Project {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string | null
  techStack: string[]
  createdAt: string
}

export default function ProjectsCarousel() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching projects:', err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
    }
  }, [projects])

  const x = useMotionValue(0)
  const dragConstraints = { left: -width, right: 0 }

  const scrollLeft = () => {
    const newX = Math.min(0, x.get() + 320) // Scroll by one card width (320px = 80 * 4)
    animate(x, newX, { type: 'spring', stiffness: 300, damping: 30 })
  }

  const scrollRight = () => {
    const newX = Math.max(-width, x.get() - 320) // Scroll by one card width
    animate(x, newX, { type: 'spring', stiffness: 300, damping: 30 })
  }

  if (loading) {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-80 h-[400px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto relative">
        {/* Left Navigation Button */}
        {width > 0 && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        )}

        {/* Right Navigation Button */}
        {width > 0 && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        )}

        <motion.div
          ref={carouselRef}
          className="cursor-grab active:cursor-grabbing overflow-hidden"
          whileTap={{ cursor: 'grabbing' }}
        >
          <motion.div
            drag="x"
            dragConstraints={dragConstraints}
            style={{ x }}
            className="flex gap-6"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex-shrink-0 w-80 h-[400px]"
              >
                <Link href={`/project/${project.slug}`}>
                  <article className="group h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                    {project.thumbnail && (
                      <div className="relative w-full h-36 overflow-hidden flex-shrink-0">
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-medium mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {project.title}
                      </h3>
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex gap-2 mb-2 overflow-hidden">
                          {project.techStack.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded whitespace-nowrap flex-shrink-0"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-auto pt-1">
                        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                          View project →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        {projects.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No projects yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  )
}

