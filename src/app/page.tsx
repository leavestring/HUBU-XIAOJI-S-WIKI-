'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';

/* ─────────── 类型定义与静态数据 ─────────── */

interface CharacterData {
  name: string;
  title: string;
  subtitle: string;
  image: string;
  color: string;
  traits: { icon: string; label: string; desc: string }[];
  description: string;
  codeSignature: string;
}

const ASSET_PREFIX = process.env.NODE_ENV === 'production' ? '/HUBU-XIAOJI-S-WIKI-' : '';

const CHARACTERS: CharacterData[] = [
  {
    name: '小计',
    title: '男生版',
    subtitle: 'Boy Version',
    image: `${ASSET_PREFIX}/assets/xiaoji-bowtie.png`,
    color: '#1e40af',
    traits: [
      { icon: '🧠', label: '聪颖过人', desc: '墨绿发色下藏着超级大脑，算法难题不在话下' },
      { icon: '💻', label: '代码高手', desc: '精通各类编程语言，Bug 见了就跑' },
      { icon: '🔍', label: '精准调试', desc: '透明镜片后是洞察一切的目光，错误无处遁形' },
      { icon: '⚡', label: '活力满满', desc: '挥手打招呼的姿势，元气永远在线' },
    ],
    description:
      '小计·男生版，一头深墨绿色的短发点缀着星光般的碎闪，大框透明眼镜后的圆眼睛闪烁着灵动与好奇。身穿白色电路纹衬衫，黑色领结端正系在领口，胸口的蓝色院徽熠熠生辉。深墨绿色工装裤上的"Hello World"是他的信条——每一次出发，都是无限可能的开始。他笑着挥手，仿佛在说："嘿，代码世界，我来了！"',
    codeSignature: `class XiaoJiBoy extends CSStudent {
  name = "小计";
  version = "男生版";
  motto = "Hello World!";
  
  async solve(problem: Algorithm) {
    return this.brain.optimize(problem);
  }
}`,
  },
  {
    name: '小计',
    title: '女生版',
    subtitle: 'Girl Version',
    image: `${ASSET_PREFIX}/assets/xiaoji-girl.png`,
    color: '#7c3aed',
    traits: [
      { icon: '🎀', label: '温柔细致', desc: '藏蓝长发间别着蝴蝶结，代码风格优雅又规范' },
      { icon: '📊', label: '数据达人', desc: '从数据中发现故事，用可视化讲述美好' },
      { icon: '🌟', label: '灵感不断', desc: '灰蓝眼眸里总有新点子在闪烁' },
      { icon: '🤝', label: '热情友善', desc: '微笑着邀请你一起探索编程的世界' },
    ],
    description:
      '小计·女生版，一头藏蓝色的中长发自然微卷，俏皮的呆毛与白色蝴蝶结发饰相映成趣，发间的星星装饰仿佛数据流中跳跃的光点。灰蓝色的杏眼温和带笑，白色衬衫外搭浅灰针织背心，领口的白色小领结端庄而可爱。蓝白灰格纹百褶裙随风轻摆，胸口的院徽是她与计算机学院最深的羁绊。她伸出手掌发出邀请："一起来吧，编程的世界很精彩。"',
    codeSignature: `class XiaoJiGirl extends CSStudent {
  name = "小计";
  version = "女生版";
  style = "优雅而温暖";
  
  render(data: Dataset) {
    return this.insight.visualize(data);
  }
}`,
  },
];

const EXPRESSIONS = [
  { label: 'WiFi断开', image: `${ASSET_PREFIX}/assets/WiFi断开.jpg`, desc: '网络怎么又断了！' },
  { label: '不想上班', image: `${ASSET_PREFIX}/assets/不想上班.jpg`, desc: '好想继续睡觉...' },
  { label: '减肥失败', image: `${ASSET_PREFIX}/assets/减肥失败.jpg`, desc: '吃完这顿再减！' },
  { label: '吃薯片', image: `${ASSET_PREFIX}/assets/吃薯片.jpg`, desc: '咔嚓咔嚓咔嚓。' },
  { label: '周一综合征', image: `${ASSET_PREFIX}/assets/周一综合征.jpg`, desc: '为什么今天是周一？' },
  { label: '周末好短', image: `${ASSET_PREFIX}/assets/周末好短.jpg`, desc: '周末去哪儿了？' },
  { label: '已经结束了', image: `${ASSET_PREFIX}/assets/已经结束了.jpg`, desc: '项目终于上线了。' },
  { label: '我emo了', image: `${ASSET_PREFIX}/assets/我emo了.jpg`, desc: 'Bug 怎么越改越多...' },
  { label: '我累了', image: `${ASSET_PREFIX}/assets/我累了.jpg`, desc: '写不动了，躺会儿。' },
  { label: '摸鱼被抓', image: `${ASSET_PREFIX}/assets/摸鱼被抓.jpg`, desc: '老板怎么站在后面！' },
  { label: '栓Q', image: `${ASSET_PREFIX}/assets/栓Q.jpg`, desc: '真是谢谢你啊。' },
  { label: '生气', image: `${ASSET_PREFIX}/assets/生气.jpg`, desc: '谁把生产库删了！！' },
  { label: '真的会写', image: `${ASSET_PREFIX}/assets/真的会写.jpg`, desc: '我真的会写这段代码！' },
  { label: '躺平', image: `${ASSET_PREFIX}/assets/躺平.jpg`, desc: '就这样吧，毁灭吧。' },
];

