import { motion } from "framer-motion";
import { useState } from "react";

interface AnimatedNavLinkProps {
  children: React.ReactNode;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  underlineColor?: string;
}

const AnimatedNavLink = ({
  children,
  href,
  isActive = false,
  onClick,
  className = "",
  underlineColor = "hsl(var(--primary))",
}: AnimatedNavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 rounded-full"
        style={{ backgroundColor: underlineColor }}
        initial={{ width: 0, x: "50%" }}
        animate={{
          width: isHovered || isActive ? "100%" : 0,
          x: isHovered || isActive ? "0%" : "50%",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          duration: 0.3,
        }}
      />

      {/* Hover background */}
      <motion.div
        className="absolute inset-0 rounded-md -z-10"
        style={{
          background: `linear-gradient(135deg, 
            ${underlineColor}10, 
            ${underlineColor}05)`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      />

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
          style={{ backgroundColor: underlineColor }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 20,
          }}
        />
      )}
    </Component>
  );
};

export default AnimatedNavLink;
