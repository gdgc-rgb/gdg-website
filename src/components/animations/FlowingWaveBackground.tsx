import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FlowingWaveBackgroundProps {
  children: ReactNode;
  className?: string;
  waveCount?: number;
  colors?: string[];
  speed?: "slow" | "medium" | "fast";
  amplitude?: number;
  opacity?: number;
  direction?: "up" | "down" | "left" | "right";
}

const FlowingWaveBackground = ({
  children,
  className = "",
  waveCount = 3,
  colors = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
  ],
  speed = "medium",
  amplitude = 40,
  opacity = 0.1,
  direction = "right",
}: FlowingWaveBackgroundProps) => {
  const getSpeedDuration = () => {
    switch (speed) {
      case "slow":
        return 8;
      case "medium":
        return 5;
      case "fast":
        return 3;
      default:
        return 5;
    }
  };

  const getWaveTransform = (index: number) => {
    const baseDelay = index * 0.5;
    const duration = getSpeedDuration() + index * 0.5;

    switch (direction) {
      case "right":
        return {
          x: ["-100%", "100%"],
          transition: {
            duration,
            delay: baseDelay,
            repeat: Infinity,
            ease: "linear",
          },
        };
      case "left":
        return {
          x: ["100%", "-100%"],
          transition: {
            duration,
            delay: baseDelay,
            repeat: Infinity,
            ease: "linear",
          },
        };
      case "down":
        return {
          y: ["-100%", "100%"],
          transition: {
            duration,
            delay: baseDelay,
            repeat: Infinity,
            ease: "linear",
          },
        };
      case "up":
        return {
          y: ["100%", "-100%"],
          transition: {
            duration,
            delay: baseDelay,
            repeat: Infinity,
            ease: "linear",
          },
        };
      default:
        return {
          x: ["-100%", "100%"],
          transition: {
            duration,
            delay: baseDelay,
            repeat: Infinity,
            ease: "linear",
          },
        };
    }
  };

  const createWavePath = (index: number) => {
    const waves = 4 + index; // Different wave frequencies
    const phase = index * 60; // Phase offset for each wave
    const points = [];

    for (let i = 0; i <= 100; i++) {
      const x = i;
      const y =
        50 +
        Math.sin((i * waves * Math.PI) / 50 + phase) *
          (amplitude / (index + 1));
      points.push(`${x},${y}`);
    }

    return `M0,100 L${points.join(" L")} L100,100 Z`;
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Wave Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {Array.from({ length: Math.min(waveCount, 5) }, (_, index) => (
            <motion.path
              key={index}
              d={createWavePath(index)}
              fill={colors[index % colors.length]}
              fillOpacity={opacity / (index + 1)}
              animate={{
                d: [
                  createWavePath(index),
                  createWavePath(index + 0.5),
                  createWavePath(index),
                ],
              }}
              transition={{
                duration: getSpeedDuration() + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>

        {/* Moving wave overlay */}
        {Array.from({ length: Math.min(waveCount, 3) }, (_, index) => (
          <motion.div
            key={`overlay-${index}`}
            className="absolute inset-0"
            style={{
              background: `linear-gradient(${
                direction === "right" || direction === "left"
                  ? "90deg"
                  : "180deg"
              }, transparent 30%, ${colors[index % colors.length]}${Math.round(
                opacity * 100
              ).toString(16)} 50%, transparent 70%)`,
              transform:
                direction === "up" || direction === "down"
                  ? "rotate(90deg)"
                  : "none",
            }}
            animate={getWaveTransform(index)}
          />
        ))}
      </div>

      {/* Subtle animated grain overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml;base64,${btoa(`
            <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse">
                  ${Array.from(
                    { length: 50 },
                    (_, i) =>
                      `<circle cx="${Math.random() * 100}" cy="${
                        Math.random() * 100
                      }" r="0.5" fill="currentColor" opacity="0.1"/>`
                  ).join("")}
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grain)"/>
            </svg>
          `)}")`,
        }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default FlowingWaveBackground;
