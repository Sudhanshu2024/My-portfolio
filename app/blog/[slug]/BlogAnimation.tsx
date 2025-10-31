// app/blog/[slug]/BlogAnimation.tsx
'use client';

import { motion, LazyMotion, domAnimation } from 'framer-motion';

export function BlogAnimation({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        suppressHydrationWarning
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
}