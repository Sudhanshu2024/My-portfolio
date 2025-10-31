// app/projects/[slug]/ProjectContent.tsx
// SERVER COMPONENT - No 'use client'

import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import { ProjectAnimation } from './ProjectAnimation';

interface Project {
  id: number;
  slug: string;
  title: string;
  preview?: string | null;
  body?: string | null;
  tags: string[];
  thumbnail?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  featured: boolean;
  dateCompleted?: Date | string | null;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface ProjectContentProps {
  project: Project | null;
}

export default function ProjectContent({ project }: ProjectContentProps) {
  if (!project) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/projects"
          className={cn(
            'inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300',
            'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
          )}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Projects
        </Link>
      </div>
    );
  }

  const completedDate = project.dateCompleted || project.createdAt;

  return (
    <ProjectAnimation>
      <article className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Projects
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(completedDate), 'MMMM yyyy')}
            </div>
            
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            )}
            
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                <Github className="w-4 h-4 mr-2" />
                View Code
              </a>
            )}
          </div>

          {project.preview && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {project.preview}
            </p>
          )}
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="relative h-64 sm:h-80 lg:h-[500px] rounded-2xl overflow-hidden">
            {project.thumbnail ? (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-9xl font-bold text-primary/10">
                  {project.title.charAt(0)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
          {project.body ? (
            <MDXRemote
              source={project.body}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug, rehypePrism],
                },
              }}
            />
          ) : (
            <p className="text-muted-foreground">No content available.</p>
          )}
        </div>

        {/* Technologies Used */}
        {project.tags && project.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/projects?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground rounded-full text-sm transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Links */}
        {(project.demoUrl || project.githubUrl) && (
          <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-4">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300',
                  'bg-primary text-primary-foreground hover:bg-primary/90',
                  'shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                )}
              >
                <ExternalLink className="mr-2 w-4 h-4" />
                View Live Project
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300',
                  'bg-muted text-foreground hover:bg-muted/80',
                  'border border-border'
                )}
              >
                <Github className="mr-2 w-4 h-4" />
                View Source Code
              </a>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/projects"
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            View All Projects
          </Link>
        </div>
      </article>
    </ProjectAnimation>
  );
}