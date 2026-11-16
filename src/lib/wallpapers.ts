import MonteCarloSky from "@/components/os/wallpapers/MonteCarloSky";
import RegimeShift from "@/components/os/wallpapers/RegimeShift";
import Constellation from "@/components/os/wallpapers/Constellation";
import ClosingBell from "@/components/os/wallpapers/ClosingBell";

// Every wallpaper is generated live from the kind of thing this portfolio is
// about: simulated price paths, regime shifts, embedding clusters, candles.
export const wallpapers = [
  { id: "closing-bell", label: "Closing Bell", Component: ClosingBell },
  { id: "monte-carlo", label: "Monte Carlo", Component: MonteCarloSky },
  { id: "regime-shift", label: "Regime Shift", Component: RegimeShift },
  { id: "constellation", label: "Embeddings", Component: Constellation },
] as const;

export type WallpaperId = (typeof wallpapers)[number]["id"];

export function getWallpaper(id: string) {
  return wallpapers.find((w) => w.id === id) ?? wallpapers[0];
}
