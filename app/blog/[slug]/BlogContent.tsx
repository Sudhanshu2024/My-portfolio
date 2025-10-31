// app/blog/[slug]/BlogContent.tsx
// SERVER COMPONENT - No 'use client'

import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowLeft, Clock, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import { BlogAnimation } from './BlogAnimation';

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

interface BlogContentProps {
  post: BlogPost | null;
}

// Calculate reading time
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default function BlogContent({ post }: BlogContentProps) {
  if (!post) {
    return (
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/blog"
          className={cn(
            'inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300',
            'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
          )}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const readingTime = post.body ? calculateReadingTime(post.body) : 5;
  const publishDate = post.datePublished || post.createdAt;

  return (
    <BlogAnimation>
      <article className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Blog
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(publishDate), 'MMMM dd, yyyy')}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {readingTime} min read
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Admin
            </div>
          </div>

          {post.preview && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.preview}
            </p>
          )}
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden">
            {post.thumbnail ? (
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="text-9xl font-bold text-primary/10">
                  {post.title.charAt(0)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
          {post.body ? (
            <MDXRemote
              source={post.body}
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

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground rounded-full text-sm transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            View All Posts
          </Link>
        </div>
      </article>
    </BlogAnimation>
  );
}