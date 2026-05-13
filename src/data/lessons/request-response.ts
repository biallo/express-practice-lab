import type { Lesson } from './types';

export const requestResponseLesson = {
    id: 'request-response',
    number: '05',
    title: '请求与响应对象',
    level: '核心',
    summary: '系统认识 req 和 res 上常用属性与方法，写出清晰的 HTTP 响应。',
    methods: [
      {
        title: '读取请求上下文',
        detail:
          'req.method、req.path、req.ip、req.get、req.params、req.query 和 req.body 是最常用的输入来源。',
      },
      {
        title: '返回 JSON',
        detail:
          'res.json 会设置 JSON 内容类型并序列化对象。API 项目中应优先返回结构稳定的 JSON。',
      },
      {
        title: '状态码先行',
        detail:
          '用 res.status(code).json(body) 明确表达结果。状态码是客户端判断成功、校验失败、未授权或服务错误的第一信号。',
      },
    ],
    examples: [
      {
        title: '统一响应形状',
        language: 'js',
        code: `app.get('/profile/:id', (req, res) => {
  const acceptsJson = req.accepts('json');

  if (!acceptsJson) {
    // 406 表示服务端不能生成客户端声明可接受的内容类型。
    return res.status(406).send('JSON only');
  }

  res
    .status(200)
    .set('Cache-Control', 'private, max-age=60')
    .json({ data: { id: req.params.id }, error: null });
});`,
      },
    ],
    review: [
      {
        question: 'res.json 相比 res.send({}) 有什么优势？',
        answer: 'res.json 更明确地表达返回 JSON，会设置合适内容类型并执行 JSON 序列化。',
      },
      {
        question: '为什么 API 响应形状要稳定？',
        answer: '客户端、测试和文档都依赖稳定结构，随意变化会增加兼容成本。',
      },
      {
        question: '状态码和响应体哪个更先被客户端使用？',
        answer: '通常先看状态码决定处理分支，再读取响应体展示细节或错误信息。',
      },
    ],
  } satisfies Lesson;
