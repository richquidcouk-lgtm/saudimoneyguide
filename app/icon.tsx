import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B5D52, #073B34)",
          borderRadius: "50%",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M8,19 L16,19" stroke="#F1E6CB" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12,19 L12,8" stroke="#F1E6CB" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12,8 L3,11" stroke="#F1E6CB" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12,8 L5,3" stroke="#F1E6CB" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12,8 L12,1" stroke="#F1E6CB" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12,8 L19,3" stroke="#F1E6CB" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M12,8 L21,11" stroke="#F1E6CB" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
