import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, ReactNode } from "react";

interface MagneticFloatingContainerProps {
  children: ReactNode;
  className?: string;
  magneticStrength?: number;
  floatRange?: number;
  floatDuration?: number;
  dampingFactor?: number;
}

const MagneticFloatingContainer = ({
  children,
  className = "",
  magneticStrength = 0.3,
  floatRange = 10,
  floatDuration = 4,
  dampingFactor = 20,
}: MagneticFloatingContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth magnetic effect
  const springX = useSpring(
    useTransform(
      mouseX,
      [-300, 300],
      [-magneticStrength * 30, magneticStrength * 30]
    ),
    {
      stiffness: 200,
      damping: dampingFactor,
    }
  );

  const springY = useSpring(
    useTransform(
      mouseY,
      [-300, 300],
      [-magneticStrength * 30, magneticStrength * 30]
    ),
    {
      stiffness: 200,
      damping: dampingFactor,
    }
  );

  // Floating animation values
  const floatY = useMotionValue(0);
  const floatX = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Only apply magnetic effect when mouse is within range
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 300;

      if (distance < maxDistance) {
        mouseX.set(deltaX);
        mouseY.set(deltaY);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        y: [0, -floatRange, 0, floatRange, 0],
        x: [0, floatRange / 2, 0, -floatRange / 2, 0],
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    >
      {/* Floating particles around container */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Main content with subtle transform */}
      <motion.div
        className="relative z-10"
        style={{
          rotateY: useTransform(springX, [-30, 30], [-5, 5]),
          rotateX: useTransform(springY, [-30, 30], [5, -5]),
        }}
        whileHover={{
          scale: 1.02,
          rotateY: 2,
          rotateX: 2,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      >
        {children}
      </motion.div>

      {/* Magnetic field visualization */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(var(--primary-rgb), 0.05) 0%, transparent 70%)",
          scale: useTransform(
            useMotionValue(Math.sqrt(springX.get() ** 2 + springY.get() ** 2)),
            [0, 30],
            [1, 1.2]
          ),
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default MagneticFloatingContainer;
