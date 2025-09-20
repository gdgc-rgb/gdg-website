import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ErrorShakeAnimationProps {
  children: React.ReactNode;
  shake?: boolean;
  intensity?: "light" | "medium" | "strong";
  duration?: number;
  className?: string;
}

const ErrorShakeAnimation = ({
  children,
  shake = false,
  intensity = "medium",
  duration = 0.6,
  className = "",
}: ErrorShakeAnimationProps) => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (shake) {
      setIsShaking(true);
      const timer = setTimeout(() => {
        setIsShaking(false);
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [shake, duration]);

  const getShakeIntensity = () => {
    switch (intensity) {
      case "light":
        return 2;
      case "medium":
        return 4;
      case "strong":
        return 8;
      default:
        return 4;
    }
  };

  const shakeAmount = getShakeIntensity();

  const shakeVariants = {
    shake: {
      x: [0, -shakeAmount, shakeAmount, -shakeAmount, shakeAmount, 0],
      transition: {
        duration: duration,
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    },
    static: {
      x: 0,
    },
  };

  return (
    <motion.div
      className={className}
      variants={shakeVariants}
      animate={isShaking ? "shake" : "static"}
      style={{
        transformOrigin: "center",
      }}
    >
      {children}
    </motion.div>
  );
};

export default ErrorShakeAnimation;
