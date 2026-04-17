/**
 * 搜索引擎爬虫协议配置 (Robots.txt)
 * 用于控制搜索引擎抓取工具对网站内容的访问权限
 */
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/static/'],
    },
  };
}
