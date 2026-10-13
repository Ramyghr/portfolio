import ClassicPattern from "@/components/os/wallpapers/ClassicPattern";
import LofiNight from "@/components/os/wallpapers/LofiNight";
import LofiVinyl from "@/components/os/wallpapers/LofiVinyl";
import DarkFantasy from "@/components/os/wallpapers/DarkFantasy";

export const wallpapers = [
  { id: "classic", label: "Classic", Component: ClassicPattern },
  { id: "lofi-night", label: "Lo-fi Night", Component: LofiNight },
  { id: "lofi-vinyl", label: "Lo-fi Vinyl", Component: LofiVinyl },
  { id: "dark-fantasy", label: "Dark Fantasy", Component: DarkFantasy },
] as const;

export type WallpaperId = (typeof wallpapers)[number]["id"];

export function getWallpaper(id: string) {
  return wallpapers.find((w) => w.id === id) ?? wallpapers[0];
}
