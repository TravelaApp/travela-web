import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The card shown when the site is shared on WhatsApp, X or anywhere else that
 * reads Open Graph tags. Built here rather than drawn by hand, so the copy stays
 * in step with the site.
 */
export const alt = "Travela is the free Android travel app for Kenya and all 47 counties";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Read once when the image is generated, then inlined as a data URL. */
const iconData = await readFile(join(process.cwd(), "public/app-icon.png"), "base64");
const iconSrc = `data:image/png;base64,${iconData}`;

const PILLS = ["Free on Android", "All 47 counties", "Works without a signal"];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbf7ee",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: -180,
            right: -180,
            width: 560,
            height: 560,
            borderRadius: 9999,
            backgroundImage: "radial-gradient(circle, rgba(255,107,0,0.30), rgba(255,107,0,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={iconSrc} width={72} height={72} alt="" style={{ borderRadius: 18 }} />
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#111111" }}>Travela</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#ff6b00" }}>
            ALL 47 COUNTIES OF KENYA
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 84,
              lineHeight: 1.05,
              fontWeight: 700,
              color: "#111111",
            }}
          >
            Every county. One passport.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              maxWidth: 900,
              fontSize: 30,
              lineHeight: 1.4,
              color: "#5e6b63",
            }}
          >
            The free Android travel app for Kenya. All 47 counties and the places inside them still open where the signal stops.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {PILLS.map((pill) => (
            <div
              key={pill}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 9999,
                border: "1px solid #e3d9c3",
                background: "#ffffff",
                fontSize: 22,
                color: "#111111",
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
