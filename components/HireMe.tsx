'use client'

import { motion } from 'framer-motion'
import { Mail, Download, Briefcase } from 'lucide-react'

export default function HireMe() {
  const email = 'sudhanshu14sinha@gmail.com' // Replace with your actual email
  const cvPath = '/cv.pdf' // Path to CV file in public folder

  const handleDownloadCV = () => {
    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = cvPath
    link.download = 'Sudhanshu_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}?subject=Hiring Inquiry`
  }

  return (
    <section id="hireme" className="py-24 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black rounded-lg p-8 md:p-12 text-white"
        >
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center">
              <Briefcase className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-light text-center mb-4">
            Want to hire me?
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-center mb-10 leading-relaxed">
            I'm open to new opportunities and interesting projects. If you'd like to work together, feel free to reach out via email or download my CV to learn more about my experience.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Email Link */}
            <button
              onClick={handleEmailClick}
              className="text-white hover:underline text-base font-medium flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>{email}</span>
            </button>

            {/* Download CV Button */}
            <button
              onClick={handleDownloadCV}
              className="text-white hover:underline text-base font-medium flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