const TIMELINE = [
  {
    year: '2022.01',
    event: '灵感萌芽',
    desc: '计算机学院决定打造专属IP形象，以"Hello World"为精神内核，开始构思角色设计方向。',
  },
  {
    year: '2022.01',
    event: '征集启动',
    desc: '面向全院六千余名学生征集吉祥物设计作品的名称，数百件创意涌入。',
  },
  {
    year: '2022.01',
    event: '形象诞生',
    desc: '经过班级推优、全院投票、专家评审，"小计"形象和名称正式确定。',
  },
  {
    year: '2026.04',
    event: '创作征集',
    desc: '小计专属表情包开始征集，我们制作了一系列表情。',
  },
  {
    year: '2026.04',
    event: '双版登场',
    desc: '小计·男生版与小计·女生版双生形象表情包正式亮相。',
  },
];

const FUN_FACTS = [
  { q: '小计男生为什么是墨绿色头发？', a: '墨绿色象征着终端编辑器的经典配色——代码的世界，从"绿屏"开始！' },
  { q: '小计女生为什么是藏蓝色头发？', a: '藏蓝色呼应了屏幕上深邃的代码编辑器暗色主题，是程序员的"第二层皮肤"。' },
  { q: '小计的日常作息？', a: '白天写代码，晚上跑测试，凌晨 Debug... 然后循环！' },
  { q: '小计的座右铭？', a: '"Hello World 不是终点，而是无限可能的起点。"——这也是男生版裤腿上印着的话。' },
  { q: '男生版和女生版有什么区别？', a: '男生版戴透明眼镜、穿工装裤，活力满满像刚跑完编译；女生版别蝴蝶结、穿百褶裙，温柔细致像正在做代码审查。' },
  { q: '小计的隐藏技能？', a: '能在 0.01 秒内找到你代码里第 1024 行的分号缺失！' },
];

/* ─────────── 粒子背景组件 ─────────── */

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      char: string;
    }[] = [];
    const chars = '01<>/{}[];=+&|#@$%';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      particles.length = 0;
      const count = Math.min(60, Math.floor(window.innerWidth / 25));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -Math.random() * 0.8 - 0.2,
          size: Math.random() * 10 + 8,
          alpha: Math.random() * 0.15 + 0.05,
          char: chars[Math.floor(Math.random() * chars.length)],
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;

        ctx.font = `${p.size}px monospace`;
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
        ctx.fillText(p.char, p.x, p.y);
      }
      animationId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}

/* ─────────── 动画滚动容器组件 (Intersection Observer) ─────────── */

function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────── 打字机效果组件 ─────────── */

function TypingText({ text, speed = 80 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setStarted(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, started]);

  if (!mounted) return null;

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-cs-cyan">|</span>
    </span>
  );
}

/* ─────────── 代码块展示组件 ─────────── */

