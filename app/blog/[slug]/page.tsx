// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import BlogContent from './BlogContent';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Prisma Blog type
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  preview?: string | null;
  body?: string | null;
  tags: string[];
  datePublished?: Date | string | null;
  status: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Fetch blog post from Prisma API
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs/${slug}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Your Name`,
    description: post.preview || post.title,
    openGraph: {
      title: post.title,
      description: post.preview || post.title,
      type: 'article',
      publishedTime: post.datePublished?.toString() || post.createdAt.toString(),
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-background py-16">
        <div className="container">
          <BlogContent post={post} />
        </div>
      </main>
      <Footer />
    </div>
  );
}