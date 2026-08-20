import { useEffect, useState } from "react";

interface LightBurstTransitionProps {
  trigger: boolean;
  duration?: number; // مدة تأثير النور بالكامل (ms)
}

export function LightBurstTransition({
  trigger,
  duration = 900,
}: LightBurstTransitionProps) {
  const [phase, setPhase] = useState<"idle" | "flash-in" | "flash-out">("idle");

  useEffect(() => {
    if (!trigger) return;
    setPhase("flash-in");

    const outTimer = setTimeout(() => {
      setPhase("flash-out");
    }, duration * 0.45);

    const endTimer = setTimeout(() => {
      setPhase("idle");
    }, duration);

    return () => {
      clearTimeout(outTimer);
      clearTimeout(endTimer);
    };
  }, [trigger, duration]);

  if (phase === "idle") return null;

  return (
    <div
      className={`light-burst-overlay ${phase}`}
      style={{ "--burst-duration": `${duration}ms` } as React.CSSProperties}
    />
  );
}