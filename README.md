# 小计 (Xiao Ji) - 计算机学院 IP 形象展示

这是一个基于 Next.js 16 构建的精美交互式网页，用于展示计算机学院的吉祥物“小计”。

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

启动后，在浏览器中打开 [http://localhost:5000](http://localhost:5000) 查看应用。

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

## 项目结构

- `src/app/`：Next.js App Router 路由与布局
- `public/`：静态资源（形象图片、图标等）
- `package.json`：项目依赖与脚本配置

## 技术栈

- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS 4
- **动画**: 原生 CSS 动画 + Tailwind
- **语言**: TypeScript 5
- **包管理器**: pnpm
