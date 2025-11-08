'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useBlogs } from '@/lib/hooks/useBlogs'

interface BlogGridProps {
  limit?: number // Optional limit - if not provided, shows all blogs
}

export default function BlogGrid({ limit }: BlogGridProps) {
  const { blogs, isLoading } = useBlogs(limit)

  if (isLoading) {
    return (
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/blog/${blog.slug}`}>
                <article className="group h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {blog.thumbnail && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {blog.summary}
                    </p>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                      Read more →
                    </span>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
        {blogs.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No blog posts yet. Check back soon!
          </p>
        )}
      </div>
    </section>
  )
}

