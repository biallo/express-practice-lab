import type { Lesson } from './types';

export const middlewareLesson = {
    id: 'middleware',
    number: '04',
    title: '中间件模型',
    level: '核心',
    summary: '掌握 Express 最重要的抽象：请求如何沿着中间件链逐步处理。',
    methods: [
      {
        title: '中间件签名',
        detail:
          '普通中间件接收 req、res、next。它可以读取请求、改写对象、提前响应，或调用 next 交给下一个处理器。',
      },
      {
        title: '挂载范围',
        detail:
          'app.use(logger) 会影响所有后续路由，app.use("/api", middleware) 只影响 /api 前缀。范围越小，副作用越容易控制。',
      },
      {
        title: '结束请求',
        detail:
          '一个中间件如果调用 res.send/res.json/res.end，就应该停止继续处理；否则后续 handler 可能再次写响应，触发 headers already sent。常见写法是 return res.status(...).json(...)，用 return 明确结束当前函数。',
      },
      {
        title: '中间件是横切能力',
        detail:
          '日志、认证、限流、解析请求体、注入请求 ID 都适合中间件。业务规则不要全部塞进全局中间件，否则请求路径不清晰，也很难测试。',
      },
    ],
    examples: [
      {
        title: '请求日志中间件',
        language: 'js',
        code: `function requestLogger(req, res, next) {
  const startedAt = Date.now();

  res.on('finish', () => {
    // finish 事件能拿到最终状态码，适合记录完整请求结果。
    console.log(req.method, req.originalUrl, res.statusCode, Date.now() - startedAt);
  });

  next();
}

app.use(requestLogger);

app.get('/health', (req, res) => {
  // 这个路由会在 requestLogger 之后执行，响应完成后触发 finish 日志。
  res.json({ ok: true });
});`,
      },
    ],
    review: [
      {
        question: 'next 的作用是什么？',
        answer: '它把控制权交给下一个匹配的中间件或路由处理器。',
      },
      {
        question: '为什么中间件挂载顺序会影响行为？',
        answer: 'Express 按注册顺序执行，前面的中间件可以改写请求、提前响应或决定是否继续。',
      },
      {
        question: '中间件已经响应后还调用 next 有什么风险？',
        answer: '后续处理器可能再次写响应，导致 Cannot set headers after they are sent 之类的问题。',
      },
      {
        question: '为什么认证中间件通常挂在受保护路由前面？',
        answer: '它可以在业务 handler 前统一拒绝未认证请求，业务代码就不需要重复处理登录状态。',
      },
    ],
  } satisfies Lesson;
