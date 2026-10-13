"use client";

import { useEffect, useState } from "react";
import { useOS } from "@/lib/store";
import { apps } from "@/lib/appRegistry";
import BootScreen from "@/components/boot/BootScreen";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import AppRenderer from "@/components/apps/AppRenderer";
import { startAmbient, unlockAudio } from "@/lib/sound";
import { getWallpaper } from "@/lib/wallpapers";
import SkaterTrick from "./SkaterTrick";

const DESKTOP_ICONS: { id: keyof typeof apps; icon: string; label: string }[] = [
  { id: "about", icon: "🧑", label: "About Me" },
  { id: "experience", icon: "🗂", label: "Experience" },
  { id: "projects", icon: "📁", label: "Projects" },
  { id: "terminal", icon: "⌨", label: "Terminal" },
  { id: "contact", icon: "✉", label: "Contact" },
];

export default function Desktop() {
  const booted = useOS((s) => s.booted);
  const setBooted = useOS((s) => s.setBooted);
  const muted = useOS((s) => s.muted);
  const windows = useOS((s) => s.windows);
  const openWindow = useOS((s) => s.openWindow);
  const wallpaper = useOS((s) => s.wallpaper);
  const setWallpaper = useOS((s) => s.setWallpaper);
  const cycleWallpaper = useOS((s) => s.cycleWallpaper);
  const [isMobile, setIsMobile] = useState(false);
  const [skippedBoot, setSkippedBoot] = useState(false);
  const Wallpaper = getWallpaper(wallpaper).Component;

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("gharbi-os-booted") === "1") {
      setBooted(true);
      setSkippedBoot(true);
    }
    const savedWallpaper = localStorage.getItem("gharbi-os-wallpaper");
    if (savedWallpaper) setWallpaper(savedWallpaper);
  }, [setBooted, setWallpaper]);

  useEffect(() => {
    if (!skippedBoot) return;
    const unlock = () => {
      unlockAudio();
      if (!muted) startAmbient(false);
      window.removeEventListener("click", unlock);
    };
    window.addEventListener("click", unlock, { once: true });
    return () => window.removeEventListener("click", unlock);
  }, [skippedBoot, muted]);

  if (!booted) return <BootScreen />;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Wallpaper />
      <MenuBar wallpaperLabel={getWallpaper(wallpaper).label} onCycleWallpaper={cycleWallpaper} />
      <div className="absolute top-10 left-3 flex flex-col gap-5 z-10">
        {DESKTOP_ICONS.map((d) => (
          <DesktopIcon
            key={d.id}
            testId={`icon-${d.id}`}
            icon={d.icon}
            label={d.label}
            onOpen={() => openWindow(apps[d.id])}
          />
        ))}
      </div>

      {!isMobile && (
        <SkaterTrick className="absolute right-8 bottom-16 z-10 w-56 h-28 pointer-events-none opacity-90" />
      )}

      {windows.map((w) => (
        <Window key={w.id} win={w} isMobile={isMobile}>
          <AppRenderer win={w} />
        </Window>
      ))}

      <Dock />
    </div>
  );
}
