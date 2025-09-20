import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TextSplitRevealProps {
  text: string;
  className?: string;
  splitBy?: "words" | "letters" | "lines";
  delay?: number;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  threshold?: number;
}

const TextSplitReveal = ({
  text,
  className = "",
  splitBy = "words",
  delay = 0,
  staggerDelay = 0.1,
  direction = "up",
  threshold = 0.1,
}: TextSplitRevealProps) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  const splitText = () => {
    switch (splitBy) {
      case "letters":
        return text.split("").map((char, index) => ({
          char: char === " " ? "\u00A0" : char, // Non-breaking space
          index,
        }));
      case "words":
        return text.split(" ").map((word, index) => ({
          char: word,
          index,
        }));
      case "lines":
        return text.split("\n").map((line, index) => ({
          char: line,
          index,
        }));
      default:
        return [];
    }
  };

  const getInitialState = () => {
    switch (direction) {
      case "up":
        return { y: 50, opacity: 0 };
      case "down":
        return { y: -50, opacity: 0 };
      case "left":
        return { x: 50, opacity: 0 };
      case "right":
        return { x: -50, opacity: 0 };
      case "scale":
        return { scale: 0, opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  const getAnimateState = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1 };
      case "left":
      case "right":
        return { x: 0, opacity: 1 };
      case "scale":
        return { scale: 1, opacity: 1 };
      default:
        return { y: 0, opacity: 1 };
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: getInitialState(),
    visible: {
      ...getAnimateState(),
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
      },
    },
  };

  const textParts = splitText();

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {splitBy === "lines" ? (
        <div className="space-y-2">
          {textParts.map((part, index) => (
            <motion.div key={index} variants={itemVariants} className="block">
              {part.char}
            </motion.div>
          ))}
        </div>
      ) : (
        <div
          className={splitBy === "words" ? "flex flex-wrap gap-x-2" : "flex"}
        >
          {textParts.map((part, index) => (
            <motion.span
              key={index}
              variants={itemVariants}
              className={`inline-block ${
                splitBy === "words" ? "whitespace-nowrap" : ""
              }`}
              style={{
                transformOrigin: direction === "scale" ? "center" : "bottom",
              }}
            >
              {part.char}
            </motion.span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TextSplitReveal;
