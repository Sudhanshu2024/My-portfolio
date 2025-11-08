'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: Github, username: 'sudhanshu' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin, username: 'sudhanshu' },
  ]

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-black rounded-lg p-8 md:p-12 text-white"
        >
          <div className="flex flex-col gap-8">
            {/* Profile Introduction */}
            <div className="flex items-start gap-4">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/20">
                  <Image
                    src="/profile.jpeg"
                    alt="Sudhanshu"
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              
              {/* Introduction Text */}
              <div className="flex-1">
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Hi ツ I am Sudhanshu and here I document my journey and share my thoughts. From India, living in India.
                </p>
              </div>
            </div>

            {/* Social Links with Text */}
            <div className="flex flex-wrap gap-3 justify-center">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-md hover:bg-white/10 transition-colors text-white"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{social.username}</span>
                  </motion.a>
                )
              })}
            </div>

            {/* Available for Work Link */}
            <div className="text-center">
              <a
                href="#hireme"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById('hireme')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className="text-white hover:underline text-sm md:text-base font-medium inline-flex items-center gap-2 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                <span>I'm available to work for your company</span>
              </a>
            </div>
            
            {/* Copyright */}
            <p className="text-sm text-gray-300 text-center">
              © {currentYear} Sudhanshu. If you are reading this - have a great day ツ
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}


