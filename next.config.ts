import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Next's dev server blocks cross-origin requests to its internal asset/HMR
  // endpoints by default (since 14.1) — without this, loading the dev server
  // from a LAN IP (e.g. testing on a phone) serves the initial HTML fine but
  // silently fails to hydrate, so buttons/links appear dead. Only affects
  // `next dev`, not production builds.
  allowedDevOrigins: ["192.168.0.151", "localhost", "127.0.0.1"],
};

export default withNextIntl(nextConfig);
