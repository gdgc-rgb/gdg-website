import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface HoverImageDistortionProps {
  src: string;
  alt?: string;
  className?: string;
  distortionIntensity?: number;
  waveSpeed?: number;
}

const HoverImageDistortion = ({
  src,
  alt = "",
  className = "",
  distortionIntensity = 10,
  waveSpeed = 2,
}: HoverImageDistortionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main image with CSS filter distortion */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-300"
        style={{
          filter: isHovered
            ? `
                brightness(1.1) 
                contrast(1.1) 
                saturate(1.2)
                hue-rotate(5deg)
              `
            : "none",
          transform: isHovered
            ? `perspective(1000px) rotateX(${
                (mousePosition.y - 50) * 0.1
              }deg) rotateY(${(mousePosition.x - 50) * 0.1}deg)`
            : "none",
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      />

      {/* Wave distortion overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255, 255, 255, 0.1) 0%, 
              transparent 50%
            )
          `,
          mixBlendMode: "overlay",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            conic-gradient(
              from 0deg at ${mousePosition.x}% ${mousePosition.y}%, 
              transparent, 
              rgba(255, 255, 255, 0.05), 
              transparent
            )
          `,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          opacity: { duration: 0.3 },
          rotate: { duration: waveSpeed, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Distortion grid lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
          skewX: isHovered ? `${(mousePosition.x - 50) * 0.02}deg` : "0deg",
          skewY: isHovered ? `${(mousePosition.y - 50) * 0.02}deg` : "0deg",
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      />

      {/* Floating particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                left: `${mousePosition.x + (Math.random() - 0.5) * 40}%`,
                top: `${mousePosition.y + (Math.random() - 0.5) * 40}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -20, -40],
              }}
              transition={{
                duration: 1 + Math.random(),
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255, 255, 255, 0.1) 0%, 
              transparent 60%
            )
          `,
          filter: "blur(20px)",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
};

export default HoverImageDistortion;
