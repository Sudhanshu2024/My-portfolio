export const dynamic = "force-dynamic";
export const dynamicParams = true;

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

interface BlogPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = params

  const blog = await prisma.blog.findUnique({
    where: { slug },
  })

  if (!blog) {
    return {
      title: 'Blog Not Found',
    }
  }

  return {
    title: blog.title,
    description: blog.summary,
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = params

  const blog = await prisma.blog.findUnique({
    where: { slug },
  })

  if (!blog) {
    notFound()
  }

  return (
    <article className="min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
        >
          ← Back to home
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-light mb-6">{blog.title}</h1>
          {blog.publishedAt && (
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </header>

        {blog.image && (
          <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  )
}
