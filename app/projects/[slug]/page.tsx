// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation';
import ProjectContent from './ProjectContent';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

// Fetch project from Prisma API
async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/projects/${slug}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProject(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Your Name`,
    description: project.preview || project.title,
    openGraph: {
      title: project.title,
      description: project.preview || project.title,
      images: project.thumbnail ? [project.thumbnail] : [],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-background py-16">
        <div className="container">
          <ProjectContent project={project} />
        </div>
      </main>
      <Footer />
    </div>
  );
}