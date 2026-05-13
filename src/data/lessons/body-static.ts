import type { Lesson } from './types';

export const bodyStaticLesson = {
    id: 'body-static',
    number: '04',
    title: '内置中间件',
    level: '基础',
    summary: '使用 express.json、express.urlencoded 和 express.static 处理常见输入与静态资源。',
    methods: [
      {
        title: 'JSON 请求体',
        detail:
          'express.json() 解析 application/json 请求体，并把结果放到 req.body。应设置合理 limit，避免过大的请求消耗内存。',
      },
      {
        title: '表单请求体',
        detail:
          'express.urlencoded() 解析传统 HTML form。extended: false 使用 Node 内置 querystring，适合简单表单。',
      },
      {
        title: '静态文件',
        detail:
          'express.static() 把目录映射成静态资源服务，常用于公开图片、CSS、下载文件或前端构建产物。',
      },
    ],
    examples: [
      {
        title: '解析请求体与公开资源',
        language: 'js',
        code: `app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

// /assets/logo.png 会读取 public/logo.png。
app.use('/assets', express.static('public', {
  maxAge: '1d',
}));

app.post('/feedback', (req, res) => {
  const { message } = req.body;
  res.status(201).json({ received: Boolean(message) });
});`,
      },
    ],
    review: [
      {
        question: 'express.json 必须放在哪里？',
        answer: '它要放在需要读取 req.body 的路由之前，否则这些路由拿不到解析后的 body。',
      },
      {
        question: '为什么请求体解析要设置 limit？',
        answer: '避免超大 payload 占用内存，降低拒绝服务风险。',
      },
      {
        question: 'express.static 适合放敏感文件吗？',
        answer: '不适合。挂载目录中的文件会被公开访问，不能放密钥、环境变量或内部文档。',
      },
    ],
  } satisfies Lesson;
