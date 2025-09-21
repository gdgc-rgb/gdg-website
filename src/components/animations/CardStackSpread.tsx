import { motion } from "framer-motion";
import { useState, ReactNode } from "react";

interface CardStackSpreadProps {
  cards: ReactNode[];
  className?: string;
  stackOffset?: number;
  spreadDistance?: number;
  rotationRange?: number;
}

const CardStackSpread = ({
  cards,
  className = "",
  stackOffset = 8,
  spreadDistance = 120,
  rotationRange = 15,
}: CardStackSpreadProps) => {
  const [isSpread, setIsSpread] = useState(false);

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onMouseEnter={() => setIsSpread(true)}
      onMouseLeave={() => setIsSpread(false)}
      style={{
        height: "300px",
        width: "240px",
      }}
    >
      {cards.map((card, index) => {
        const isLast = index === cards.length - 1;
        const totalCards = cards.length;
        const middleIndex = (totalCards - 1) / 2;

        // Calculate spread position
        const spreadX = isSpread
          ? (index - middleIndex) * (spreadDistance / totalCards)
          : 0;

        const spreadY = isSpread
          ? Math.abs(index - middleIndex) * -20
          : index * -stackOffset;

        const rotation = isSpread
          ? (index - middleIndex) * (rotationRange / totalCards)
          : 0;

        return (
          <motion.div
            key={index}
            className="absolute inset-0 bg-white border border-gray-200 rounded-xl shadow-lg"
            style={{
              zIndex: totalCards - index,
            }}
            animate={{
              x: spreadX,
              y: spreadY,
              rotate: rotation,
              scale: isSpread ? (isLast ? 1.05 : 0.95) : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: isSpread ? index * 0.1 : (totalCards - index - 1) * 0.05,
            }}
            whileHover={
              isSpread
                ? {
                    scale: 1.1,
                    zIndex: 100,
                    y: spreadY - 20,
                  }
                : {}
            }
          >
            <div className="p-4 h-full flex flex-col">
              {card}

              {/* Card number indicator */}
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>

              {/* Gradient overlay for depth */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(255,255,255,${0.1 + index * 0.02}) 0%, 
                    transparent 100%)`,
                }}
              />
            </div>
          </motion.div>
        );
      })}

      {/* Hover instruction */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground text-center"
        animate={{
          opacity: isSpread ? 0 : 1,
        }}
      >
        Hover to spread
      </motion.div>
    </div>
  );
};

export default CardStackSpread;
