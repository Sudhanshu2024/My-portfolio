'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="py-28">
      <div className="grid grid-cols-2 gap-4 md:gap-10 items-center">

        {/* LEFT SIDE TEXT */}
        <div className="pr-2 md:pr-0">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-4xl lg:text-5xl font-semibold tracking-tight mb-2 md:mb-4"
          >
            Hi there, <br /> I'm Sudhanshu.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-muted-foreground text-xs md:text-base lg:text-lg leading-relaxed"
          >
            Welcome to my personal space.  
            I like creating clean, minimal software for the internet.
          </motion.p>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="rounded-lg md:rounded-2xl overflow-hidden shadow-sm border bg-muted w-full max-w-[150px] md:max-w-[300px] lg:max-w-[400px]">
            <Image
              src="/profile.jpeg" // replace with your image
              alt="Sudhanshu"
              width={400}
              height={400}
              className="object-cover grayscale w-full h-auto"
            />
          </div>
        </motion.div>

      </div>

      {/* Divider icon */}
      <div className="flex justify-center mt-20">
        <div className="text-2xl">✦</div>
      </div>
    </section>
  )
}
