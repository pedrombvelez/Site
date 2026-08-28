import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Esta app vive numa subpasta de um repositório com outro projeto Next.
  // Sem isto, o Turbopack sobe até à raiz e apanha os ficheiros do vizinho.
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
