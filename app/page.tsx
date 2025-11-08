import Hero from '@/components/Hero'
import BlogGrid from '@/components/BlogGrid'
import ProjectsCarousel from '@/components/ProjectsCarousel'
import HireMe from '@/components/HireMe'
import Footer from '@/components/Footer'

export default async function Home() {
  return (
    <main className="min-h-screen pt-14">
      <Hero />
      <BlogGrid limit={4} />
      <ProjectsCarousel />
      <HireMe />
      <Footer />
    </main>
  )
}
