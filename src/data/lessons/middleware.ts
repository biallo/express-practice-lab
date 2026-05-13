import type { Lesson } from './types';

export const middlewareLesson = {
    id: 'middleware',
    number: '03',
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
          '一个中间件如果调用 res.send/res.json/res.end，就应该停止继续处理；否则可能出现重复响应。',
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
    ],
  } satisfies Lesson;
