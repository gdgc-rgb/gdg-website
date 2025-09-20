import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ScrollCard from "@/components/ScrollCard";
import TiltCard from "@/components/animations/TiltCard";
import GlowCard from "@/components/animations/GlowCard";
import PerspectiveFlip from "@/components/animations/PerspectiveFlip";
import DiagonalSlideIn from "@/components/animations/DiagonalSlideIn";
import ElasticDropIn from "@/components/animations/ElasticDropIn";
import StaggeredReveal from "@/components/animations/StaggeredReveal";
import ShimmerText from "@/components/animations/ShimmerText";
import GlassmorphismCard from "@/components/animations/GlassmorphismCard";
import MorphingShape from "@/components/animations/MorphingShape";
import CardStackSpread from "@/components/animations/CardStackSpread";
import RotatingCardGrid from "@/components/animations/RotatingCardGrid";
import ScrollSyncedAnimation from "@/components/animations/ScrollSyncedAnimation";
import SectionWipeTransition from "@/components/animations/SectionWipeTransition";
import InfiniteScrollLoop from "@/components/animations/InfiniteScrollLoop";
import KenBurnsEffect from "@/components/animations/KenBurnsEffect";
import LazyImageFadeIn from "@/components/animations/LazyImageFadeIn";
import HoverImageDistortion from "@/components/animations/HoverImageDistortion";
import Image3DCarousel from "@/components/animations/Image3DCarousel";
import SVGPathDrawing from "@/components/animations/SVGPathDrawing";
import TextSplitReveal from "@/components/animations/TextSplitReveal";
import TextWarpHover from "@/components/animations/TextWarpHover";
import AnimatedFormInput from "@/components/animations/AnimatedFormInput";
import ErrorShakeAnimation from "@/components/animations/ErrorShakeAnimation";
import CheckboxMorphing from "@/components/animations/CheckboxMorphing";
import ToggleSwitchBounce from "@/components/animations/ToggleSwitchBounce";
import MicroPulseFeedback from "@/components/animations/MicroPulseFeedback";
import { certificates, swags } from "@/data/mockData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <HeroSection />

        {/* What is GCSJ Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PerspectiveFlip delay={0.1} axis="y">
              <GlowCard className="p-8 mb-16 bg-card border border-border rounded-xl">
                <div className="text-center">
                  <ShimmerText
                    className="text-3xl sm:text-4xl font-bold mb-4 block"
                    delay={0.5}
                    duration={2}
                  >
                    What is Google Cloud Study Jam?
                  </ShimmerText>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Google Cloud Study Jam is a community-led learning program
                    that provides free access to Google Cloud training, hands-on
                    labs, and skill badges. Join thousands of learners worldwide
                    in mastering cloud technologies.
                  </p>
                </div>
              </GlowCard>
            </PerspectiveFlip>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <DiagonalSlideIn delay={0.3} corner="bottom-left" distance={80}>
                <TiltCard className="p-8 bg-card border border-border rounded-xl shadow-strong">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">
                      Why Join GCSJ?
                    </h3>
                    <StaggeredReveal
                      delay={0.7}
                      staggerDelay={0.1}
                      direction="left"
                      className="space-y-4"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gcp-blue rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">
                          Learn in-demand cloud skills with hands-on labs and
                          real-world projects
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gcp-green rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">
                          Earn industry-recognized Google Cloud certifications
                          and skill badges
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gcp-yellow rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">
                          Connect with a global community of cloud enthusiasts
                          and professionals
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gcp-red rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground">
                          Access exclusive swags, prizes, and career
                          opportunities
                        </p>
                      </div>
                    </StaggeredReveal>
                  </div>
                </TiltCard>
              </DiagonalSlideIn>

              <DiagonalSlideIn delay={0.5} corner="bottom-right" distance={80}>
                <GlowCard
                  className="p-8 bg-card border border-border rounded-xl shadow-glow"
                  glowColor="hsl(var(--gcp-blue))"
                  glowIntensity={0.4}
                >
                  <div>
                    <h4 className="text-xl font-semibold mb-4">
                      Program Highlights
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="font-medium">4-6 weeks</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Cost</span>
                        <span className="font-medium text-gcp-green">
                          100% Free
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Format</span>
                        <span className="font-medium">
                          Self-paced + Community
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Support</span>
                        <span className="font-medium">24/7 Community Help</span>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </DiagonalSlideIn>
            </div>
          </div>
        </section>

        {/* Google Cloud Platform Overview */}
        <SectionWipeTransition
          direction="left"
          triggerPoint={0.8}
          className="py-20 bg-muted/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GlassmorphismCard
              className="p-8 mb-16"
              blurIntensity={15}
              opacity={0.15}
              floatIntensity={12}
            >
              <div className="text-center">
                <ScrollSyncedAnimation
                  animationType="morph"
                  intensity={0.8}
                  className="inline-block"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Google Cloud Platform
                  </h2>
                </ScrollSyncedAnimation>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover the powerful services and solutions that make GCP the
                  choice of enterprises worldwide
                </p>
              </div>
            </GlassmorphismCard>

            <RotatingCardGrid
              columns={4}
              rotationIntensity={8}
              staggerDelay={0.15}
              className="gap-4 md:gap-6"
              cards={[
                <MorphingShape
                  className="p-6 text-center h-full"
                  shapes={{ initial: "16px", hover: "50%" }}
                  colors={{
                    initial: "hsl(var(--card))",
                    hover: "hsl(var(--accent-red) / 0.1)",
                  }}
                >
                  <div className="w-12 h-12 bg-accent-red-bg rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💻</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Compute</h3>
                  <p className="text-sm text-muted-foreground">
                    Virtual machines, containers, and serverless computing
                    solutions
                  </p>
                </MorphingShape>,

                <MorphingShape
                  className="p-6 text-center h-full"
                  shapes={{ initial: "16px", hover: "50%" }}
                  colors={{
                    initial: "hsl(var(--card))",
                    hover: "hsl(var(--accent-yellow) / 0.1)",
                  }}
                >
                  <div className="w-12 h-12 bg-accent-yellow-bg rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💾</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Storage</h3>
                  <p className="text-sm text-muted-foreground">
                    Secure, durable, and scalable storage solutions
                  </p>
                </MorphingShape>,

                <MorphingShape
                  className="p-6 text-center h-full"
                  shapes={{ initial: "16px", hover: "50%" }}
                  colors={{
                    initial: "hsl(var(--card))",
                    hover: "hsl(var(--accent-green) / 0.1)",
                  }}
                >
                  <div className="w-12 h-12 bg-accent-green-bg rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">AI & ML</h3>
                  <p className="text-sm text-muted-foreground">
                    Machine learning and artificial intelligence services
                  </p>
                </MorphingShape>,

                <MorphingShape
                  className="p-6 text-center h-full"
                  shapes={{ initial: "16px", hover: "50%" }}
                  colors={{
                    initial: "hsl(var(--card))",
                    hover: "hsl(var(--primary) / 0.1)",
                  }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Big data analytics and business intelligence tools
                  </p>
                </MorphingShape>,
              ]}
            />
          </div>
        </SectionWipeTransition>

        {/* Certificates and Swags */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GlassmorphismCard
              className="p-8 mb-16"
              blurIntensity={12}
              opacity={0.12}
              floatIntensity={10}
            >
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Earn Certificates & Win Swags
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Complete learning paths to earn industry-recognized
                  certificates and exclusive GCSJ merchandise
                </p>
              </div>
            </GlassmorphismCard>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
              {/* Certificate Cards Stack */}
              <div className="flex justify-center">
                <CardStackSpread
                  stackOffset={12}
                  spreadDistance={100}
                  rotationRange={20}
                  cards={certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 text-center h-full flex flex-col justify-center"
                    >
                      <div className="text-3xl mb-3">{cert.icon}</div>
                      <h4 className="font-semibold mb-2">{cert.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  ))}
                />
              </div>

              {/* Center Content */}
              <div className="text-center">
                <ScrollSyncedAnimation
                  animationType="scale"
                  intensity={0.3}
                  className="inline-block"
                >
                  <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🎯</span>
                  </div>
                </ScrollSyncedAnimation>
                <h3 className="text-2xl font-bold mb-4">Achievement Path</h3>
                <p className="text-muted-foreground">
                  Follow our structured learning path to unlock certificates and
                  win exclusive swags
                </p>
              </div>

              {/* Swag Cards Stack */}
              <div className="flex justify-center">
                <CardStackSpread
                  stackOffset={12}
                  spreadDistance={100}
                  rotationRange={20}
                  cards={swags.map((swag) => (
                    <div
                      key={swag.id}
                      className="p-4 text-center h-full flex flex-col justify-center"
                    >
                      <div className="text-3xl mb-3">{swag.icon}</div>
                      <h4 className="font-semibold mb-2">{swag.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {swag.description}
                      </p>
                    </div>
                  ))}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Partner Logos Infinite Scroll */}
        <section className="py-16 bg-muted/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-center text-lg font-semibold text-muted-foreground mb-8">
              Powered by Google Cloud Platform
            </h3>
            <InfiniteScrollLoop
              direction="left"
              speed={30}
              className="h-16"
              pauseOnHover={true}
            >
              {[
                <div
                  key="google"
                  className="flex items-center justify-center w-32 h-16 bg-card rounded-lg border border-border"
                >
                  <span className="text-lg font-bold text-gcp-blue">
                    Google
                  </span>
                </div>,
                <div
                  key="cloud"
                  className="flex items-center justify-center w-32 h-16 bg-card rounded-lg border border-border"
                >
                  <span className="text-lg font-bold text-gcp-green">
                    Cloud
                  </span>
                </div>,
                <div
                  key="gcp"
                  className="flex items-center justify-center w-32 h-16 bg-card rounded-lg border border-border"
                >
                  <span className="text-lg font-bold text-gcp-yellow">GCP</span>
                </div>,
                <div
                  key="study"
                  className="flex items-center justify-center w-32 h-16 bg-card rounded-lg border border-border"
                >
                  <span className="text-lg font-bold text-gcp-red">Study</span>
                </div>,
                <div
                  key="jam"
                  className="flex items-center justify-center w-32 h-16 bg-card rounded-lg border border-border"
                >
                  <span className="text-lg font-bold text-primary">Jam</span>
                </div>,
              ]}
            </InfiniteScrollLoop>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollCard
              delay={0.1}
              direction="scale"
              intensity="medium"
              shadowLevel="medium"
              className="p-8 mb-12"
            >
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  See GCSJ in Action
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Watch how our community learns, builds, and grows together
                  through Google Cloud Study Jam
                </p>
              </div>
            </ScrollCard>

            <div className="max-w-4xl mx-auto">
              <ScrollCard
                delay={0.3}
                direction="up"
                intensity="strong"
                shadowLevel="glow"
                className="overflow-hidden"
              >
                <div className="aspect-video bg-gradient-hero rounded-2xl flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-colors cursor-pointer">
                      <svg
                        className="w-8 h-8 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      GCSJ 2024 Highlights
                    </h3>
                    <p className="opacity-90">Coming Soon: Watch our journey</p>
                  </div>
                </div>
              </ScrollCard>
            </div>
          </div>
        </section>

        {/* Interactive Media Gallery */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GlassmorphismCard className="p-8 mb-16">
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Experience Our Program
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Interactive gallery showcasing the Google Cloud Study Jam
                  experience
                </p>
              </div>
            </GlassmorphismCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Ken Burns Background */}
              <div className="relative h-64 rounded-xl overflow-hidden">
                <KenBurnsEffect
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop"
                  alt="Cloud Technology Background"
                  direction="zoom-in"
                  duration={8}
                  intensity={1.2}
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      Cloud Innovation
                    </h3>
                    <p className="text-white/90">
                      Powering the future of technology
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover Distortion Image */}
              <HoverImageDistortion
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop"
                alt="Google Cloud Platform"
                className="h-64 rounded-xl"
                distortionIntensity={15}
                waveSpeed={3}
              />
            </div>

            {/* 3D Image Carousel */}
            <div className="mb-16">
              <Image3DCarousel
                images={[
                  {
                    src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop",
                    alt: "Team Collaboration",
                    title: "Collaborative Learning",
                    description: "Work together with fellow cloud enthusiasts",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop",
                    alt: "Cloud Infrastructure",
                    title: "Cloud Infrastructure",
                    description: "Learn about scalable cloud solutions",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800&h=600&fit=crop",
                    alt: "Data Analytics",
                    title: "Data Analytics",
                    description: "Master data-driven decision making",
                  },
                ]}
                className="max-w-4xl mx-auto"
                autoPlay={true}
                autoPlayInterval={5000}
              />
            </div>

            {/* SVG Logo Animation */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-8">Google Cloud Platform</h3>
              <SVGPathDrawing
                paths={[
                  "M20 4h-16c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2z",
                  "M8 12l4-4 4 4",
                  "M12 8v8",
                ]}
                className="mx-auto"
                strokeColor="hsl(var(--primary))"
                strokeWidth={3}
                duration={1.5}
                staggerDelay={0.5}
                viewBox="0 0 24 24"
                size={{ width: 120, height: 120 }}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
