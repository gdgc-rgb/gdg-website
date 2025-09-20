import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface PerspectiveFlipProps {
  children: ReactNode;
  delay?: number;
  axis?: "x" | "y";
  className?: string;
}

const PerspectiveFlip = ({
  children,
  delay = 0,
  axis = "y",
  className = "",
}: PerspectiveFlipProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const rotateProperty = axis === "x" ? "rotateX" : "rotateY";

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ perspective: 1000 }}
      initial={{
        opacity: 0,
        [rotateProperty]: -90,
        transformOrigin: axis === "x" ? "bottom" : "left",
      }}
      animate={
        inView
          ? {
              opacity: 1,
              [rotateProperty]: 0,
              transition: {
                duration: 0.8,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }
          : {}
      }
    >
      {children}
    </motion.div>
  );
};

export default PerspectiveFlip;
