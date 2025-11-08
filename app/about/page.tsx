import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-16">
      <article className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-light mb-12">About</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              This is the about page. Add your information here.
            </p>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}


