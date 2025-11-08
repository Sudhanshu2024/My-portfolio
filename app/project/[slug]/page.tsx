export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  try {
    const { slug } = params

    const project = await prisma.project.findUnique({
      where: { slug },
    })

    if (!project) {
      return {
        title: 'Project Not Found',
        description: 'The requested project could not be found',
      }
    }

    return {
      title: project.title,
      description: project.description || 'Project details',
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Project',
      description: 'Project details',
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  let project;

  try {
    const { slug } = params

    project = await prisma.project.findUnique({
      where: { slug },
    })

    if (!project) {
      notFound()
    }
  } catch (error) {
    console.error('Error loading project:', error)
    notFound()
  }

  return (
    <article className="min-h-screen pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
        >
          ← Back to projects
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-light mb-6">{project.title}</h1>
          {project.publishedAt && (
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(project.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
        </header>

        {project.image && (
          <div className="relative w-full h-96 mb-12 rounded-lg overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {project.description && (
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </div>
        )}

        {project.techStack && Array.isArray(project.techStack) && project.techStack.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 flex-wrap">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Visit Project
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              View on GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
