"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionHeadingProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function MotionHeading({ children, className, delay = 0 }: MotionHeadingProps) {
  return (
    <motion.h1
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.h1>
  );
}

export function MotionParagraph({ children, className, delay = 0 }: MotionHeadingProps) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.p>
  );
}

export function MotionDiv({ children, className, delay = 0 }: MotionHeadingProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
} 