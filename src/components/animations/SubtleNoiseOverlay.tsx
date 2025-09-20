import { motion } from "framer-motion";

interface SubtleNoiseOverlayProps {
  className?: string;
  intensity?: "light" | "medium" | "strong";
  speed?: "slow" | "medium" | "fast";
  color?: string;
}

const SubtleNoiseOverlay = ({
  className = "",
  intensity = "light",
  speed = "medium",
  color = "currentColor",
}: SubtleNoiseOverlayProps) => {
  const getIntensityOpacity = () => {
    switch (intensity) {
      case "light":
        return 0.03;
      case "medium":
        return 0.06;
      case "strong":
        return 0.1;
      default:
        return 0.03;
    }
  };

  const getSpeedDuration = () => {
    switch (speed) {
      case "slow":
        return 8;
      case "medium":
        return 4;
      case "fast":
        return 2;
      default:
        return 4;
    }
  };

  // Generate noise pattern - optimized for performance
  const generateNoisePattern = (density: number, size: number) => {
    const points = [];
    for (let i = 0; i < density; i++) {
      points.push(
        `<circle cx="${Math.random() * 100}" cy="${
          Math.random() * 100
        }" r="${size}" fill="${color}" opacity="0.4"/>`
      );
    }
    return points.join("");
  };

  const noisePatternSVG = `data:image/svg+xml;base64,${btoa(`
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="noise" width="200" height="200" patternUnits="userSpaceOnUse">
          ${generateNoisePattern(100, 0.5)}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#noise)"/>
    </svg>
  `)}`;

  const alternateNoisePatternSVG = `data:image/svg+xml;base64,${btoa(`
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="noise2" width="200" height="200" patternUnits="userSpaceOnUse">
          ${generateNoisePattern(120, 0.3)}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#noise2)"/>
    </svg>
  `)}`;

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `url("${noisePatternSVG}")`,
        backgroundSize: "200px 200px",
        opacity: getIntensityOpacity(),
        mixBlendMode: "multiply",
      }}
      animate={{
        backgroundImage: [
          `url("${noisePatternSVG}")`,
          `url("${alternateNoisePatternSVG}")`,
          `url("${noisePatternSVG}")`,
        ],
        opacity: [
          getIntensityOpacity(),
          getIntensityOpacity() * 1.5,
          getIntensityOpacity(),
        ],
        backgroundPosition: ["0% 0%", "10% 10%", "0% 0%"],
      }}
      transition={{
        duration: getSpeedDuration(),
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default SubtleNoiseOverlay;
