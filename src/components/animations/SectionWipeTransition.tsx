import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionWipeTransitionProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  triggerPoint?: number;
}

const SectionWipeTransition = ({
  children,
  className = "",
  direction = "left",
  triggerPoint = 0.5,
}: SectionWipeTransitionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 2.3", "end 0.2"],
  });

  const getClipPath = () => {
    switch (direction) {
      case "left":
        return useTransform(
          scrollYProgress,
          [0, triggerPoint, 1],
          ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 100%)"]
        );
      case "right":
        return useTransform(
          scrollYProgress,
          [0, triggerPoint, 1],
          ["inset(0 0 0 100%)", "inset(0 0 0 0%)", "inset(0 100% 0 0%)"]
        );
      case "up":
        return useTransform(
          scrollYProgress,
          [0, triggerPoint, 1],
          ["inset(100% 0 0 0)", "inset(0% 0 0 0)", "inset(0 0 100% 0)"]
        );
      case "down":
        return useTransform(
          scrollYProgress,
          [0, triggerPoint, 1],
          ["inset(0 0 100% 0)", "inset(0 0 0% 0)", "inset(100% 0 0 0)"]
        );
      default:
        return "inset(0 0 0 0)";
    }
  };

  const clipPath = getClipPath();

  return (
    <div ref={sectionRef} className={`relative ${className}`}>
      <motion.div style={{ clipPath }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
};

export default SectionWipeTransition;
