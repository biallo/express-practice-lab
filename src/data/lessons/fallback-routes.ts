import type { Lesson } from './types';

export const fallbackRoutesLesson = {
    id: 'fallback-routes',
    number: '11',
    title: '404、405 与路由兜底',
    level: '工程',
    summary: '区分未匹配路径、方法不允许和前端路由 fallback，避免把所有请求都吞成同一种响应。',
    methods: [
      {
        title: '404 兜底',
        detail:
          'Express 没有匹配到任何路由时会继续向后走。通常在所有业务路由之后放一个 404 中间件，统一返回 Not Found。',
      },
      {
        title: '方法不允许',
        detail:
          '路径存在但 HTTP 方法不支持时，返回 405 比 404 更准确。可以在 route 链最后用 all 捕获未支持方法。',
      },
      {
        title: 'SPA fallback 边界',
        detail:
          '前端单页应用 fallback 应只服务页面路径，不应该吞掉 /api 的 404，否则客户端会收到 HTML 而不是 API 错误。',
      },
      {
        title: '兜底也要有格式',
        detail:
          'API 兜底应该返回和正常 API 一致的错误结构，例如 { error: { message } }。格式稳定能让客户端统一处理错误，而不是为 404 单独写特殊逻辑。',
      },
    ],
    examples: [
      {
        title: 'API 兜底与方法限制',
        language: 'js',
        code: `app
  .route('/api/courses/:id')
  .get(getCourse)
  .patch(updateCourse)
  .all((req, res) => {
    res.set('Allow', 'GET, PATCH');
    res.status(405).json({ error: 'Method not allowed' });
  });

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

app.get('*', (req, res) => {
  res.sendFile(resolveClientFile('index.html'));
});`,
      },
    ],
    review: [
      {
        question: '404 兜底为什么要放在业务路由之后？',
        answer: 'Express 按注册顺序匹配，兜底放太早会抢先响应，后面的业务路由永远到不了。',
      },
      {
        question: '405 和 404 的差异是什么？',
        answer: '404 表示路径不存在；405 表示路径存在，但当前 HTTP 方法不被允许。',
      },
      {
        question: '为什么 SPA fallback 不能覆盖 /api？',
        answer: 'API 客户端期待 JSON 错误，若被 fallback 成 HTML，会破坏错误处理和调试体验。',
      },
      {
        question: '405 响应为什么建议设置 Allow 头？',
        answer: 'Allow 头能明确告诉客户端当前资源支持哪些方法，方便客户端修正请求。',
      },
      {
        question: 'API 404 为什么也要保持统一响应结构？',
        answer: '统一结构能让前端、SDK 和测试用同一套错误处理逻辑，不需要为兜底错误写特例。',
      },
    ],
  } satisfies Lesson;
