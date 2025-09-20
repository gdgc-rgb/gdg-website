import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";

interface CarouselImage {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface Image3DCarouselProps {
  images: CarouselImage[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
}

const Image3DCarousel = ({
  images,
  className = "",
  autoPlay = true,
  autoPlayInterval = 4000,
  showControls = true,
}: Image3DCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
      rotateY: 90,
      scale: 0.8,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
      rotateY: -90,
      scale: 0.8,
    },
    visible: {
      x: "0",
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <div
      className={`relative perspective-1000 ${className}`}
      style={{ perspective: "1000px" }}
    >
      {/* Main carousel container */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl bg-muted">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit={direction > 0 ? "hiddenLeft" : "hiddenRight"}
            className="absolute inset-0"
          >
            {/* 3D Image Container */}
            <motion.div
              className="relative w-full h-full"
              whileHover={{
                rotateY: 5,
                rotateX: 5,
                scale: 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              <img
                src={images[currentIndex].src}
                alt={images[currentIndex].alt || ""}
                className="w-full h-full object-cover rounded-xl shadow-2xl"
              />

              {/* 3D depth shadow */}
              <motion.div
                className="absolute inset-0 bg-black/20 rounded-xl -z-10"
                style={{
                  transform:
                    "translateX(4px) translateY(4px) translateZ(-10px)",
                  filter: "blur(8px)",
                }}
              />

              {/* Overlay with content */}
              {(images[currentIndex].title ||
                images[currentIndex].description) && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {images[currentIndex].title && (
                    <h3 className="text-white text-xl font-bold mb-2">
                      {images[currentIndex].title}
                    </h3>
                  )}
                  {images[currentIndex].description && (
                    <p className="text-white/90 text-sm">
                      {images[currentIndex].description}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Reflection effect */}
        <motion.div
          className="absolute -bottom-32 left-0 right-0 h-32 rounded-xl opacity-30"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(255, 255, 255, 0.1), 
              transparent)`,
            transform: "rotateX(180deg) scaleY(0.5)",
            transformOrigin: "top",
            filter: "blur(1px)",
          }}
        >
          <img
            src={images[currentIndex].src}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <>
          {/* Previous/Next Buttons */}
          <motion.button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
            onClick={handlePrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          <motion.button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {images.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                onClick={() => handleDotClick(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  scale: index === currentIndex ? 1.2 : 1,
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Side thumbnails for 3D effect */}
      <div className="absolute -left-16 top-1/2 -translate-y-1/2 space-y-4 hidden lg:block">
        {images.map((image, index) => {
          const offset = index - currentIndex;
          if (Math.abs(offset) > 2) return null;

          return (
            <motion.div
              key={index}
              className="w-12 h-12 rounded-lg overflow-hidden cursor-pointer opacity-60 hover:opacity-100"
              style={{
                transform: `rotateY(45deg) translateZ(${offset * 20}px)`,
                zIndex: -Math.abs(offset),
              }}
              onClick={() => handleDotClick(index)}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={image.src}
                alt={image.alt || ""}
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Image3DCarousel;
