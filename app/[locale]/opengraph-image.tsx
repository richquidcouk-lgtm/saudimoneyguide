import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "SaudiMoney";

// Satori (the renderer behind ImageResponse) doesn't support the Arabic
// contextual-substitution font feature needed for correct letter joining —
// rendering real Arabic text here throws (`lookupType: 5 - substFormat: 3
// is not yet supported`), which crashes the whole route with a 500.
// Confirmed by testing "المال السعودي" directly, not just the longer
// tagline. Every real Saudi fintech (Tamara, Tabby, STC Pay) also keeps its
// brand name in Latin script even in Arabic contexts, so using the English
// wordmark here for both locales isn't a compromise — it's a legitimate
// pattern, and it's a functioning image instead of a broken one.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F4EC",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 15% 20%, rgba(11,93,82,0.14), transparent 45%), radial-gradient(circle at 85% 85%, rgba(169,128,61,0.18), transparent 45%)",
          }}
        />
        <div
          style={{
            display: "flex",
            width: 128,
            height: 128,
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #0B5D52, #073B34)",
            boxShadow: "0 0 0 4px #A9803D",
          }}
        >
          <svg width="76" height="76" viewBox="0 0 24 24" fill="none">
            <path d="M8,19 L16,19" stroke="#F1E6CB" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12,19 L12,8" stroke="#F1E6CB" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M12,8 L3,11" stroke="#F1E6CB" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12,8 L5,3" stroke="#F1E6CB" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12,8 L12,1" stroke="#F1E6CB" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12,8 L19,3" stroke="#F1E6CB" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12,8 L21,11" stroke="#F1E6CB" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 80,
            fontWeight: 700,
            color: "#14201B",
          }}
        >
          SaudiMoney
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 32,
            fontWeight: 500,
            color: "#38473F",
          }}
        >
          Your trusted guide to Saudi personal finance
        </div>
      </div>
    ),
    { ...size },
  );
}
