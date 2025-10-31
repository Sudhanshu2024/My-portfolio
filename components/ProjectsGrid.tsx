'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface ProjectsGridProps {
  title?: string;
  showViewAll?: boolean;
  maxProjects?: number;
}

export default function ProjectsGrid({
  title = 'Featured Projects',
  showViewAll = true,
  maxProjects = 6,
}: ProjectsGridProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Fetch only featured projects for homepage
        const res = await fetch('/api/projects?featured=true', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const displayedProjects = projects.slice(0, maxProjects);

  if (loading) {
    return (
      <section className="section-padding text-center">
        <div className="container">
          <p className="text-muted-foreground text-lg animate-pulse">
            Loading projects...
          </p>
        </div>
      </section>
    );
  }

  if (!projects.length) {
    return (
      <section className="section-padding text-center">
        <div className="container">
          <p className="text-muted-foreground text-lg">
            No featured projects available yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-background">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
          suppressHydrationWarning
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out some of my recent work and side projects.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
              suppressHydrationWarning
            >
              <div className="card-hover bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <Link href={`/projects/${project.slug}`} className="relative h-48 overflow-hidden">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <div className="text-6xl font-bold text-primary/10">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {project.preview || 'No preview available.'}
                  </p>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
            suppressHydrationWarning
          >
            <Link
              href="/projects"
              className={cn(
                'inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300',
                'bg-primary text-primary-foreground hover:bg-primary/90',
                'shadow-lg hover:shadow-xl hover:-translate-y-0.5'
              )}
            >
              View All Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}