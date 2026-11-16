import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const alt = `${profile.name} — ${profile.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The card shown when the site is shared on LinkedIn, WhatsApp, Slack, etc.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#fff",
          background: "linear-gradient(135deg, #0b1026 0%, #1e1b4b 55%, #4338ca 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, opacity: 0.85 }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#34d399", marginRight: 14 }} />
          {profile.status}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ fontSize: 46, marginTop: 18, color: "#a5b4fc" }}>{profile.headline}</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, opacity: 0.85, lineHeight: 1.35 }}>
          Multi-agent trading systems · forecasting · computer vision · full-stack platforms
        </div>
      </div>
    ),
    size,
  );
}