function CodeBlock({ code, delay = 0 }: { code: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  if (!mounted) return null;

  return (
    <div
      className={`overflow-hidden rounded-xl border border-blue-900/30 bg-slate-900 font-mono text-sm transition-all duration-700 ${visible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
    >
      <div className="flex items-center gap-2 border-b border-slate-700/50 px-4 py-2">
        {/* 模拟编辑器窗口控制按钮 */}
        <div className="h-3 w-3 rounded-full bg-red-500/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <div className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-slate-400">xiaoji.ts</span>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed sm:text-sm">
        <code>
          {code.split('\n').map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 inline-block w-6 text-right text-slate-600">
                {i + 1}
              </span>
              <span className="text-cyan-300">{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

/* ─────────── 鼠标点击火花特效 Hook ─────────── */

function useClickSparkle() {
  const [sparkles, setSparkles] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const addSparkle = useCallback((e: React.MouseEvent) => {
    const id = Date.now();
    const x = e.clientX;
    const y = e.clientY;
    setSparkles((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 1000);
  }, []);

  const SparkleElements = () => (
    <div className="pointer-events-none fixed inset-0 z-50">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{ left: s.x, top: s.y }}
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-2 w-2 animate-ping rounded-full"
              style={{
                background: ['#06b6d4', '#7c3aed', '#ec4899', '#1e40af', '#06b6d4', '#7c3aed'][i],
                transform: `translate(${Math.cos((i * 60 * Math.PI) / 180) * 30}px, ${Math.sin((i * 60 * Math.PI) / 180) * 30}px)`,
                animationDuration: '0.6s',
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );

  return { addSparkle, SparkleElements };
}

/* ─────────── 导航栏组件 ─────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['hero', 'characters', 'story', 'emoji', 'fun'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'hero', label: '首页' },
    { id: 'characters', label: '形象' },
    { id: 'story', label: '故事' },
    { id: 'emoji', label: '表情包' },
    { id: 'fun', label: '趣闻' },
  ];

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${scrolled ? 'glass-dark shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cs-blue to-cs-cyan font-bold text-white">
            计
          </div>
          <span className="text-lg font-bold text-white">
            小计
          </span>
        </div>
        {mounted && (
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${activeSection === link.id
                  ? 'bg-white/15 text-cs-cyan'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

/* ─────────── 首屏展示区 (Hero Section) ─────────── */

function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950"
    >
      {/* 装饰性背景圆环 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-rotate-slow absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full border border-cs-cyan/10" />
        <div
          className="animate-rotate-slow absolute -bottom-60 -left-60 h-[600px] w-[600px] rounded-full border border-cs-purple/10"
          style={{ animationDirection: 'reverse' }}
        />
        <div className="absolute top-1/4 left-1/4 h-2 w-2 animate-pulse rounded-full bg-cs-cyan/40" />
        <div className="absolute right-1/3 bottom-1/3 h-3 w-3 animate-pulse rounded-full bg-cs-purple/30" />
        <div className="absolute top-1/3 right-1/4 h-1.5 w-1.5 animate-pulse rounded-full bg-cs-pink/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 text-center">
        {/* 主标题区域 */}
        <div className="mb-6">
          <span className="inline-block rounded-full border border-cs-cyan/30 bg-cs-cyan/10 px-4 py-1.5 text-sm font-medium text-cs-cyan">
            Computer Science College IP
          </span>
        </div>

        <h1 className="mb-4 text-6xl font-black tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
          <span className="gradient-text">小计</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300 sm:text-xl">
          <TypingText text="计算机学院专属IP形象 —— 墨绿发色的元气少年，电路衬衫与Hello World，陪你探索代码世界的无限可能" />
        </p>

        {/* 浮动形象预览 */}
        {mounted && (
          <div className="relative mx-auto mb-12 flex items-center justify-center gap-8 sm:gap-16">
            <div
              className="animate-float relative"
              style={{
                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
              }}
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-600/20 to-cyan-400/20 blur-xl" />
                <Image
                  src={`${ASSET_PREFIX}/assets/xiaoji-bowtie.png`}
                  alt="小计·男生版"
                  width={224}
                  height={224}
                  className="relative h-48 w-48 rounded-3xl border-2 border-cs-cyan/30 object-cover shadow-2xl shadow-blue-500/20 sm:h-56 sm:w-56"
                />
                <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cs-blue to-cs-cyan text-xs font-bold text-white shadow-lg">
                  男
                </div>
              </div>
            </div>

            <div className="text-2xl text-slate-500 sm:text-4xl">&</div>

            <div
              className="animate-float-delayed relative"
              style={{
                transform: `translate(${-mousePos.x}px, ${-mousePos.y}px)`,
              }}
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-600/20 to-pink-400/20 blur-xl" />
                <Image
                  src={`${ASSET_PREFIX}/assets/xiaoji-girl.png`}
                  alt="小计·女生版"
                  width={224}
                  height={224}
                  className="relative h-48 w-48 rounded-3xl border-2 border-cs-purple/30 object-cover shadow-2xl shadow-purple-500/20 sm:h-56 sm:w-56"
                />
                <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cs-purple to-cs-pink text-xs font-bold text-white shadow-lg">
                  女
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 滚动提示 */}
        <a
          href="#characters"
          className="inline-flex flex-col items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cs-cyan"
        >
          <span>探索小计的世界</span>
          <svg
            className="h-5 w-5 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

/* ─────────── 角色详细信息卡片 ─────────── */

function CharacterCard({
  character,
  index,
}: {
  character: CharacterData;
  index: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isLeft = index === 0;

  return (
    <AnimatedSection
      delay={index * 200}
      className={`flex flex-col items-center gap-8 lg:flex-row ${isLeft ? '' : 'lg:flex-row-reverse'
        }`}
    >
      {/* 角色形象预览图 */}
      <div className="relative w-full max-w-md lg:w-1/2">
        <div className="group relative cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r opacity-30 blur-2xl transition-opacity group-hover:opacity-50"
            style={{
              backgroundImage: `linear-gradient(135deg, ${character.color}, ${index === 0 ? '#06b6d4' : '#ec4899'})`,
            }}
          />
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-sm">
            <Image
              src={character.image}
              alt={character.name}
              width={500}
              height={500}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white"
                  style={{ background: character.color }}
                >
                  计
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {character.name}
                  </h3>
                  <p className="text-sm text-cs-cyan">{character.title}</p>
                </div>
              </div>
            </div>
            {/* 翻转提示标签 */}
            <div className="absolute top-4 right-4 rounded-full bg-white/10 px-3 py-1 text-xs text-white/70 backdrop-blur-sm">
              {isFlipped ? '返回' : '点击翻转'}
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="w-full lg:w-1/2">
        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-medium tracking-widest text-cs-cyan uppercase">
              {character.subtitle}
            </p>
            <h2 className="mb-2 text-4xl font-black text-white">
              {character.name} · {character.title}
            </h2>
          </div>

          {!isFlipped ? (
            <>
              <p className="text-lg leading-relaxed text-slate-300">
                {character.description}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {character.traits.map((trait, i) => (
                  <div
                    key={i}
                    className="group/card rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:border-cs-cyan/30 hover:bg-white/10"
                  >
                    <div className="mb-1 text-2xl">{trait.icon}</div>
                    <div className="text-sm font-semibold text-white">
                      {trait.label}
                    </div>
                    <div className="text-xs text-slate-400">{trait.desc}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <CodeBlock code={character.codeSignature} delay={100} />
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ─────────── 核心形象展示区 ─────────── */

function CharactersSection() {
  return (
    <section
      id="characters"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950/50 to-slate-950 py-24"
    >
      <div className="pointer-events-none absolute inset-0 circuit-bg" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-cs-purple/30 bg-cs-purple/10 px-4 py-1.5 text-sm font-medium text-cs-purple">
            Character Design
          </span>
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">
            双生<span className="gradient-text-warm">形象</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-slate-400">
            一男一女，双生共鸣。小计以两种姿态守护计算机学院的每一位学子。
          </p>
        </AnimatedSection>

        <div className="space-y-24">
          {CHARACTERS.map((char, i) => (
            <CharacterCard key={i} character={char} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── 发展历程展示区 ─────────── */

function StorySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="story"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-indigo-950 py-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-cs-blue/30 bg-cs-blue/10 px-4 py-1.5 text-sm font-medium text-cs-cyan">
            起源故事
          </span>
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">
            诞生<span className="gradient-text">纪事</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-slate-400">
            从一个灵感到一个完整的IP形象，小计的每一步都凝聚着计算机学院的创意与热爱。
          </p>
        </AnimatedSection>


        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Line */}
          <div className="absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b from-cs-cyan via-cs-purple to-cs-pink sm:left-1/2" />

          {TIMELINE.map((item, i) => (
            <AnimatedSection key={i} delay={i * 150}>
              <div
                className={`relative mb-12 flex items-start gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
              >
                {/* Dot */}
                <div className="absolute left-8 z-10 -translate-x-1/2 sm:left-1/2">
                  <div
                    className={`h-4 w-4 rounded-full border-2 transition-all duration-300 ${activeIndex === i
                      ? 'scale-150 border-cs-cyan bg-cs-cyan shadow-lg shadow-cs-cyan/50'
                      : 'border-slate-500 bg-slate-800'
                      }`}
                  />
                </div>

                {/* Content */}
                <div
                  className={`ml-16 w-full sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'
                    }`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <div
                    className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${activeIndex === i
                      ? 'border-cs-cyan/30 bg-cs-cyan/5 shadow-lg shadow-cs-cyan/10'
                      : 'border-white/5 bg-white/5'
                      }`}
                  >
                    <span className="text-sm font-mono font-bold text-cs-cyan">
                      {item.year}
                    </span>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      {item.event}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── 表情包交互展示区 ─────────── */

function EmojiSection() {
  const [activeEmoji, setActiveEmoji] = useState(EXPRESSIONS.find(e => e.label === '生气') || EXPRESSIONS[0]);

  return (
    <section
      id="emoji"
      className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-950 to-slate-950 py-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-cs-pink/30 bg-cs-pink/10 px-4 py-1.5 text-sm font-medium text-cs-pink">
            表情包系列
          </span>
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">
            表情<span className="gradient-text-warm">包</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-slate-400">
            小计的日常表情，每一个都写满了程序员的真实写照。点击下方相应的按钮进行查看。
          </p>
        </AnimatedSection>

        {/* 表情包选择按钮组 */}
        <AnimatedSection className="mx-auto mb-12 flex max-w-4xl flex-wrap justify-center gap-3">
          {EXPRESSIONS.map((expr, i) => (
            <button
              key={i}
              onClick={() => setActiveEmoji(expr)}
              className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 border ${activeEmoji.label === expr.label
                ? 'bg-gradient-to-r from-cs-pink to-cs-purple text-white shadow-lg shadow-cs-pink/30 border-cs-pink/50 scale-105'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
            >
              {expr.label}
            </button>
          ))}
        </AnimatedSection>

        {/* 表情包内容展示区 */}
        <AnimatedSection className="mx-auto max-w-xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-8 text-center backdrop-blur-sm shadow-2xl">
            <h3 className="mb-2 text-2xl font-bold text-white">{activeEmoji.label}</h3>
            <p className="mb-8 text-sm text-slate-400">{activeEmoji.desc}</p>
            <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-2xl bg-white/5 border border-white/10 group">
              <Image
                key={activeEmoji.image}
                src={activeEmoji.image}
                alt={activeEmoji.label}
                fill
                className="object-contain p-4 animate-slide-up"
                unoptimized
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─────────── 趣味百科展示区 ─────────── */

function FunSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="fun"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-blue-950 py-24"
    >
      <div className="pointer-events-none absolute inset-0 circuit-bg" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <AnimatedSection className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-cs-cyan/30 bg-cs-cyan/10 px-4 py-1.5 text-sm font-medium text-cs-cyan">
            小计趣闻
          </span>
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">
            趣味<span className="gradient-text">档案</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-slate-400">
            关于小计你不知道的那些事，每一条都让人会心一笑。
          </p>
        </AnimatedSection>

        <div className="mx-auto max-w-2xl space-y-4">
          {FUN_FACTS.map((fact, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div
                className="cursor-pointer rounded-2xl border border-white/5 bg-white/5 transition-all hover:border-cs-cyan/20 hover:bg-white/10"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cs-blue to-cs-cyan text-sm font-bold text-white">
                      {i + 1}
                    </div>
                    <span className="text-base font-semibold text-white">
                      {fact.q}
                    </span>
                  </div>
                  <svg
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="border-t border-white/5 px-5 py-4">
                    <p className="text-slate-300">{fact.a}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── 页脚组件 ─────────── */

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 py-16">
      <div className="pointer-events-none absolute inset-0 circuit-bg" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <div className="mb-6 flex items-center justify-center gap-4">
          <Image
            src={`${ASSET_PREFIX}/assets/xiaoji-bowtie.png`}
            alt="小计·男生版"
            width={64}
            height={64}
            className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
          />
          <Image
            src={`${ASSET_PREFIX}/assets/xiaoji-girl.png`}
            alt="小计·女生版"
            width={64}
            height={64}
            className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
          />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-white">
          小计 · 计算机学院IP形象
        </h3>
        <p className="mb-6 text-slate-400">
          Hello World 不是终点，而是无限可能的起点。
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
          <span>计算机学院</span>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <span>IP形象设计</span>
          <span className="h-1 w-1 rounded-full bg-slate-600" />
          <span>2022 - 2026</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── 主页面入口 ─────────── */

export default function HomePage() {
  const { addSparkle, SparkleElements } = useClickSparkle();

  return (
    <main onClick={addSparkle} className="relative">
      <ParticleBackground />
      <SparkleElements />
      <Nav />
      <HeroSection />
      <CharactersSection />
      <StorySection />
      <EmojiSection />
      <FunSection />
      <Footer />
    </main>
  );
}
