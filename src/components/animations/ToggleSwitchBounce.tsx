import { motion } from "framer-motion";
import { useState } from "react";

interface ToggleSwitchBounceProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  colorScheme?: {
    off: string;
    on: string;
    thumb: string;
  };
  className?: string;
}

const ToggleSwitchBounce = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = "md",
  colorScheme = {
    off: "hsl(var(--muted))",
    on: "hsl(var(--primary))",
    thumb: "white",
  },
  className = "",
}: ToggleSwitchBounceProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const getSizeConfig = () => {
    switch (size) {
      case "sm":
        return {
          width: 36,
          height: 20,
          thumbSize: 16,
          padding: 2,
        };
      case "md":
        return {
          width: 44,
          height: 24,
          thumbSize: 20,
          padding: 2,
        };
      case "lg":
        return {
          width: 52,
          height: 28,
          thumbSize: 24,
          padding: 2,
        };
      default:
        return {
          width: 44,
          height: 24,
          thumbSize: 20,
          padding: 2,
        };
    }
  };

  const sizeConfig = getSizeConfig();

  const getThumbPosition = () => {
    return checked
      ? sizeConfig.width - sizeConfig.thumbSize - sizeConfig.padding
      : sizeConfig.padding;
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <motion.button
        type="button"
        className={`
          relative rounded-full focus:outline-none
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
        style={{
          width: sizeConfig.width,
          height: sizeConfig.height,
        }}
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        disabled={disabled}
        animate={{
          backgroundColor: checked ? colorScheme.on : colorScheme.off,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        whileHover={
          !disabled
            ? {
                scale: 1.05,
                boxShadow: `0 0 0 4px ${
                  checked ? colorScheme.on : colorScheme.off
                }20`,
              }
            : {}
        }
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        {/* Track glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `linear-gradient(90deg, 
              ${checked ? colorScheme.on : colorScheme.off}40, 
              ${checked ? colorScheme.on : colorScheme.off}20)`,
            filter: "blur(4px)",
          }}
          animate={{
            opacity: checked ? 0.8 : 0.3,
            scale: isPressed ? 1.1 : 1,
          }}
        />

        {/* Thumb */}
        <motion.div
          className="absolute top-1/2 rounded-full shadow-lg"
          style={{
            width: sizeConfig.thumbSize,
            height: sizeConfig.thumbSize,
            backgroundColor: colorScheme.thumb,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
          animate={{
            x: getThumbPosition(),
            y: -sizeConfig.thumbSize / 2,
            scale: isPressed ? 1.1 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
            bounce: 0.6,
          }}
        >
          {/* Thumb inner glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, 
                ${checked ? colorScheme.on : colorScheme.off}20, 
                transparent 70%)`,
            }}
            animate={{
              opacity: checked ? 1 : 0,
              scale: checked ? 1.2 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Track dots for visual feedback */}
        <div className="absolute inset-0 flex items-center justify-between px-1">
          <motion.div
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: `${colorScheme.thumb}80` }}
            animate={{
              opacity: checked ? 0 : 1,
              scale: checked ? 0.5 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: `${colorScheme.thumb}80` }}
            animate={{
              opacity: checked ? 1 : 0,
              scale: checked ? 1 : 0.5,
            }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Elastic ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, 
              ${checked ? colorScheme.on : colorScheme.off}30, 
              transparent 70%)`,
          }}
          animate={{
            scale: isPressed ? [1, 1.5, 1] : 1,
            opacity: isPressed ? [0.5, 1, 0] : 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      </motion.button>

      {/* Label */}
      {label && (
        <motion.label
          className={`
            text-sm font-medium cursor-pointer select-none
            ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
          onClick={handleClick}
          whileHover={
            !disabled
              ? {
                  color: checked ? colorScheme.on : "hsl(var(--foreground))",
                }
              : {}
          }
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
    </div>
  );
};

export default ToggleSwitchBounce;
