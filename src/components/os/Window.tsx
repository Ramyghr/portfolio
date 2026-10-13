"use client";

import { Rnd } from "react-rnd";
import { useEffect, useRef, useState } from "react";
import { useOS, WindowInstance } from "@/lib/store";
import { sfx } from "@/lib/sound";

const MENU_BAR_H = 28;

export default function Window({
  win,
  isMobile,
  children,
}: {
  win: WindowInstance;
  isMobile: boolean;
  children: React.ReactNode;
}) {
  const closeWindow = useOS((s) => s.closeWindow);
  const focusWindow = useOS((s) => s.focusWindow);
  const minimizeWindow = useOS((s) => s.minimizeWindow);
  const toggleMaximize = useOS((s) => s.toggleMaximize);
  const updateRect = useOS((s) => s.updateRect);
  const windows = useOS((s) => s.windows);
  const topZ = Math.max(...windows.map((w) => w.zIndex));
  const isFocused = win.zIndex === topZ;
  const mountedRef = useRef(false);

  const [bounds, setBounds] = useState({ w: 1200, h: 800 });
  useEffect(() => {
    const update = () => setBounds({ w: window.innerWidth, h: window.innerHeight - MENU_BAR_H });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      sfx.open();
    }
  }, []);

  if (win.minimized) return null;

  const rectX = win.maximized ? 0 : win.x;
  const rectY = win.maximized ? MENU_BAR_H : win.y;
  const rectW = win.maximized ? bounds.w : win.width;
  const rectH = win.maximized ? bounds.h : win.height;

  const handleClose = () => {
    sfx.close();
    closeWindow(win.id);
  };

  return (
    <Rnd
      size={{ width: rectW, height: rectH }}
      position={{ x: rectX, y: rectY }}
      minWidth={isMobile ? "100%" : 320}
      minHeight={isMobile ? "100%" : 220}
      bounds="parent"
      disableDragging={isMobile || win.maximized}
      enableResizing={!isMobile && !win.maximized}
      dragHandleClassName="win-drag-handle"
      style={{ zIndex: win.zIndex }}
      onDragStop={(_, d) => updateRect(win.id, { x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, pos) =>
        updateRect(win.id, {
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
          x: pos.x,
          y: pos.y,
        })
      }
      onMouseDown={() => !isFocused && focusWindow(win.id)}
      className="flex flex-col"
    >
      <div
        className={`win-chrome flex h-full flex-col overflow-hidden ${
          isMobile ? "" : "rounded-none"
        }`}
      >
        {/* Title bar */}
        <div
          className={`win-drag-handle flex items-center justify-between px-1.5 py-1 shrink-0 select-none ${
            isFocused ? "win-titlebar" : "win-titlebar-inactive"
          }`}
          onDoubleClick={() => !isMobile && toggleMaximize(win.id)}
        >
          <div className="flex items-center gap-1.5">
            {!isMobile && (
              <button
                aria-label="Close"
                onClick={handleClose}
                className="pixel-btn h-3.5 w-3.5 shrink-0"
              />
            )}
          </div>
          <div className="title-chip font-pixel text-[10px] px-2 py-0.5 truncate max-w-[60%]">
            {win.icon} {win.title}
          </div>
          <div className="flex items-center gap-1.5">
            {!isMobile && (
              <button
                aria-label="Minimize"
                onClick={() => minimizeWindow(win.id)}
                className="pixel-btn h-3.5 w-3.5 shrink-0"
              />
            )}
            {!isMobile && (
              <button
                aria-label="Maximize"
                onClick={() => toggleMaximize(win.id)}
                className="pixel-btn h-3.5 w-3.5 shrink-0"
              />
            )}
            {isMobile && (
              <button
                aria-label="Close"
                onClick={handleClose}
                className="pixel-btn font-pixel text-[9px] px-2 py-0.5"
              >
                X
              </button>
            )}
          </div>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto thin-scrollbar bg-(--color-paper)">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
