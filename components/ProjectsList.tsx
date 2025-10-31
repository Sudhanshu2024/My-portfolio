'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, Tag } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

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

export default function ProjectsList() {
  const searchParams = useSearchParams();
  const tag = searchParams?.get('tag');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter by tag if present
  const filtered = tag
    ? projects.filter((p) => Array.isArray(p.tags) && p.tags.includes(tag))
    : projects;

  // Get all unique tags for filter
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags))
  ).sort();

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mx-auto mb-4" />
          <div className="h-4 w-32 bg-muted rounded mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Tag Filter */}
      {allTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-2 items-center"
          suppressHydrationWarning
        >
          <Tag className="w-4 h-4 text-muted-foreground" />
          <Link
            href="/projects"
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              !tag
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/projects?tag=${encodeURIComponent(t)}`}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                tag === t
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {t}
            </Link>
          ))}
        </motion.div>
      )}

      {/* Projects Count */}
      <div className="text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
        {tag && ` tagged with "${tag}"`}
      </div>

      {/* Projects Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No projects found{tag && ` for tag "${tag}"`}.
          </p>
          {tag && (
            <Link
              href="/projects"
              className="inline-block mt-4 text-primary hover:underline"
            >
              View all projects
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
              suppressHydrationWarning
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border card-hover hover:shadow-lg transition-all duration-300 h-full flex flex-col">
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
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">
                    {project.preview || 'No preview available.'}
                  </p>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                          +{project.tags.length - 3}
                        </span>
                      )}
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
      )}
    </div>
  );
}