'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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

interface BlogGridProps {
  title?: string;
  showViewAll?: boolean;
  maxPosts?: number;
}

export default function BlogGrid({
  title = 'Latest Blog Posts',
  showViewAll = true,
  maxPosts = 6,
}: BlogGridProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch only featured posts for homepage
        const res = await fetch('/api/blogs?featured=true', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const displayedPosts = posts.slice(0, maxPosts);

  if (loading) {
    return (
      <section className="section-padding text-center">
        <div className="container">
          <p className="text-muted-foreground text-lg animate-pulse">
            Loading blog posts...
          </p>
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return (
      <section className="section-padding text-center">
        <div className="container">
          <p className="text-muted-foreground text-lg">
            No featured blog posts available yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-muted/30">
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
            Thoughts, tutorials, and insights about web development, design, and technology.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="card-hover bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-lg transition-all duration-300">
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
                  <div className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.datePublished
                        ? format(new Date(post.datePublished), 'MMM dd, yyyy')
                        : format(new Date(post.createdAt), 'MMM dd, yyyy')}
                    </div>

                    <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.preview || 'No preview available.'}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && posts.length > maxPosts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/blog"
              className={cn(
                'inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300',
                'bg-primary text-primary-foreground hover:bg-primary/90',
                'shadow-lg hover:shadow-xl hover:-translate-y-0.5'
              )}
            >
              View All Posts
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}