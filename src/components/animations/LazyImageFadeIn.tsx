import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface LazyImageFadeInProps {
  src: string;
  alt?: string;
  className?: string;
  placeholderSrc?: string;
  blurDataURL?: string;
  fadeInDuration?: number;
  threshold?: number;
}

const LazyImageFadeIn = ({
  src,
  alt = "",
  className = "",
  placeholderSrc,
  blurDataURL,
  fadeInDuration = 0.8,
  threshold = 0.1,
}: LazyImageFadeInProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  // Start loading when in view
  React.useEffect(() => {
    if (inView && !isLoading && !isLoaded) {
      setIsLoading(true);
      const img = new Image();
      img.onload = () => {
        setIsLoaded(true);
        setIsLoading(false);
      };
      img.onerror = () => {
        setIsLoading(false);
      };
      img.src = src;
    }
  }, [inView, src, isLoading, isLoaded]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {(blurDataURL || placeholderSrc) && !isLoaded && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: fadeInDuration }}
        >
          {blurDataURL ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${blurDataURL})`,
                filter: "blur(10px)",
                transform: "scale(1.1)",
              }}
            />
          ) : (
            <img
              src={placeholderSrc}
              alt=""
              className="w-full h-full object-cover filter blur-md scale-110"
            />
          )}
        </motion.div>
      )}

      {/* Loading shimmer effect */}
      {isLoading && !isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `linear-gradient(
              90deg, 
              transparent, 
              rgba(255, 255, 255, 0.2), 
              transparent
            )`,
          }}
        />
      )}

      {/* Main image with fade-in */}
      <motion.img
        ref={imgRef}
        src={inView ? src : ""}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{
          opacity: 0,
          filter: "blur(8px)",
          scale: 1.05,
        }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          filter: isLoaded ? "blur(0px)" : "blur(8px)",
          scale: isLoaded ? 1 : 1.05,
        }}
        transition={{
          duration: fadeInDuration,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
      />

      {/* Loading indicator */}
      {isLoading && !isLoaded && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-muted/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      )}

      {/* Success indicator */}
      {isLoaded && (
        <motion.div
          className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
            delay: fadeInDuration,
          }}
        >
          <motion.svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: fadeInDuration + 0.2 }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>
      )}
    </div>
  );
};

export default LazyImageFadeIn;
