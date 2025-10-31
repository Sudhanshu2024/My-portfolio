import { Suspense } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

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

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch blogs');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

async function BlogGrid() {
  const blogPosts = await getBlogPosts();

  if (blogPosts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">
          No blog posts available yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post) => (
        <article key={post.id} className="group">
          <Link href={`/blog/${post.slug}`}>
            <div className="card-hover bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              {/* Image Placeholder */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-primary/10">
                    {post.title.charAt(0)}
                  </div>
                </div>
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
                
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
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
        </article>
      ))}
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                My <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Thoughts, tutorials, and insights about web development, design, and technology. 
                Join me on my journey of continuous learning and sharing knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="section-padding bg-background">
          <div className="container">
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl overflow-hidden shadow-md">
                    <div className="h-48 bg-muted animate-pulse"></div>
                    <div className="p-6">
                      <div className="h-4 bg-muted rounded w-24 mb-3 animate-pulse"></div>
                      <div className="h-6 bg-muted rounded w-full mb-3 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mb-4 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            }>
              <BlogGrid />
            </Suspense>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="section-padding bg-background">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Stay Updated
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Subscribe to my newsletter to get notified about new posts and updates. 
                No spam, just quality content delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  className={cn(
                    "px-6 py-3 rounded-lg font-medium transition-all duration-300",
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                    "shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  )}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}