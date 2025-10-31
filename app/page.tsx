import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import BlogGrid from '@/components/BlogGrid';
import ProjectsGrid from '@/components/ProjectsGrid';
import Skills from '@/components/Skills';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        // app/page.tsx
<Hero 
  name="Muhammad Shakir"
  title="Software Engineer (Front-end)"
  description="I'm a solution-oriented Front-end Developer, lifelong learner, and adventurer with a professional background in Software Engineering.

I enjoy development because of the satisfaction I get from overcoming challenges. I have an Engineer mindset. Frameworks and languages are tools for me. What matters is that the problem is solved more cleanly and conveniently.

I have an Engineer mindset. Frameworks and languages are tools for me. What matters is that the problem is solved more cleanly and conveniently."
  image="/images/profile.jpeg"
  ctaText="View Projects"
  ctaLink="/projects"
  secondaryCtaText="Contact Me"
  secondaryCtaLink="/contact"
/>
        
        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Suspense fallback={
          <section className="section-padding bg-background">
            <div className="container">
              <div className="text-center mb-16">
                <div className="animate-pulse">
                  <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
                  <div className="h-4 bg-muted rounded w-96 mx-auto mb-8"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-card rounded-xl overflow-hidden shadow-md">
                    <div className="h-48 bg-muted animate-pulse"></div>
                    <div className="p-6">
                      <div className="h-6 bg-muted rounded w-full mb-3 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded w-3/4 mb-4 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        }>
          <ProjectsGrid 
            title="Featured Projects" 
            showViewAll={true} 
            maxProjects={3} 
          />
        </Suspense>

        {/* Blog Section */}
        <Suspense fallback={
          <section className="section-padding bg-muted/30">
            <div className="container">
              <div className="text-center mb-16">
                <div className="animate-pulse">
                  <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
                  <div className="h-4 bg-muted rounded w-96 mx-auto mb-8"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
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
            </div>
          </section>
        }>
          <BlogGrid 
            title="Latest Blog Posts" 
            showViewAll={true} 
            maxProjects={3} 
          />
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
}