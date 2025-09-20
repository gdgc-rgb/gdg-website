import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ElasticMobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

const ElasticMobileNav = ({
  isOpen,
  onToggle,
  children,
  className = "",
}: ElasticMobileNavProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const menuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      scale: 0.95,
      borderRadius: "50px",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      scale: 1,
      borderRadius: "16px",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        bounce: 0.3,
      },
    },
  };

  const hamburgerVariants = {
    closed: {
      rotate: 0,
      scale: 1,
    },
    open: {
      rotate: 45,
      scale: 1.1,
    },
  };

  return (
    <div className={`relative ${className}`}>
      {/* Hamburger Button */}
      <motion.button
        className="relative z-50 flex flex-col justify-center items-center w-10 h-10 rounded-lg
                   bg-card border border-border shadow-md hover:shadow-lg transition-shadow"
        onClick={() => {
          setIsAnimating(true);
          onToggle();
          setTimeout(() => setIsAnimating(false), 500);
        }}
        variants={hamburgerVariants}
        animate={isOpen ? "open" : "closed"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {/* Hamburger lines */}
        <motion.span
          className="block w-6 h-0.5 bg-foreground rounded-full"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 2 : -2,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block w-6 h-0.5 bg-foreground rounded-full mt-1"
          animate={{
            opacity: isOpen ? 0 : 1,
            scale: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block w-6 h-0.5 bg-foreground rounded-full mt-1"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -2 : 2,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onToggle}
            />

            {/* Menu Container */}
            <motion.div
              className="absolute top-full right-0 mt-2 w-80 bg-card border border-border 
                         shadow-xl overflow-hidden z-50"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Elastic bounce effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 -z-10"
                animate={{
                  scale: isAnimating ? [1, 1.02, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              />

              {/* Menu Items */}
              <motion.div className="p-6 space-y-4">
                {Array.isArray(children) ? (
                  children.map((child, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{
                        x: 4,
                        scale: 1.02,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      {child}
                    </motion.div>
                  ))
                ) : (
                  <motion.div variants={itemVariants}>{children}</motion.div>
                )}
              </motion.div>

              {/* Decorative elements */}
              <motion.div
                className="absolute top-2 right-2 w-2 h-2 bg-primary/30 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-2 left-2 w-1 h-1 bg-secondary/40 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElasticMobileNav;
