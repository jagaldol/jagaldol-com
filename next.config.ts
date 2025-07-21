import createMDX from "@next/mdx"
import type { NextConfig } from "next"
import remarkGfm from "remark-gfm"

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "img.shields.io",
      },
    ],
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
  },
})

export default withMDX(nextConfig)
