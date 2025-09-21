import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./animations/MagneticButton";
import RippleButton from "./animations/RippleButton";
import ShimmerText from "./animations/ShimmerText";
import StaggeredReveal from "./animations/StaggeredReveal";
import FadeScaleIn from "./animations/FadeScaleIn";
import ParallaxBackground from "./animations/ParallaxBackground";
import TextRevealMask from "./animations/TextRevealMask";
import MagneticFloatingContainer from "./animations/MagneticFloatingContainer";
import TypingTextAnimation from "./animations/TypingTextAnimation";
import TextSplitReveal from "./animations/TextSplitReveal";
import GradientFlowingText from "./animations/GradientFlowingText";
import LoopingWordSwapper from "./animations/LoopingWordSwapper";
import MicroPulseFeedback from "./animations/MicroPulseFeedback";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { scrollYProgress } = useScroll();

  const parallaxLayers = [
    {
      element: (
        <div className="w-80 h-80 bg-gcp-blue/10 rounded-full blur-3xl absolute -top-40 -right-40" />
      ),
      speed: -0.5,
      opacity: 0.8,
    },
    {
      element: (
        <div className="w-80 h-80 bg-gcp-green/10 rounded-full blur-3xl absolute -bottom-40 -left-40" />
      ),
      speed: -0.3,
      opacity: 0.6,
    },
    {
      element: (
        <div className="w-96 h-96 bg-gcp-yellow/5 rounded-full blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      ),
      speed: -0.7,
      opacity: 0.4,
    },
    {
      element: (
        <div className="w-60 h-60 bg-gcp-red/5 rounded-full blur-2xl absolute top-20 left-20" />
      ),
      speed: -0.2,
      opacity: 0.3,
    },
  ];

  return (
    <ParallaxBackground
      layers={parallaxLayers}
      className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden"
      height="100vh"
    >
      {/* Full viewport background layer */}
      <div 
        className="fixed inset-0 w-screen h-screen"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(66, 133, 244, 0.03) 0%, rgba(52, 168, 83, 0.02) 50%, rgba(251, 188, 5, 0.02) 100%),
            radial-gradient(circle at 20% 50%, rgba(234, 67, 53, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(66, 133, 244, 0.03) 0%, transparent 50%),
            linear-gradient(rgba(66, 133, 244, 0.01) 1px, transparent 1px),
            linear-gradient(90deg, rgba(66, 133, 244, 0.01) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 80px 80px, 80px 80px",
          zIndex: -10
        }}
      />

      {/* Animated Google Brand Gradient Background */}
      <div className="fixed inset-0 w-screen h-screen z-0">
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 w-full h-full opacity-20">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(66, 133, 244, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(66, 133, 244, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(52, 168, 83, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(52, 168, 83, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px, 60px 60px, 120px 120px, 120px 120px",
            }}
            animate={{
              backgroundPosition: [
                "0px 0px, 0px 0px, 0px 0px, 0px 0px",
                "60px 60px, 60px 60px, 120px 120px, 120px 120px",
                "0px 0px, 0px 0px, 0px 0px, 0px 0px"
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Animated diagonal grid */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(251, 188, 5, 0.08) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(234, 67, 53, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px, 40px 40px",
            }}
            animate={{
              backgroundPosition: [
                "0px 0px, 0px 0px",
                "40px 40px, 40px 40px",
                "0px 0px, 0px 0px"
              ],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <motion.div
          className="absolute inset-0 w-full h-full opacity-90"
          style={{
            background: `linear-gradient(
              135deg,
              rgba(66, 133, 244, 0.1) 0%,
              rgba(52, 168, 83, 0.1) 25%,
              rgba(251, 188, 5, 0.05) 50%,
              rgba(234, 67, 53, 0.1) 75%,
              rgba(66, 133, 244, 0.1) 100%
            )`
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 w-full h-full opacity-30"
          style={{
            background: `linear-gradient(
              45deg,
              transparent 30%,
              rgba(66, 133, 244, 0.2) 40%,
              rgba(251, 188, 5, 0.2) 50%,
              rgba(52, 168, 83, 0.2) 60%,
              transparent 70%
            )`
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* 3D Floating Shapes */}
      <div 
        className="fixed inset-0 w-screen h-screen z-1 pointer-events-none" 
        style={{ perspective: "1000px" }}
      >
        {/* 3D Cube */}
        <motion.div
          className="absolute"
          style={{
            transformStyle: "preserve-3d",
            top: "20%",
            left: "5%",
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div
            className="w-8 h-8 relative"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Cube faces */}
            <div className="absolute w-8 h-8 bg-gcp-blue/20 border border-gcp-blue/40" style={{ transform: "translateZ(4px)" }} />
            <div className="absolute w-8 h-8 bg-gcp-blue/15 border border-gcp-blue/30" style={{ transform: "translateZ(-4px)" }} />
            <div className="absolute w-8 h-8 bg-gcp-blue/25 border border-gcp-blue/50" style={{ transform: "rotateY(90deg) translateZ(4px)" }} />
            <div className="absolute w-8 h-8 bg-gcp-blue/15 border border-gcp-blue/30" style={{ transform: "rotateY(-90deg) translateZ(4px)" }} />
            <div className="absolute w-8 h-8 bg-gcp-blue/30 border border-gcp-blue/60" style={{ transform: "rotateX(90deg) translateZ(4px)" }} />
            <div className="absolute w-8 h-8 bg-gcp-blue/10 border border-gcp-blue/20" style={{ transform: "rotateX(-90deg) translateZ(4px)" }} />
          </div>
        </motion.div>

        {/* 3D Pyramid */}
        <motion.div
          className="absolute"
          style={{
            transformStyle: "preserve-3d",
            top: "60%",
            right: "5%",
          }}
          animate={{
            rotateX: [0, 180, 360],
            rotateY: [0, 180, 360],
            rotateZ: [0, 90, 180, 270, 360],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              width: "20px",
              height: "20px",
            }}
          >
            {/* Pyramid faces */}
            <div 
              className="absolute w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-gcp-red/30"
              style={{ transform: "translateZ(5px)" }}
            />
            <div 
              className="absolute w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-gcp-red/20"
              style={{ transform: "rotateY(90deg) translateZ(5px)" }}
            />
            <div 
              className="absolute w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-gcp-red/25"
              style={{ transform: "rotateY(180deg) translateZ(5px)" }}
            />
            <div 
              className="absolute w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-gcp-red/15"
              style={{ transform: "rotateY(270deg) translateZ(5px)" }}
            />
          </div>
        </motion.div>

        {/* 3D Sphere (using pseudo-3D effect) */}
        <motion.div
          className="absolute w-12 h-12 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(52, 168, 83, 0.4), rgba(52, 168, 83, 0.1))`,
            boxShadow: "inset -3px -3px 6px rgba(52, 168, 83, 0.3), 3px 3px 6px rgba(0, 0, 0, 0.1)",
            top: "35%",
            right: "8%",
          }}
          animate={{
            x: [0, -60, 0],
            y: [0, 50, 0],
            rotateY: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* 3D Octahedron */}
        <motion.div
          className="absolute"
          style={{
            transformStyle: "preserve-3d",
            top: "15%",
            right: "15%",
          }}
          animate={{
            rotateX: [0, 120, 240, 360],
            rotateY: [0, 90, 180, 270, 360],
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              width: "16px",
              height: "16px",
            }}
          >
            {/* Octahedron faces */}
            <div 
              className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-gcp-yellow/30"
              style={{ transform: "rotateX(45deg) translateZ(6px)" }}
            />
            <div 
              className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-gcp-yellow/25"
              style={{ transform: "rotateX(-45deg) translateZ(6px)" }}
            />
            <div 
              className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-gcp-yellow/20"
              style={{ transform: "rotateY(90deg) rotateX(45deg) translateZ(6px)" }}
            />
            <div 
              className="absolute w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent border-t-gcp-yellow/15"
              style={{ transform: "rotateY(90deg) rotateX(-45deg) translateZ(6px)" }}
            />
          </div>
        </motion.div>

        {/* 3D Prism */}
        <motion.div
          className="absolute"
          style={{
            transformStyle: "preserve-3d",
            bottom: "30%",
            left: "8%",
          }}
          animate={{
            rotateX: [0, 60, 120, 180, 240, 300, 360],
            rotateZ: [0, 45, 90, 135, 180, 225, 270, 315, 360],
            x: [0, 40, -20, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              width: "14px",
              height: "20px",
            }}
          >
            {/* Prism faces */}
            <div className="absolute w-14 h-20 bg-gradient-to-r from-gcp-green/20 to-gcp-blue/15 border border-gcp-green/30" style={{ transform: "translateZ(7px)" }} />
            <div className="absolute w-14 h-20 bg-gradient-to-r from-gcp-blue/15 to-gcp-green/10 border border-gcp-blue/25" style={{ transform: "translateZ(-7px)" }} />
            <div className="absolute w-14 h-20 bg-gradient-to-b from-gcp-green/25 to-gcp-blue/20 border border-gcp-green/35" style={{ transform: "rotateY(90deg) translateZ(7px)" }} />
            <div className="absolute w-14 h-20 bg-gradient-to-b from-gcp-blue/20 to-gcp-green/15 border border-gcp-blue/30" style={{ transform: "rotateY(-90deg) translateZ(7px)" }} />
          </div>
        </motion.div>

        {/* Additional Edge Shapes */}
        
        {/* Top Left Corner Shape */}
        <motion.div
          className="absolute top-[10%] left-[2%]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateY: [0, 360],
            rotateZ: [0, 180, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-6 bg-gcp-red/25 border border-gcp-red/50 transform rotate-45" />
        </motion.div>

        {/* Top Right Corner Shape */}
        <motion.div
          className="absolute top-[8%] right-[3%]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateX: [0, 180, 360],
            rotateY: [0, 90, 180, 270, 360],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-5 h-5 rounded-full bg-gcp-yellow/30 border-2 border-gcp-yellow/60" />
        </motion.div>

        {/* Bottom Left Corner Shape */}
        <motion.div
          className="absolute bottom-[15%] left-[1%]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateX: [0, 120, 240, 360],
            rotateZ: [0, 60, 120, 180, 240, 300, 360],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-gcp-blue/40"
          />
        </motion.div>

        {/* Bottom Right Corner Shape */}
        <motion.div
          className="absolute bottom-[20%] right-[2%]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateY: [0, 360],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-4 h-8 bg-gradient-to-b from-gcp-green/30 to-gcp-blue/20 border border-gcp-green/50" />
        </motion.div>

        {/* Middle Left Edge */}
        <motion.div
          className="absolute top-[45%] left-[0.5%]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 180, 360],
            y: [0, 30, -30, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-7 h-7 bg-gcp-red/20 border-2 border-gcp-red/40 rounded-lg transform rotate-12" />
        </motion.div>

        {/* Middle Right Edge */}
        <motion.div
          className="absolute top-[50%] right-[0.5%]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateZ: [0, 360],
            rotateX: [0, 180, 360],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-6 rounded-full bg-gradient-radial from-gcp-yellow/40 to-gcp-yellow/10 border border-gcp-yellow/60" />
        </motion.div>

        {/* Smaller scattered 3D elements */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              transformStyle: "preserve-3d",
              left: `${Math.random() * 95}%`,
              top: `${Math.random() * 90 + 5}%`,
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              rotateZ: [0, 180, 360],
              x: [0, Math.random() * 60 - 30],
              y: [0, Math.random() * 80 - 40],
              scale: [0.3, 1.2, 0.3],
            }}
            transition={{
              duration: 12 + Math.random() * 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 8,
            }}
          >
            <div
              className={`w-2 h-2 ${
                i % 4 === 0 ? 'bg-gcp-blue/25 border border-gcp-blue/50' :
                i % 4 === 1 ? 'bg-gcp-red/25 border border-gcp-red/50' :
                i % 4 === 2 ? 'bg-gcp-yellow/25 border border-gcp-yellow/50' :
                'bg-gcp-green/25 border border-gcp-green/50'
              } ${i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rotate-45' : ''}`}
              style={{
                transformStyle: "preserve-3d",
                transform: i % 4 === 0 ? "translateZ(15px)" : 
                          i % 4 === 1 ? "rotateY(45deg) translateZ(12px)" : 
                          i % 4 === 2 ? "rotateX(45deg) translateZ(10px)" :
                          "rotateX(30deg) rotateY(60deg) translateZ(8px)"
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 w-screen h-screen z-1 pointer-events-none">
        {/* Animated particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: [
                "rgba(66, 133, 244, 0.6)",
                "rgba(234, 67, 53, 0.6)",
                "rgba(251, 188, 5, 0.6)",
                "rgba(52, 168, 83, 0.6)"
              ][i % 4],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 w-screen h-screen z-1">
        {/* Google Blue Circle */}
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          style={{ backgroundColor: "rgba(66, 133, 244, 0.15)" }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          initial={{ top: "20%", left: "10%" }}
        />
        
        {/* Google Red Square */}
        <motion.div
          className="absolute w-24 h-24 rotate-45"
          style={{ backgroundColor: "rgba(234, 67, 53, 0.15)" }}
          animate={{
            x: [-50, 50, -50],
            y: [0, 80, 0],
            rotate: [45, 225, 405],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          initial={{ top: "60%", right: "15%" }}
        />

        {/* Google Yellow Triangle */}
        <motion.div
          className="absolute w-0 h-0"
          style={{
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderBottom: "35px solid rgba(251, 188, 5, 0.15)"
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          initial={{ top: "30%", right: "25%" }}
        />

        {/* Google Green Hexagon */}
        <motion.div
          className="absolute w-20 h-20"
          style={{
            backgroundColor: "rgba(52, 168, 83, 0.15)",
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
          }}
          animate={{
            x: [0, 120, 0],
            y: [0, -100, 0],
            rotate: [0, 60, 120, 180, 240, 300, 360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          initial={{ bottom: "25%", left: "20%" }}
        />
      </div>

      <MagneticFloatingContainer
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-32 md:pt-40"
        magneticStrength={0.15}
        floatRange={8}
        floatDuration={6}
      >
        {/* Text backdrop for better readability */}
        <div className="absolute inset-0 bg-background/5 backdrop-blur-sm rounded-3xl -z-10" />
        
        {/* Main Hero Text */}
        <FadeScaleIn delay={0.2} initialScale={0.8}>
          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <TextRevealMask
              direction="center"
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
              delay={0.3}
            >
              <h1 className="relative">
                <motion.span
                  className="inline-block bg-gradient-to-r from-gcp-blue via-gcp-green to-gcp-blue bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                >
                GDG Presents
                </motion.span>
                <br />
                <motion.span 
                  className="text-foreground relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  Google Cloud Study Jams
                  {/* Sparkle effects */}
                  <motion.span
                    className="absolute -top-2 -right-2 text-gcp-yellow"
                    animate={{
                      scale: [1, 1.5, 1],
                      rotate: [0, 180, 360],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 2
                    }}
                  >
                    ✨
                  </motion.span>
                  <motion.span
                    className="absolute -bottom-2 -left-2 text-gcp-red"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [360, 180, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 2.5
                    }}
                  >
                    💫
                  </motion.span>
                </motion.span>
                <motion.span
                  className="ml-4 text-4xl sm:text-5xl lg:text-6xl"
                  initial={{ rotate: 0, scale: 1 }}
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  whileHover={{
                    scale: 1.3,
                    rotate: 360,
                    transition: { duration: 0.5 }
                  }}
                  transition={{
                    duration: 2,
                    delay: 1,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  🚀
                </motion.span>
              </h1>
            </TextRevealMask>
          </motion.div>
        </FadeScaleIn>

        <FadeScaleIn delay={0.6} duration={0.8}>
          <motion.div 
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <TypingTextAnimation
                text="Join the ultimate cloud learning experience. "
                speed={30}
                delay={1000}
                className="inline"
              />
              <span className="inline">
                Master{" "}
                <motion.span
                  whileHover={{ 
                    scale: 1.1,
                    textShadow: "0 0 20px rgba(66, 133, 244, 0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <GradientFlowingText
                    text="Google Cloud Platform"
                    gradientColors={[
                      "hsl(var(--gcp-blue))",
                      "hsl(var(--gcp-green))",
                      "hsl(var(--gcp-yellow))",
                      "hsl(var(--gcp-red))",
                    ]}
                    size="xl"
                    flowSpeed={4}
                    className="font-bold"
                  />
                </motion.span>
                , earn certificates, win amazing swags, and connect with{" "}
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <LoopingWordSwapper
                    words={[
                      "developers",
                      "professionals",
                      "learners",
                      "innovators",
                    ]}
                    className="font-semibold text-primary"
                    animationType="slide"
                    interval={2500}
                  />
                </motion.span>
                .
              </span>
            </motion.div>
          </motion.div>
        </FadeScaleIn>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <MicroPulseFeedback
              pulseType="glow"
              pulseIntensity="medium"
              pulseColor="hsl(var(--primary))"
            >
              <MagneticButton
                strength={0.2}
                className="relative btn-gcp-primary text-lg px-8 py-4 overflow-hidden group"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gcp-blue via-gcp-green to-gcp-blue opacity-0 group-hover:opacity-100"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="relative z-10">Register Now</span>
                <motion.span
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  ⚡
                </motion.span>
              </MagneticButton>
            </MicroPulseFeedback>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <StaggeredReveal
          delay={1.2}
          staggerDelay={0.2}
          direction="up"
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          <motion.div 
            className="text-center group cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="relative text-3xl font-bold text-gcp-blue mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ 
                textShadow: "0 0 20px rgba(66, 133, 244, 0.5)",
                scale: 1.1
              }}
              transition={{
                delay: 1.5,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              500+
              <motion.span
                className="absolute -top-2 -right-2 text-sm"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                👥
              </motion.span>
            </motion.div>
            <motion.div 
              className="text-muted-foreground group-hover:text-gcp-blue transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Participants
            </motion.div>
          </motion.div>

          <motion.div 
            className="text-center group cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="relative text-3xl font-bold text-gcp-green mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ 
                textShadow: "0 0 20px rgba(52, 168, 83, 0.5)",
                scale: 1.1
              }}
              transition={{
                delay: 1.7,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              25+
              <motion.span
                className="absolute -top-2 -right-2 text-sm"
                animate={{
                  y: [0, -5, 0],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🏆
              </motion.span>
            </motion.div>
            <motion.div 
              className="text-muted-foreground group-hover:text-gcp-green transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Skill Badges
            </motion.div>
          </motion.div>

          <motion.div 
            className="text-center group cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="relative text-3xl font-bold text-gcp-yellow mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ 
                textShadow: "0 0 20px rgba(251, 188, 5, 0.5)",
                scale: 1.1
              }}
              transition={{
                delay: 1.9,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              100%
              <motion.span
                className="absolute -top-2 -right-2 text-sm"
                animate={{
                  rotate: [0, -15, 15, 0],
                  scale: [1, 1.4, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🎉
              </motion.span>
            </motion.div>
            <motion.div 
              className="text-muted-foreground group-hover:text-gcp-yellow transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Free Learning
            </motion.div>
          </motion.div>
        </StaggeredReveal>
      </MagneticFloatingContainer>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-gcp-blue rounded-full flex justify-center relative overflow-hidden group-hover:border-gcp-green transition-colors duration-300"
          whileHover={{
            boxShadow: "0 0 20px rgba(66, 133, 244, 0.5)"
          }}
        >
          <motion.div 
            className="w-1 h-3 bg-gcp-blue rounded-full mt-2 group-hover:bg-gcp-green transition-colors duration-300"
            animate={{
              y: [0, 16, 0],
              opacity: [1, 0, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Animated trail */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-gcp-yellow/20 to-transparent"
            animate={{
              y: ["-100%", "100%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </motion.div>
        
        <motion.p
          className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 10, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
        >
          Scroll Down
        </motion.p>
      </motion.div>
    </ParallaxBackground>
  );
};

export default HeroSection;
