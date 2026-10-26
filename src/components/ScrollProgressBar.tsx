import React from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

interface ScrollProgressBarProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  scrollContainerRef,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-[#DCE5FF]/60 pointer-events-none"
    >
      <motion.div
        style={{
          scaleX: prefersReducedMotion ? scrollYProgress : smoothProgress,
          background:
            'linear-gradient(90deg, #FB4B93 0%, #8B5CF6 52%, #16C4B3 100%)',
          boxShadow:
            '0 3px 12px rgba(124, 58, 237, 0.36), inset 0 1px 2px rgba(255, 255, 255, 0.65)',
        }}
        className="h-full w-full origin-left rounded-r-full will-change-transform"
      />
    </div>
  );
};
