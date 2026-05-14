import type { Lesson } from './types';

export const testingLesson = {
    id: 'testing',
    number: '19',
    title: '测试 Express API',
    level: '工程',
    summary: '用 supertest 验证路由、错误处理和中间件行为，并通过 app/server 分离提升可测试性。',
    methods: [
      {
        title: 'app 与 server 分离',
        detail:
          '测试时应导出 app，而不是在测试中启动真实监听端口。入口文件负责 app.listen，测试文件直接把 app 交给 supertest，这样测试不依赖端口，也更容易并行运行。',
      },
      {
        title: 'supertest 是什么',
        detail:
          'supertest 是 Node.js 里常用的 HTTP 接口测试库，特别适合测试 Express API。它可以直接接收 Express app，模拟 GET、POST 等请求，并断言状态码、响应头和响应体。',
      },
      {
        title: '覆盖关键分支',
        detail:
          'API 测试应覆盖成功响应、输入校验失败、未认证、未授权、404 和错误处理中间件，避免只测 happy path。',
      },
      {
        title: '隔离外部依赖',
        detail:
          '数据库、邮件、第三方 API 应使用测试数据库、事务回滚或 mock，避免测试污染真实数据或依赖网络稳定性。',
      },
      {
        title: '断言响应契约',
        detail:
          '测试不要只断言状态码，还要断言关键响应体、Content-Type、错误结构和副作用。这样才能在重构时保护 API 契约。',
      },
    ],
    examples: [
      {
        title: '用 supertest 测路由',
        language: 'js',
        code: `// app.js
import express from 'express';

export const app = express();
app.use(express.json());
app.get('/healthz', (req, res) => res.json({ ok: true }));

// server.js
import { app } from './app.js';
app.listen(process.env.PORT ?? 3000);

// app.test.js
import request from 'supertest';
import { app } from './app.js';

test('GET /healthz returns ok', async () => {
  await request(app)
    .get('/healthz')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect({ ok: true });
});`,
      },
    ],
    review: [
      {
        question: '为什么测试里不直接 app.listen？',
        answer: '直接监听端口会引入端口冲突和生命周期管理问题；supertest 可以直接驱动 app。',
      },
      {
        question: 'Express API 测试应该优先覆盖哪些失败路径？',
        answer: '优先覆盖输入校验失败、认证授权失败、资源不存在和错误中间件，保证客户端能收到稳定错误。',
      },
      {
        question: '测试为什么要隔离数据库和外部服务？',
        answer: '隔离能让测试可重复、可并行，也避免污染真实数据或被网络和第三方状态影响。',
      },
      {
        question: '为什么不能只断言 200 状态码？',
        answer: '状态码只能说明请求成功，不能保证响应结构、字段含义和内容类型仍符合客户端契约。',
      },
      {
        question: 'app/server 分离对部署有没有影响？',
        answer: '没有。部署入口仍然 app.listen；测试和复用场景只导入 app，不启动真实端口。',
      },
    ],
  } satisfies Lesson;
