"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useOS, WALLPAPER_KEY } from "@/lib/store";
import { apps, DESKTOP_APPS } from "@/lib/appRegistry";
import BootScreen from "@/components/boot/BootScreen";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Spotlight from "./Spotlight";
import AppRenderer from "@/components/apps/AppRenderer";
import { getWallpaper } from "@/lib/wallpapers";
import SkaterTrick from "./SkaterTrick";

const MOBILE_QUERY = "(max-width: 767px)";
const subscribeMobile = (cb: () => void) => {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

export default function Desktop() {
  const booted = useOS((s) => s.booted);
  const setBooted = useOS((s) => s.setBooted);
  const windows = useOS((s) => s.windows);
  const openWindow = useOS((s) => s.openWindow);
  const wallpaper = useOS((s) => s.wallpaper);
  const setWallpaper = useOS((s) => s.setWallpaper);
  const cycleWallpaper = useOS((s) => s.cycleWallpaper);
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
  const Wallpaper = getWallpaper(wallpaper).Component;

  // Returning visitors skip the boot screen and keep their wallpaper.
  useEffect(() => {
    try {
      if (localStorage.getItem("gharbi-os-booted") === "1") setBooted(true);
      const savedWallpaper = localStorage.getItem(WALLPAPER_KEY);
      if (savedWallpaper) setWallpaper(savedWallpaper);
    } catch {
      /* storage blocked: boot normally */
    }
  }, [setBooted, setWallpaper]);

  // The first thing anyone sees after boot is who this is.
  useEffect(() => {
    if (booted) openWindow(apps.welcome);
  }, [booted, openWindow]);

  // Ctrl/⌘+K opens search from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!booted) return <BootScreen />;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <Wallpaper />
      <MenuBar
        wallpaperLabel={getWallpaper(wallpaper).label}
        onCycleWallpaper={cycleWallpaper}
        onSearch={() => setSearchOpen(true)}
      />
      <div
        className={
          isMobile
            ? "absolute top-11 inset-x-0 px-3 grid grid-cols-4 justify-items-center gap-y-5 z-10"
            : "absolute top-10 left-3 bottom-20 flex flex-col flex-wrap content-start gap-x-1 gap-y-4 z-10"
        }
      >
        {DESKTOP_APPS.map((id) => (
          <DesktopIcon
            key={id}
            testId={`icon-${id}`}
            icon={apps[id].icon}
            label={apps[id].title}
            onOpen={() => openWindow(apps[id])}
          />
        ))}
      </div>

      {!isMobile && (
        <SkaterTrick className="absolute right-6 bottom-6 z-10 w-[440px] h-36 pointer-events-none" />
      )}

      {windows.map((w) => (
        <Window key={w.id} win={w} isMobile={isMobile}>
          <AppRenderer win={w} />
        </Window>
      ))}

      <Dock />
      {searchOpen && <Spotlight onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
