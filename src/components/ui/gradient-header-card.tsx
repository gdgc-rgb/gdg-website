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
    <span className="w-6 h-6 rounded-full bg-white/60 grid place-items-center text-xs">
      ◯
    </span>
    <span className="w-6 h-6 rounded-full bg-white/60 grid place-items-center text-xs">
      ◎
    </span>
    <span className="w-6 h-6 rounded-full bg-white/60 grid place-items-center text-xs">
      ✱
    </span>
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
      className={`relative z-20 rounded-3xl overflow-hidden shadow-xl flex flex-col ${className}`}
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
        backgroundColor: "white",
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
            "linear-gradient(90deg, #c3ecf6 0% , #f8d8d8 33%, #ffe7a5 66%, #ccf6c5 100%)",
          borderRadius: "24px 24px -24px -25px",
        }}
      >
        {/* Clean inner border like reference image */}
        <div
          className="absolute inset-[3px] pointer-events-none"
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.4)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
            borderRight: "1px solid rgba(255, 255, 255, 0.4)",
            borderBottom: "none",
            borderRadius: "21px 21px 0 0",
          }}
        />

        <h3 className="text-black/80 text-lg md:text-xl font-semibold drop-shadow-lg relative z-10">
          {title}
        </h3>
        <div className="relative z-10">{rightIcons ?? <DefaultIcons />}</div>
      </div>

      {/* Body - solid white background, connected to header */}
      <div
        className={`${
          compact ? "p-3" : "p-4"
        } flex-1 flex flex-col justify-center`}
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
