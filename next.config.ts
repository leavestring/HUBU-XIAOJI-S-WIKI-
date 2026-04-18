import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export', // 开启静态导出，用于 GitHub Pages 部署
  images: {
    unoptimized: true, // 静态导出模式下必须禁用图片优化
  },
  basePath: isProd ? '/HUBU-XIAOJI-S-WIKI-' : '',
};

export default nextConfig;
