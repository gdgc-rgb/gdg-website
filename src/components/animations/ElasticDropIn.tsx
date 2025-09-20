import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface ElasticDropInProps {
  children: ReactNode;
  delay?: number;
  dropHeight?: number;
  className?: string;
}

const ElasticDropIn = ({
  children,
  delay = 0,
  dropHeight = 120,
  className = "",
}: ElasticDropInProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: -dropHeight,
        scale: 0.8,
        rotate: -5,
      }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
                bounce: 0.6,
                delay,
                duration: 1.2,
              },
            }
          : {}
      }
    >
      {children}
    </motion.div>
  );
};

export default ElasticDropIn;
