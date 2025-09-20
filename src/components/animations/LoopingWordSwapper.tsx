import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoopingWordSwapperProps {
  words: string[];
  className?: string;
  interval?: number;
  animationType?: "slide" | "fade" | "scale" | "flip" | "typewriter";
  staticText?: {
    before?: string;
    after?: string;
  };
  loop?: boolean;
  pauseOnHover?: boolean;
}

const LoopingWordSwapper = ({
  words,
  className = "",
  interval = 3000,
  animationType = "slide",
  staticText = {},
  loop = true,
  pauseOnHover = false,
}: LoopingWordSwapperProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!loop || isPaused || words.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval, loop, isPaused]);

  const getVariants = () => {
    switch (animationType) {
      case "slide":
        return {
          enter: { y: 30, opacity: 0 },
          center: { y: 0, opacity: 1 },
          exit: { y: -30, opacity: 0 },
        };
      case "fade":
        return {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 },
        };
      case "scale":
        return {
          enter: { scale: 0.8, opacity: 0 },
          center: { scale: 1, opacity: 1 },
          exit: { scale: 1.2, opacity: 0 },
        };
      case "flip":
        return {
          enter: { rotateX: 90, opacity: 0 },
          center: { rotateX: 0, opacity: 1 },
          exit: { rotateX: -90, opacity: 0 },
        };
      case "typewriter":
        return {
          enter: { width: 0, opacity: 0 },
          center: { width: "auto", opacity: 1 },
          exit: { width: 0, opacity: 0 },
        };
      default:
        return {
          enter: { y: 30, opacity: 0 },
          center: { y: 0, opacity: 1 },
          exit: { y: -30, opacity: 0 },
        };
    }
  };

  const variants = getVariants();

  const getTransition = () => {
    switch (animationType) {
      case "typewriter":
        return {
          type: "tween",
          duration: 0.5,
          ease: "easeInOut",
        };
      case "flip":
        return {
          type: "spring",
          stiffness: 300,
          damping: 25,
        };
      default:
        return {
          type: "spring",
          stiffness: 200,
          damping: 20,
        };
    }
  };

  return (
    <span
      className={`inline-flex items-center ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
      style={{
        perspective: animationType === "flip" ? "1000px" : undefined,
      }}
    >
      {staticText.before && <span className="mr-2">{staticText.before}</span>}

      <span className="relative inline-block min-w-0">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold text-primary ${
              animationType === "typewriter" ? "overflow-hidden" : ""
            }`}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={getTransition()}
            style={{
              transformOrigin: "center",
              transformStyle:
                animationType === "flip" ? "preserve-3d" : undefined,
            }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>

        {/* Background highlight effect */}
        <motion.span
          className="absolute inset-0 bg-primary/10 rounded-md -z-10"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Underline effect */}
        <motion.span
          className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
          animate={{
            width: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: interval / 1000,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </span>

      {staticText.after && <span className="ml-2">{staticText.after}</span>}

      {/* Progress dots indicator */}
      {words.length > 1 && (
        <div className="flex space-x-1 ml-4">
          {words.map((_, index) => (
            <motion.div
              key={index}
              className="w-1.5 h-1.5 rounded-full cursor-pointer"
              style={{
                backgroundColor:
                  index === currentIndex
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))",
              }}
              animate={{
                scale: index === currentIndex ? 1.2 : 1,
                opacity: index === currentIndex ? 1 : 0.5,
              }}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.3 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            />
          ))}
        </div>
      )}
    </span>
  );
};

export default LoopingWordSwapper;
