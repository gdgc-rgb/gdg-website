import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface Blob {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const InteractiveCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const blobIdRef = useRef(0);
  const lastSpawnTime = useRef(0);

  const googleColors = [
    "#4285F4", // Blue
    "#EA4335", // Red
    "#FBBC05", // Yellow
    "#34A853", // Green
  ];

  useEffect(() => {
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Spawn new blobs less frequently for organic feel
      const now = Date.now();
      if (now - lastSpawnTime.current > 80) {
        // Spawn every 80ms
        const newBlob: Blob = {
          id: blobIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 40,
          y: e.clientY + (Math.random() - 0.5) * 40,
          color: googleColors[Math.floor(Math.random() * googleColors.length)],
          size: 20 + Math.random() * 30,
          opacity: 0.3 + Math.random() * 0.4,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          life: 0,
          maxLife: 2000 + Math.random() * 1500, // 2-3.5 seconds
        };

        setBlobs((prev) => [...prev.slice(-15), newBlob]); // Keep max 16 blobs
        lastSpawnTime.current = now;
      }
    };

    const updateBlobs = () => {
      setBlobs((prev) =>
        prev
          .map((blob) => ({
            ...blob,
            x: blob.x + blob.vx,
            y: blob.y + blob.vy,
            vx: blob.vx * 0.998, // Slight deceleration
            vy: blob.vy * 0.998,
            life: blob.life + 16, // Assuming 60fps
            opacity: blob.opacity * (1 - blob.life / blob.maxLife) * 0.999,
          }))
          .filter((blob) => blob.life < blob.maxLife && blob.opacity > 0.01)
      );

      animationFrame = requestAnimationFrame(updateBlobs);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animationFrame = requestAnimationFrame(updateBlobs);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Main cursor glow */}
      <motion.div
        className="absolute w-24 h-24 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(66, 133, 244, 0.2) 0%, rgba(52, 168, 83, 0.15) 30%, rgba(251, 188, 5, 0.1) 60%, transparent 100%)`,
          filter: "blur(15px)",
          mixBlendMode: "screen",
          left: mousePos.x - 48,
          top: mousePos.y - 48,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary pulsing glow */}
      <motion.div
        className="absolute w-16 h-16 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(234, 67, 53, 0.25) 0%, rgba(251, 188, 5, 0.15) 50%, transparent 100%)`,
          filter: "blur(20px)",
          mixBlendMode: "lighten",
          left: mousePos.x - 32,
          top: mousePos.y - 32,
        }}
        animate={{
          scale: [0.8, 1.3, 0.8],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Floating blobs */}
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x - blob.size / 2,
            top: blob.y - blob.size / 2,
            background: `radial-gradient(circle, ${blob.color}40 0%, ${blob.color}20 50%, transparent 100%)`,
            filter: "blur(8px)",
            mixBlendMode: "screen",
            opacity: blob.opacity,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8],
            opacity: blob.opacity,
          }}
          transition={{
            scale: { duration: 0.6, ease: "easeOut" },
            opacity: { duration: 0.3 },
          }}
        />
      ))}

      {/* Trailing vapor effect */}
      <motion.div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, 
            rgba(66, 133, 244, 0.1), 
            rgba(52, 168, 83, 0.08), 
            rgba(251, 188, 5, 0.06), 
            rgba(234, 67, 53, 0.08), 
            rgba(66, 133, 244, 0.1)
          )`,
          filter: "blur(25px)",
          mixBlendMode: "lighten",
          left: mousePos.x - 64,
          top: mousePos.y - 64,
        }}
        animate={{
          rotate: [0, 360],
          scale: [0.9, 1.1, 0.9],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Ambient sparkles */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            background: googleColors[i % googleColors.length],
            filter: "blur(1px)",
            mixBlendMode: "screen",
            left: mousePos.x + Math.sin(Date.now() * 0.001 + i) * 40,
            top: mousePos.y + Math.cos(Date.now() * 0.001 + i) * 40,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.7,
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveCursor;
