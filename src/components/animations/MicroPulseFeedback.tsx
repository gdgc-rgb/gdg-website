import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface MicroPulseFeedbackProps {
  children: React.ReactNode;
  trigger?: boolean;
  pulseColor?: string;
  pulseIntensity?: "light" | "medium" | "strong";
  pulseType?: "scale" | "glow" | "ripple" | "bounce";
  duration?: number;
  className?: string;
  onClick?: () => void;
}

const MicroPulseFeedback = ({
  children,
  trigger = false,
  pulseColor = "hsl(var(--primary))",
  pulseIntensity = "medium",
  pulseType = "scale",
  duration = 0.6,
  className = "",
  onClick,
}: MicroPulseFeedbackProps) => {
  const [isPulsing, setIsPulsing] = useState(false);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger) {
      setIsPulsing(true);
      const timer = setTimeout(() => {
        setIsPulsing(false);
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  const getIntensityValues = () => {
    switch (pulseIntensity) {
      case "light":
        return { scale: 1.02, glow: 0.3, opacity: 0.6 };
      case "medium":
        return { scale: 1.05, glow: 0.5, opacity: 0.8 };
      case "strong":
        return { scale: 1.1, glow: 0.8, opacity: 1 };
      default:
        return { scale: 1.05, glow: 0.5, opacity: 0.8 };
    }
  };

  const intensity = getIntensityValues();

  const handleClick = (e: React.MouseEvent) => {
    if (pulseType === "ripple" && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = { id: Date.now(), x, y };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, duration * 1000);
    }

    setIsPulsing(true);
    setTimeout(() => {
      setIsPulsing(false);
    }, duration * 1000);

    onClick?.();
  };

  const getPulseAnimation = () => {
    if (!isPulsing && !trigger) return {};

    switch (pulseType) {
      case "scale":
        return {
          scale: [1, intensity.scale, 1],
          transition: {
            duration,
            ease: "easeInOut",
          },
        };
      case "glow":
        return {
          boxShadow: [
            "0 0 0 0 transparent",
            `0 0 20px ${pulseColor}${Math.round(intensity.glow * 255).toString(
              16
            )}`,
            "0 0 0 0 transparent",
          ],
          transition: {
            duration,
            ease: "easeInOut",
          },
        };
      case "bounce":
        return {
          scale: [1, intensity.scale, 0.95, 1],
          transition: {
            duration,
            ease: "easeInOut",
            times: [0, 0.4, 0.7, 1],
          },
        };
      default:
        return {
          scale: [1, intensity.scale, 1],
          transition: {
            duration,
            ease: "easeInOut",
          },
        };
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onClick={handleClick}
      animate={getPulseAnimation()}
      whileHover={
        pulseType !== "ripple"
          ? {
              scale: 1.02,
              transition: { duration: 0.2 },
            }
          : {}
      }
      whileTap={
        pulseType !== "ripple"
          ? {
              scale: 0.98,
              transition: { duration: 0.1 },
            }
          : {}
      }
    >
      {children}

      {/* Glow overlay for glow type */}
      {pulseType === "glow" && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${pulseColor}20, transparent 70%)`,
          }}
          animate={{
            opacity: isPulsing || trigger ? intensity.opacity : 0,
            scale: isPulsing || trigger ? 1.2 : 1,
          }}
          transition={{ duration: duration }}
        />
      )}

      {/* Ripple effects */}
      {pulseType === "ripple" &&
        ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
              backgroundColor: `${pulseColor}40`,
            }}
            initial={{
              scale: 0,
              opacity: intensity.opacity,
            }}
            animate={{
              scale: 4,
              opacity: 0,
            }}
            transition={{
              duration,
              ease: "easeOut",
            }}
          />
        ))}

      {/* Success checkmark for completed actions */}
      {(isPulsing || trigger) && pulseType === "bounce" && (
        <motion.div
          className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
            delay: duration * 0.3,
          }}
        >
          <motion.svg
            className="w-2 h-2 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.3,
              delay: duration * 0.5,
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>
      )}

      {/* Particle burst effect for strong intensity */}
      {pulseIntensity === "strong" && (isPulsing || trigger) && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: pulseColor,
                left: "50%",
                top: "50%",
              }}
              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0],
                x: [0, Math.cos((i * 60 * Math.PI) / 180) * 30],
                y: [0, Math.sin((i * 60 * Math.PI) / 180) * 30],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: duration * 0.8,
                ease: "easeOut",
                delay: duration * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MicroPulseFeedback;
