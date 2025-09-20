import { motion } from "framer-motion";
import { useState } from "react";

interface CheckboxMorphingProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const CheckboxMorphing = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = "md",
  color = "hsl(var(--primary))",
  className = "",
}: CheckboxMorphingProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4";
      case "md":
        return "w-5 h-5";
      case "lg":
        return "w-6 h-6";
      default:
        return "w-5 h-5";
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 12;
      case "md":
        return 16;
      case "lg":
        return 20;
      default:
        return 16;
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <motion.button
        type="button"
        className={`
          relative rounded-md border-2 flex items-center justify-center cursor-pointer
          ${getSizeClasses()}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        disabled={disabled}
        animate={{
          borderColor: checked ? color : "hsl(var(--border))",
          backgroundColor: checked ? color : "transparent",
          scale: isPressed ? 0.95 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        whileHover={
          !disabled
            ? {
                borderColor: checked ? color : "hsl(var(--primary))",
                boxShadow: `0 0 0 2px ${color}20`,
              }
            : {}
        }
      >
        {/* Checkmark animation */}
        <motion.div
          className="flex items-center justify-center"
          animate={{
            scale: checked ? 1 : 0,
            rotate: checked ? 0 : 45,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
          }}
        >
          <motion.svg
            width={getIconSize()}
            height={getIconSize()}
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M20 6L9 17l-5-5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: checked ? 1 : 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: checked ? 0.1 : 0,
              }}
            />
          </motion.svg>
        </motion.div>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-md pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${color}30, transparent 70%)`,
          }}
          animate={{
            scale: isPressed ? 2 : 0,
            opacity: isPressed ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Focus ring */}
        <motion.div
          className="absolute inset-0 rounded-md border-2 border-primary/50 pointer-events-none"
          animate={{
            opacity: 0, // Would be controlled by focus state
            scale: 1.1,
          }}
          transition={{ duration: 0.2 }}
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
          whileHover={!disabled ? { color } : {}}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.label>
      )}
    </div>
  );
};

export default CheckboxMorphing;
