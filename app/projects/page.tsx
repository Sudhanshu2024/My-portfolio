import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectsList from '@/components/ProjectsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Your Name',
  description: 'Explore my portfolio of web development projects and side projects.',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                My <span className="gradient-text">Projects</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A collection of projects I've built, from personal experiments to client work. 
                Each project represents a unique challenge and learning experience.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding bg-background">
          <div className="container">
            <Suspense
              fallback={
                <div className="text-center py-16">
                  <div className="animate-pulse">
                    <div className="h-8 w-48 bg-muted rounded mx-auto mb-4" />
                    <div className="h-4 w-32 bg-muted rounded mx-auto" />
                  </div>
                </div>
              }
            >
              <ProjectsList />
            </Suspense>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}