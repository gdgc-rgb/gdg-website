import { ReactNode } from "react";

interface GradientHeaderCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  compact?: boolean;
  rightIcons?: ReactNode;
}

const DefaultIcons = () => (
  <div className="flex items-center gap-2 text-foreground/70">
    <span className="w-6 h-6 rounded-full bg-white/60 grid place-items-center text-xs">◯</span>
    <span className="w-6 h-6 rounded-full bg-white/60 grid place-items-center text-xs">◎</span>
    <span className="w-6 h-6 rounded-full bg-white/60 grid place-items-center text-xs">✱</span>
  </div>
);

export default function GradientHeaderCard({
  title,
  children,
  className = "",
  compact = false,
  rightIcons,
}: GradientHeaderCardProps) {
  return (
    <div 
      className={`relative z-20 rounded-3xl overflow-hidden shadow-xl ${className}`}
      style={{
        border: "2px solid transparent",
        backgroundImage: `
          linear-gradient(white, white),
          linear-gradient(90deg, 
            rgba(234,67,53,1) 0%, 
            rgba(66,133,244,1) 25%, 
            rgba(251,188,5,1) 50%, 
            rgba(52,168,83,1) 75%, 
            rgba(234,67,53,1) 100%
          )
        `,
        backgroundOrigin: "border-box",
        backgroundClip: "content-box, border-box",
        backgroundColor: "white"
      }}
    >
      {/* Solid white fill to guarantee opaque background */}
      <div
        aria-hidden
        className="absolute inset-[2px]"
        style={{
          backgroundColor: "white",
          borderRadius: "22px",
          zIndex: 0,
        }}
      />
      {/* Header bar with curved bottom that connects to body */}
      <div
        className="flex items-center justify-between px-6 py-4 relative"
        style={{
          background:
            "linear-gradient(90deg, rgba(234,67,53,1) 22%, rgba(66,133,244,1) 33%, rgba(251,188,5,1) 66%, rgba(52,168,83,1) 100%)",
          borderRadius: "24px 24px -24px -25px"
        }}
      >
        <h3 className="text-white text-lg md:text-xl font-semibold drop-shadow-sm">{title}</h3>
        {rightIcons ?? <DefaultIcons />}
      </div>

      {/* Body - solid white background, connected to header */}
      <div 
        className={`${compact ? "p-5" : "p-8"}`}
        style={{ 
          backgroundColor: "transparent",
          borderRadius: "0 0 24px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
