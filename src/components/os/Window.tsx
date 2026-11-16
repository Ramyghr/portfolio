"use client";

import AppIcon from "./AppIcon";
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
          isMobile ? "rounded-none!" : ""
        }`}
      >
        {/* Title bar: red = close, yellow = minimize, green = maximize (glyphs show on hover) */}
        <div
          className={`win-drag-handle relative flex items-center h-10 px-3.5 shrink-0 select-none ${
            isFocused ? "win-titlebar" : "win-titlebar-inactive"
          }`}
          onDoubleClick={() => !isMobile && toggleMaximize(win.id)}
        >
          <div className="win-ctrls relative z-10 flex items-center gap-2">
            {isMobile ? (
              // on a phone the close control is a full-size touch target
              <button
                aria-label="Close"
                onClick={handleClose}
                className="-ml-2 h-10 px-2 flex items-center gap-1 text-[13px] font-medium text-(--color-accent)"
              >
                <svg viewBox="0 0 8 8" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 1 2 4l3 3" />
                </svg>
                Back
              </button>
            ) : (
              <button
                aria-label="Close"
                title="Close"
                onClick={handleClose}
                onDoubleClick={(e) => e.stopPropagation()}
                className="win-ctrl win-ctrl-close"
              >
                <svg viewBox="0 0 8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" />
                </svg>
              </button>
            )}
            {!isMobile && (
              <button
                aria-label="Minimize"
                title="Minimize"
                onClick={() => minimizeWindow(win.id)}
                onDoubleClick={(e) => e.stopPropagation()}
                className="win-ctrl win-ctrl-min"
              >
                <svg viewBox="0 0 8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M1.2 4h5.6" />
                </svg>
              </button>
            )}
            {!isMobile && (
              <button
                aria-label={win.maximized ? "Restore" : "Maximize"}
                title={win.maximized ? "Restore" : "Maximize"}
                onClick={() => toggleMaximize(win.id)}
                onDoubleClick={(e) => e.stopPropagation()}
                className="win-ctrl win-ctrl-max"
              >
                <svg viewBox="0 0 8 8" fill="currentColor">
                  <path d="M1.4 1.4h3.6L1.4 5z M6.6 6.6H3L6.6 3z" />
                </svg>
              </button>
            )}
          </div>
          <div className="win-title absolute inset-x-24 text-center text-[13px] font-medium text-(--color-ink) truncate pointer-events-none">
            <AppIcon name={win.icon} size={14} strokeWidth={1.75} className="inline-block align-[-2px] mr-1.5 opacity-70" />
            {win.title}
          </div>
        </div>
        <div className={`flex-1 min-h-0 overflow-y-auto thin-scrollbar bg-(--color-paper) ${isMobile ? "pb-16" : ""}`}>
          {children}
        </div>
      </div>
    </Rnd>
  );
}
