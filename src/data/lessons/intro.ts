import type { Lesson } from './types';

export const introLesson = {
    id: 'intro',
    number: '01',
    title: '认识 Express',
    level: '入门',
    summary: '理解 Express 的定位、最小应用结构，以及它为什么适合构建 Web 应用和 HTTP API。',
    methods: [
      {
        title: 'Express 的定位',
        detail:
          'Express 是 Node.js 上的轻量 Web 框架。它不替你决定数据库、目录结构或模板方案，而是提供路由、中间件、请求响应封装等基础能力。',
      },
      {
        title: '应用对象 app',
        detail:
          '调用 express() 会得到一个 app。app 负责注册路由、挂载中间件、配置应用级设置，并最终交给 Node HTTP server 监听端口。',
      },
      {
        title: 'Express 5 的变化',
        detail:
          'Express 5 已成为当前主线，重要变化之一是异步 route handler 抛错或 rejected promise 会自动进入错误处理中间件。学习时要从一开始就按 Express 5 的错误模型写代码，避免把旧版本里大量手动 next(error) 的习惯带进新项目。',
      },
      {
        title: 'Express 不替你分层',
        detail:
          'Express 只处理 HTTP 层的组织方式。真实项目仍然需要你自己决定 routes、services、repositories、config、middlewares 等目录边界；框架越轻，团队越需要明确约定。',
      },
    ],
    examples: [
      {
        title: '最小 Express 应用',
        language: 'js',
        code: `import express from 'express';

const app = express();
const port = 3000;

// app.get 注册 GET / 路由，req 是请求对象，res 是响应对象。
app.get('/', (req, res) => {
  // send 可以发送字符串、Buffer 或对象；API 项目里更常用 res.json。
  res.send('Hello Express');
});

// listen 只负责启动本地 HTTP 服务，业务逻辑仍然写在 app 上。
app.listen(port, () => {
  console.log(\`Express app listening on http://localhost:\${port}\`);
});`,
      },
    ],
    review: [
      {
        question: 'Express 适合解决什么问题？',
        answer: '它适合快速构建 Web 应用和 HTTP API，核心能力是路由、中间件、请求响应处理和应用配置。',
      },
      {
        question: '为什么说 Express 是 unopinionated？',
        answer: '因为它不强制数据库、模板引擎、项目分层或认证方案，团队需要根据业务选择组合方式。',
      },
      {
        question: 'Express 5 对异步错误处理有什么改进？',
        answer: '异步 handler 中抛出的错误或 rejected promise 会自动传给错误处理中间件，不再必须手动 next(error)。',
      },
    ],
  } satisfies Lesson;
