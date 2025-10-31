'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  name?: string;
  title?: string;
  description?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function Hero({
  name = 'Muhammad Shakir',
  title = 'Software Engineer (Front-end)',
  description = "I'm a solution-oriented Front-end Developer, lifelong learner, and adventurer with a professional background in Software Engineering.\n\nI enjoy development because of the satisfaction I get from overcoming challenges. I have an Engineer mindset. Frameworks and languages are tools for me. What matters is that the problem is solved more cleanly and conveniently.\n\nI have an Engineer mindset. Frameworks and languages are tools for me. What matters is that the problem is solved more cleanly and conveniently.",
  image = "/images/profile.jpeg",
  ctaText = 'View Projects',
  ctaLink = '/projects',
  secondaryCtaText = 'Contact Me',
  secondaryCtaLink = '/contact',
}: HeroProps) {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background Pattern/Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative z-10 min-h-screen flex items-center py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold"
            >
              {name}
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl sm:text-2xl text-gray-400 font-medium"
            >
              {title}
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 text-gray-300 leading-relaxed max-w-xl"
            >
              {description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-sm sm:text-base">
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                href={ctaLink}
                className={cn(
                  'group inline-flex items-center px-8 py-4 rounded-lg font-medium transition-all duration-300',
                  'bg-white text-black hover:bg-gray-200',
                  'shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                )}
              >
                {ctaText}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href={secondaryCtaLink}
                className={cn(
                  'inline-flex items-center px-8 py-4 rounded-lg font-medium transition-all duration-300',
                  'border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/5'
                )}
              >
                {secondaryCtaText}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative lg:justify-self-end"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl">
              {/* Image Container */}
              <div className="relative w-full h-full">
                <Image
  src={image}
  alt={name}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
  priority
  onError={(e) => {
    const target = e.currentTarget as HTMLImageElement;
    target.style.display = 'none';
  }}
/>

                {/* Fallback: Show initials if image doesn't exist */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                  <span className="text-8xl font-bold text-white/20">
                    {name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>

              {/* Decorative Border */}
              <div className="absolute inset-0 border-2 border-white/10 rounded-2xl" />
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl -z-10 opacity-50" />
            </div>

            {/* Floating Accent */}
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-40"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-3xl opacity-40"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}