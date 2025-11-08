import BlogGrid from '@/components/BlogGrid'
import Footer from '@/components/Footer'

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-14">
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-light mb-12">Thoughts</h1>
        </div>
      </div>
      <BlogGrid />
      <Footer />
    </main>
  )
}
