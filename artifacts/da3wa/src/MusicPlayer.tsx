import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
  src: string;
  shouldPlay: boolean;
}

export function MusicPlayer({ src, shouldPlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (shouldPlay && !hasStarted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setHasStarted(true))
        .catch((err) => {
          console.warn("Autoplay blocked:", err);
        });
    }
  }, [shouldPlay, hasStarted]);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      <button
        onClick={toggleMute}
        aria-label={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
        className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center
                   rounded-full bg-white/20 backdrop-blur-md border border-white/30
                   shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-white" />
        ) : (
          <Volume2 className="h-5 w-5 text-white" />
        )}
      </button>
    </>
  );
}