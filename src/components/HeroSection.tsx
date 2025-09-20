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
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20"
      height="100vh"
    >
      <MagneticFloatingContainer
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-16"
        magneticStrength={0.15}
        floatRange={8}
        floatDuration={6}
      >
        {/* Main Hero Text */}
        <FadeScaleIn delay={0.2} initialScale={0.8}>
          <TextRevealMask
            direction="center"
            className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
            delay={0.3}
          >
            <h1>
              Google Cloud Study Jam
              <br />
              <span className="text-foreground">Sessions are Back</span>
              <motion.span
                className="ml-4 text-4xl sm:text-5xl lg:text-6xl"
                initial={{ rotate: 0, scale: 1 }}
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
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
        </FadeScaleIn>

        <FadeScaleIn delay={0.6} duration={0.8}>
          <div className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            <TypingTextAnimation
              text="Join the ultimate cloud learning experience. "
              speed={30}
              delay={1000}
              className="inline"
            />
            <span className="inline">
              Master{" "}
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
              , earn certificates, win amazing swags, and connect with{" "}
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
              .
            </span>
          </div>
        </FadeScaleIn>

        <StaggeredReveal
          delay={0.8}
          staggerDelay={0.15}
          direction="up"
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MicroPulseFeedback
            pulseType="glow"
            pulseIntensity="medium"
            pulseColor="hsl(var(--primary))"
          >
            <MagneticButton
              strength={0.2}
              className="btn-gcp-primary text-lg px-8 py-4 animate-pulse-glow"
            >
              Get Started Today
            </MagneticButton>
          </MicroPulseFeedback>

          <MicroPulseFeedback pulseType="scale" pulseIntensity="light">
            <MagneticButton
              className="btn-gcp-secondary text-lg px-8 py-4"
              strength={0.25}
            >
              Learn More
            </MagneticButton>
          </MicroPulseFeedback>
        </StaggeredReveal>

        {/* Stats */}
        <StaggeredReveal
          delay={1.2}
          staggerDelay={0.2}
          direction="up"
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-gcp-blue mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 1.5,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              500+
            </motion.div>
            <div className="text-muted-foreground">Participants</div>
          </div>

          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-gcp-green mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 1.7,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              25+
            </motion.div>
            <div className="text-muted-foreground">Skill Badges</div>
          </div>

          <div className="text-center">
            <motion.div
              className="text-3xl font-bold text-gcp-yellow mb-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 1.9,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              100%
            </motion.div>
            <div className="text-muted-foreground">Free Learning</div>
          </div>
        </StaggeredReveal>
      </MagneticFloatingContainer>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </ParallaxBackground>
  );
};

export default HeroSection;
