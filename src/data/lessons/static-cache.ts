import type { Lesson } from './types';

export const staticCacheLesson = {
    id: 'static-cache',
    number: '18',
    title: '静态资源与缓存策略',
    level: '部署',
    summary: '深入 express.static 的缓存、安全和 fallback 选项，理解何时交给 CDN 或反向代理。',
    methods: [
      {
        title: '缓存控制',
        detail:
          'maxAge 和 immutable 能减少浏览器重复请求，适合带内容哈希的构建产物。不带哈希的文件不要设置过长缓存。',
      },
      {
        title: '隐藏文件与目录行为',
        detail:
          'dotfiles、index、redirect 和 extensions 会影响文件暴露范围与目录访问行为。生产中应明确禁用不需要的能力。',
      },
      {
        title: 'fallthrough 边界',
        detail:
          'fallthrough 为 true 时静态文件未命中会交给后续路由，适合多个目录叠加；严格静态目录可设为 false 让错误尽早结束。',
      },
      {
        title: '动态上传不同于构建产物',
        detail:
          '构建产物通常可长期缓存，因为文件名带哈希；用户上传文件可能会被替换、撤回或需要权限控制，缓存策略要更保守。',
      },
    ],
    examples: [
      {
        title: '生产静态资源配置',
        language: 'js',
        code: `app.use('/assets', express.static('dist/assets', {
  immutable: true,
  maxAge: '1y',
  index: false,
  dotfiles: 'deny',
  fallthrough: false,
  setHeaders(res) {
    res.set('X-Content-Type-Options', 'nosniff');
  },
}));

app.use('/uploads', express.static('uploads', {
  maxAge: '10m',
  dotfiles: 'deny',
  index: false,
}));`,
      },
    ],
    review: [
      {
        question: 'immutable 适合什么资源？',
        answer: '适合文件名包含内容哈希的资源，因为内容变化时文件名也会变化，可以安全长期缓存。',
      },
      {
        question: 'dotfiles 为什么要显式处理？',
        answer: '以点开头的文件可能包含配置、密钥或内部信息，生产环境应避免被静态服务暴露。',
      },
      {
        question: '为什么静态资源最好交给 CDN 或反向代理？',
        answer: '它们更擅长缓存、压缩和边缘分发，能减少 Node 进程处理静态文件的压力。',
      },
      {
        question: '为什么上传文件不一定适合一年缓存？',
        answer: '上传文件可能涉及替换、删除、权限变化或内容审核，过长缓存会让客户端继续看到旧内容。',
      },
      {
        question: 'fallthrough: false 的价值是什么？',
        answer: '它让严格静态目录的错误尽快结束，避免无意义地进入后续业务路由。',
      },
    ],
  } satisfies Lesson;
