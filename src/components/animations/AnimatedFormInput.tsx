import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface AnimatedFormInputProps {
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  variant?: "default" | "underline" | "filled";
}

const AnimatedFormInput = ({
  label,
  type = "text",
  value = "",
  onChange,
  onFocus,
  onBlur,
  placeholder,
  required = false,
  disabled = false,
  error,
  className = "",
  variant = "default",
}: AnimatedFormInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasValue(value.length > 0);
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const getInputClasses = () => {
    const baseClasses =
      "w-full px-3 py-3 text-foreground bg-transparent transition-all duration-200 outline-none";

    switch (variant) {
      case "underline":
        return `${baseClasses} border-0 border-b-2 border-muted-foreground/30 focus:border-primary rounded-none`;
      case "filled":
        return `${baseClasses} bg-muted/50 border border-transparent focus:bg-background focus:border-primary rounded-lg`;
      default:
        return `${baseClasses} border border-border focus:border-primary rounded-lg`;
    }
  };

  const getLabelPosition = () => {
    if (isFocused || hasValue) {
      return {
        y: variant === "underline" ? -24 : -12,
        scale: 0.85,
        color: isFocused
          ? "hsl(var(--primary))"
          : "hsl(var(--muted-foreground))",
      };
    }
    return {
      y: 0,
      scale: 1,
      color: "hsl(var(--muted-foreground))",
    };
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {/* Input field */}
        <motion.input
          ref={inputRef}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={
            placeholder && (isFocused || hasValue) ? placeholder : ""
          }
          required={required}
          disabled={disabled}
          className={getInputClasses()}
          animate={{
            borderColor: error
              ? "hsl(var(--destructive))"
              : isFocused
              ? "hsl(var(--primary))"
              : "hsl(var(--border))",
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Floating label */}
        <motion.label
          className="absolute left-3 pointer-events-none font-medium select-none"
          style={{
            top: variant === "underline" ? "12px" : "12px",
            transformOrigin: "left center",
          }}
          animate={getLabelPosition()}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
          {required && (
            <motion.span
              className="text-destructive ml-1"
              animate={{
                opacity: isFocused || hasValue ? 1 : 0.7,
              }}
            >
              *
            </motion.span>
          )}
        </motion.label>

        {/* Focus ring effect */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: `linear-gradient(90deg, 
              hsl(var(--primary) / 0.1), 
              hsl(var(--secondary) / 0.1))`,
          }}
          animate={{
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Underline animation for underline variant */}
        {variant === "underline" && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-primary"
            animate={{
              width: isFocused ? "100%" : "0%",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          />
        )}
      </div>

      {/* Error message */}
      <motion.div
        className="overflow-hidden"
        animate={{
          height: error ? "auto" : 0,
          opacity: error ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.p
          className="text-destructive text-sm mt-1 flex items-center"
          initial={{ y: -10, opacity: 0 }}
          animate={{
            y: error ? 0 : -10,
            opacity: error ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            className="mr-1"
            animate={{
              rotate: error ? [0, 10, -10, 0] : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            ⚠️
          </motion.span>
          {error}
        </motion.p>
      </motion.div>

      {/* Character counter (optional) */}
      {type === "text" && value.length > 0 && (
        <motion.div
          className="text-xs text-muted-foreground mt-1 text-right"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
        >
          {value.length} characters
        </motion.div>
      )}
    </div>
  );
};

export default AnimatedFormInput;
