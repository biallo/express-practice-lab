import type { Lesson } from './types';

export const errorsLesson = {
    id: 'errors',
    number: '07',
    title: '错误处理',
    level: '核心',
    summary: '建立统一错误出口，区分业务错误、输入错误和未知异常。',
    methods: [
      {
        title: '错误中间件签名',
        detail:
          '错误处理中间件有四个参数：err、req、res、next。参数数量是 Express 识别它的关键。',
      },
      {
        title: '异步错误',
        detail:
          'Express 5 会把 async handler 中抛出的错误自动转交给错误中间件，因此可以直接 throw。',
      },
      {
        title: '错误响应',
        detail:
          '对外响应应稳定且克制。生产环境不要把 stack trace 暴露给用户，只返回可行动的错误信息和请求 ID。',
      },
    ],
    examples: [
      {
        title: '统一错误处理',
        language: 'js',
        code: `class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

app.get('/courses/:id', async (req, res) => {
  const course = await findCourse(req.params.id);
  if (!course) throw new HttpError(404, 'Course not found');
  res.json({ data: course });
});

app.use((err, req, res, next) => {
  // 错误中间件集中决定状态码和响应格式。
  const status = err.status ?? 500;
  res.status(status).json({ error: { message: err.message } });
});`,
      },
    ],
    review: [
      {
        question: '错误处理中间件为什么必须有四个参数？',
        answer: 'Express 通过函数参数数量识别错误中间件，签名必须是 err, req, res, next。',
      },
      {
        question: '404 和 500 的含义有什么区别？',
        answer: '404 表示请求资源不存在；500 表示服务端出现未预期错误。',
      },
      {
        question: '生产环境为什么不能直接返回 err.stack？',
        answer: 'stack 可能泄露路径、依赖、内部结构和敏感上下文，应该只记录在服务端日志中。',
      },
    ],
  } satisfies Lesson;
