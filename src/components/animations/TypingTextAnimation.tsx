import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TypingTextAnimationProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorColor?: string;
  onComplete?: () => void;
  loop?: boolean;
  pauseDuration?: number;
}

const TypingTextAnimation = ({
  text,
  className = "",
  speed = 50,
  delay = 0,
  cursor = true,
  cursorColor = "hsl(var(--primary))",
  onComplete,
  loop = false,
  pauseDuration = 2000,
}: TypingTextAnimationProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => {
        setIsTyping(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    } else {
      setIsTyping(true);
    }
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Typing completed
      onComplete?.();

      if (loop) {
        setTimeout(() => {
          setDisplayText("");
          setCurrentIndex(0);
        }, pauseDuration);
      }
    }
  }, [currentIndex, text, speed, isTyping, onComplete, loop, pauseDuration]);

  // Cursor blinking effect
  useEffect(() => {
    if (!cursor) return;

    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, [cursor]);

  return (
    <span className={`inline-block ${className}`}>
      {displayText}
      {cursor && (
        <motion.span
          className="inline-block w-0.5 ml-1"
          style={{
            backgroundColor: cursorColor,
            height: "1em",
          }}
          animate={{
            opacity: showCursor ? 1 : 0,
          }}
          transition={{
            duration: 0,
          }}
        />
      )}
    </span>
  );
};

export default TypingTextAnimation;
