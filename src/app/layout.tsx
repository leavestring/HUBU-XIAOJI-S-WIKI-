import type { Metadata } from 'next';
import './globals.css';

/**
 * 全局元数据配置
 * 优化 SEO 与社交媒体分享展示
 */
export const metadata: Metadata = {
  title: '小计 | 计算机学院IP形象',
  description:
    '计算机学院专属卡通人物形象「小计」—— 融合科技与可爱的数字精灵，陪你探索代码世界的无限可能。',
  keywords: [
    '小计',
    '计算机学院',
    'IP形象',
    '吉祥物',
    '卡通人物',
    '校园文化',
  ],
  openGraph: {
    title: '小计 | 计算机学院IP形象',
    description:
      '计算机学院专属卡通人物形象「小计」—— 融合科技与可爱的数字精灵，陪你探索代码世界的无限可能。',
    type: 'website',
    locale: 'zh_CN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* ─────────── 滚动条美化定制 ─────────── */
    <html lang="zh-CN" className="scroll-smooth">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
