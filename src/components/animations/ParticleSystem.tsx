import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

interface ParticleSystemProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
  size?: "small" | "medium" | "large";
  speed?: "slow" | "medium" | "fast";
  cursorInteraction?: boolean;
  cursorRadius?: number;
}

const ParticleSystem = ({
  className = "",
  particleCount = 30, // Reduced for performance
  colors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
  ],
  size = "small",
  speed = "slow",
  cursorInteraction = true,
  cursorRadius = 100,
}: ParticleSystemProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const getSizeRange = () => {
    switch (size) {
      case "small":
        return { min: 1, max: 3 };
      case "medium":
        return { min: 2, max: 5 };
      case "large":
        return { min: 3, max: 8 };
      default:
        return { min: 1, max: 3 };
    }
  };

  const getSpeedMultiplier = () => {
    switch (speed) {
      case "slow":
        return 0.3;
      case "medium":
        return 0.6;
      case "fast":
        return 1;
      default:
        return 0.3;
    }
  };

  const createParticle = useCallback(
    (index: number): Particle => {
      const sizeRange = getSizeRange();
      return {
        id: index,
        x: Math.random() * (containerRef.current?.offsetWidth || 800),
        y: Math.random() * (containerRef.current?.offsetHeight || 600),
        vx: (Math.random() - 0.5) * getSpeedMultiplier(),
        vy: (Math.random() - 0.5) * getSpeedMultiplier(),
        size: Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    },
    [colors, size, speed]
  );

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: particleCount }, (_, i) =>
      createParticle(i)
    );
    setParticles(newParticles);
  }, [particleCount, createParticle]);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  }, []);

  // Add mouse event listener
  useEffect(() => {
    const container = containerRef.current;
    if (container && cursorInteraction) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [handleMouseMove, cursorInteraction]);

  // Animation loop - optimized for performance
  useEffect(() => {
    const animate = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let { x, y, vx, vy } = particle;
          const container = containerRef.current;
          if (!container) return particle;

          // Update position
          x += vx;
          y += vy;

          // Cursor interaction
          if (cursorInteraction) {
            const dx = mousePos.x - x;
            const dy = mousePos.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < cursorRadius) {
              const force = (cursorRadius - distance) / cursorRadius;
              const angle = Math.atan2(dy, dx);
              vx -= Math.cos(angle) * force * 0.1;
              vy -= Math.sin(angle) * force * 0.1;
            }
          }

          // Boundary checks with wrapping
          if (x < 0) x = container.offsetWidth;
          if (x > container.offsetWidth) x = 0;
          if (y < 0) y = container.offsetHeight;
          if (y > container.offsetHeight) y = 0;

          // Add some damping
          vx *= 0.99;
          vy *= 0.99;

          // Add random movement to prevent particles from stopping
          vx += (Math.random() - 0.5) * 0.01;
          vy += (Math.random() - 0.5) * 0.01;

          return { ...particle, x, y, vx, vy };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos, cursorInteraction, cursorRadius]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [
              particle.opacity,
              particle.opacity * 0.5,
              particle.opacity,
            ],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Cursor glow effect */}
      {cursorInteraction && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            left: mousePos.x - cursorRadius / 2,
            top: mousePos.y - cursorRadius / 2,
            width: cursorRadius,
            height: cursorRadius,
            background: `radial-gradient(circle, ${colors[0]}10, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
};

export default ParticleSystem;
