import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  tiltIntensity?: number;
  className?: string;
}

const TiltCard = ({
  children,
  tiltIntensity = 15,
  className = "",
}: TiltCardProps) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * tiltIntensity;
    const rotateX =
      -((e.clientY - centerY) / (rect.height / 2)) * tiltIntensity;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
