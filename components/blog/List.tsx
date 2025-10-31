'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

// Prisma Blog type
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  preview?: string | null;
  body?: string | null;
  tags: string[];
  thumbnail?: string | null;
  displayLocation: 'HOME_AND_BLOG' | 'BLOG_ONLY';
  datePublished?: Date | string | null;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export default function BlogList() {
  const searchParams = useSearchParams();
  const tag = searchParams?.get('tag');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch ALL published posts (no featured filter)
        const res = await fetch('/api/blogs', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter by tag if present
  const filtered = tag
    ? posts.filter((p) => Array.isArray(p.tags) && p.tags.includes(tag))
    : posts;

  // Get all unique tags for filter
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags))
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
            href="/blog"
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
              href={`/blog?tag=${encodeURIComponent(t)}`}
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

      {/* Posts Count */}
      <div className="text-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
        {tag && ` tagged with "${tag}"`}
      </div>

      {/* Blog Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No blogs found{tag && ` for tag "${tag}"`}.
          </p>
          {tag && (
            <Link
              href="/blog"
              className="inline-block mt-4 text-primary hover:underline"
            >
              View all posts
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-card rounded-xl overflow-hidden shadow-md border border-border card-hover hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {post.thumbnail ? (
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <div className="text-6xl font-bold text-primary/10">
                          {post.title.charAt(0)}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.datePublished
                        ? format(new Date(post.datePublished), 'MMM dd, yyyy')
                        : format(new Date(post.createdAt), 'MMM dd, yyyy')}
                    </div>

                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground line-clamp-3 mb-4 flex-1">
                      {post.preview || 'No preview available.'}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                          >
                            {t}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}