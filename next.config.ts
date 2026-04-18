import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  transpilePackages: ['@hugeicons/react', '@hugeicons/core-free-icons'],
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
