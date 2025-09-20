import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

interface ScrollTransitionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
}

const ScrollTransition = ({
  children,
  className = "",
  threshold = 0.2,
  delay = 0,
  duration = 0.6,
  y = 40,
  scale = 1,
}: ScrollTransitionProps) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration, delay, ease: "easeOut" },
      });
    }
  }, [controls, inView, delay, duration]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, scale }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default ScrollTransition;
