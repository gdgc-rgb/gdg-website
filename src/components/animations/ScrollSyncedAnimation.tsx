import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollSyncedAnimationProps {
  children: ReactNode;
  className?: string;
  animationType?: "rotate" | "scale" | "slide" | "morph";
  intensity?: number;
  offset?: [string, string];
}

const ScrollSyncedAnimation = ({
  children,
  className = "",
  animationType = "rotate",
  intensity = 1,
  offset = ["start end", "end start"],
}: ScrollSyncedAnimationProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: elementRef,
    offset,
  });

  const getAnimationValues = () => {
    switch (animationType) {
      case "rotate":
        return {
          rotate: useTransform(scrollYProgress, [0, 1], [0, 360 * intensity]),
        };
      case "scale":
        return {
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]),
        };
      case "slide":
        return {
          x: useTransform(scrollYProgress, [0, 1], [0, 100 * intensity]),
          y: useTransform(scrollYProgress, [0, 1], [0, -50 * intensity]),
        };
      case "morph":
        return {
          borderRadius: useTransform(
            scrollYProgress,
            [0, 0.5, 1],
            ["0%", "50%", "0%"]
          ),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]),
        };
      default:
        return {};
    }
  };

  const animationProps = getAnimationValues();

  return (
    <motion.div ref={elementRef} className={className} style={animationProps}>
      {children}
    </motion.div>
  );
};

export default ScrollSyncedAnimation;
