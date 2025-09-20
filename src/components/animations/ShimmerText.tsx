import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ShimmerTextProps {
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
  duration?: number;
  delay?: number;
}

const ShimmerText = ({
  children,
  className = "",
  shimmerColor = "rgba(255, 255, 255, 0.6)",
  duration = 2,
  delay = 0,
}: ShimmerTextProps) => {
  return (
    <motion.div
      className={`relative inline-block overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {children}

      <motion.div
        className="absolute inset-0 -skew-x-12"
        style={{
          background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
          width: "100%",
          height: "100%",
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration,
          delay: delay + 0.5,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear",
        }}
      />
    </motion.div>
  );
};

export default ShimmerText;
