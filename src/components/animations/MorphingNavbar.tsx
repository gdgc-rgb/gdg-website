import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface MorphingNavbarProps {
  children: React.ReactNode;
  className?: string;
  morphOnScroll?: boolean;
  scrollThreshold?: number;
}

const MorphingNavbar = ({
  children,
  className = "",
  morphOnScroll = true,
  scrollThreshold = 50,
}: MorphingNavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    if (!morphOnScroll) return;

    const updateScrolled = (latest: number) => {
      setIsScrolled(latest > scrollThreshold);
    };

    const unsubscribe = scrollY.on("change", updateScrolled);
    return () => unsubscribe();
  }, [scrollY, morphOnScroll, scrollThreshold]);

  // Scroll-based transformations
  const backgroundColor = useTransform(
    scrollY,
    [0, scrollThreshold],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, scrollThreshold],
    ["blur(0px)", "blur(12px)"]
  );

  const borderRadius = useTransform(
    scrollY,
    [0, scrollThreshold],
    ["0px", "16px"]
  );

  const scale = useTransform(scrollY, [0, scrollThreshold], [1, 0.95]);

  const y = useTransform(scrollY, [0, scrollThreshold], [0, 8]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${className}`}
      style={{
        backgroundColor: morphOnScroll ? backgroundColor : undefined,
        backdropFilter: morphOnScroll ? backdropBlur : undefined,
        WebkitBackdropFilter: morphOnScroll ? backdropBlur : undefined,
        borderRadius: morphOnScroll ? borderRadius : undefined,
        scale: morphOnScroll ? scale : undefined,
        y: morphOnScroll ? y : undefined,
      }}
      animate={{
        boxShadow: isScrolled
          ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          : "0 0 0 0 rgba(0, 0, 0, 0)",
        border: isScrolled
          ? "1px solid rgba(255, 255, 255, 0.2)"
          : "1px solid transparent",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, 
            hsl(var(--primary) / 0.05) 0%, 
            hsl(var(--secondary) / 0.05) 100%)`,
          borderRadius: morphOnScroll ? borderRadius : undefined,
        }}
        animate={{
          opacity: isScrolled ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Morphing border gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, 
            hsl(var(--primary) / 0.2), 
            hsl(var(--secondary) / 0.2))`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "subtract",
          padding: "1px",
          borderRadius: morphOnScroll ? borderRadius : undefined,
        }}
        animate={{
          opacity: isScrolled ? 0.6 : 0,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <div className="relative z-10 px-4 md:px-6 lg:px-8">{children}</div>
    </motion.nav>
  );
};

export default MorphingNavbar;
