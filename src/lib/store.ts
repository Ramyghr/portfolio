"use client";

import { create } from "zustand";

export type WindowInstance = {
  id: string;
  appId: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  prevRect?: { x: number; y: number; width: number; height: number };
  props?: Record<string, unknown>;
};

export type AppDefinition = {
  id: string;
  title: string;
  icon: string;
  singleton?: boolean;
  defaultWidth: number;
  defaultHeight: number;
};

type OpenOptions = {
  title?: string;
  props?: Record<string, unknown>;
  instanceKey?: string;
};

type OSState = {
  windows: WindowInstance[];
  nextZ: number;
  booted: boolean;
  muted: boolean;
  setBooted: (v: boolean) => void;
  toggleMuted: () => void;
  openWindow: (def: AppDefinition, opts?: OpenOptions) => string;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateRect: (id: string, rect: Partial<Pick<WindowInstance, "x" | "y" | "width" | "height">>) => void;
};

let idCounter = 0;
const genId = () => `win-${Date.now()}-${idCounter++}`;

const cascadeOffset = () => {
  const n = idCounter % 6;
  return { x: 80 + n * 28, y: 70 + n * 24 };
};

export const useOS = create<OSState>((set, get) => ({
  windows: [],
  nextZ: 10,
  booted: false,
  muted: false,
  setBooted: (v) => set({ booted: v }),
  toggleMuted: () => set((s) => ({ muted: !s.muted })),

  openWindow: (def, opts) => {
    const instanceKey = opts?.instanceKey ?? def.id;
    const existing = def.singleton
      ? get().windows.find((w) => w.appId === instanceKey)
      : undefined;

    if (existing) {
      const z = get().nextZ + 1;
      set((s) => ({
        nextZ: z,
        windows: s.windows.map((w) =>
          w.id === existing.id ? { ...w, zIndex: z, minimized: false } : w
        ),
      }));
      return existing.id;
    }

    const id = genId();
    const z = get().nextZ + 1;
    const { x, y } = cascadeOffset();
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const win: WindowInstance = {
      id,
      appId: instanceKey,
      title: opts?.title ?? def.title,
      icon: def.icon,
      x: isMobile ? 0 : x,
      y: isMobile ? 0 : y,
      width: isMobile ? window.innerWidth : def.defaultWidth,
      height: isMobile ? window.innerHeight : def.defaultHeight,
      zIndex: z,
      minimized: false,
      maximized: isMobile,
      props: opts?.props,
    };

    set((s) => ({ windows: [...s.windows, win], nextZ: z }));
    return id;
  },

  closeWindow: (id) => set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),

  focusWindow: (id) => {
    const z = get().nextZ + 1;
    set((s) => ({
      nextZ: z,
      windows: s.windows.map((w) => (w.id === id ? { ...w, zIndex: z } : w)),
    }));
  },

  minimizeWindow: (id) =>
    set((s) => ({ windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)) })),

  restoreWindow: (id) => {
    const z = get().nextZ + 1;
    set((s) => ({
      nextZ: z,
      windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: false, zIndex: z } : w)),
    }));
  },

  toggleMaximize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized) {
          const prev = w.prevRect ?? { x: 100, y: 80, width: w.width, height: w.height };
          return { ...w, maximized: false, ...prev };
        }
        return {
          ...w,
          maximized: true,
          prevRect: { x: w.x, y: w.y, width: w.width, height: w.height },
        };
      }),
    })),

  updateRect: (id, rect) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, ...rect } : w)),
    })),
}));
