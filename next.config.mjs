import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.9"],
  turbopack: {
    root,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 88],
  },
  async redirects() {
    return [
      {
        source: "/games/patternmind",
        destination: "/patternmind/",
        permanent: false,
      },
      {
        source: "/games/bollyverse",
        destination: "/bollyverse/",
        permanent: false,
      },
      {
        source: "/games/chain-reaction",
        destination: "/chainreaction/",
        permanent: false,
      },
      {
        source: "/games/rainbow-flow",
        destination: "/rainbowflow/",
        permanent: false,
      },
      {
        source: "/patternmind",
        destination: "/games/pattern-mind/index.html",
        permanent: false,
      },
      {
        source: "/bollyverse",
        destination: "/games/bollywood-game/index.html",
        permanent: false,
      },
      {
        source: "/chainreaction",
        destination: "/games/chain-reaction/index.html",
        permanent: false,
      },
      {
        source: "/rainbowflow",
        destination: "/games/rainbow-flow/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
