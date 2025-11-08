import Footer from '@/components/Footer'

export default function NowPage() {
  return (
    <main className="min-h-screen pt-14">
      <article className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-light mb-12">Now</h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              This is a <a href="https://nownownow.com/about">now page</a>. It tells you what I'm focused on right now.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              Update this page to reflect your current focus, projects, and priorities.
            </p>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}

