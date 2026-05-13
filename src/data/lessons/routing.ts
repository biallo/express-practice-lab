import type { Lesson } from './types';

export const routingLesson = {
    id: 'routing',
    number: '02',
    title: '路由与 HTTP 方法',
    level: '基础',
    summary: '学习如何用 HTTP 方法、路径参数和查询字符串表达资源操作。',
    methods: [
      {
        title: '方法决定语义',
        detail:
          'GET 通常读取资源，POST 创建资源，PUT/PATCH 更新资源，DELETE 删除资源。Express 用 app.get、app.post 等方法对应这些语义。',
      },
      {
        title: '路径参数',
        detail:
          '路径中的 :id 会进入 req.params，适合表达资源身份。例如 /users/:id 表示某一个用户。',
      },
      {
        title: '查询字符串',
        detail:
          'req.query 用来读取 ?page=1&keyword=node 这类筛选、分页、排序条件。它不应该承载必须存在的资源身份。',
      },
    ],
    examples: [
      {
        title: '资源风格路由',
        language: 'js',
        code: `app.get('/courses', (req, res) => {
  const page = Number(req.query.page ?? 1);
  res.json({ page, items: [] });
});

app.get('/courses/:courseId', (req, res) => {
  // route param 来自路径，适合表达资源 ID。
  const { courseId } = req.params;
  res.json({ id: courseId, title: 'Express Routing' });
});

app.post('/courses', (req, res) => {
  // 创建成功时常用 201，并返回新资源的核心信息。
  res.status(201).json({ id: 'new-course' });
});`,
      },
    ],
    review: [
      {
        question: 'req.params 和 req.query 的职责有什么区别？',
        answer: 'params 表达路径中必须的资源身份；query 表达分页、排序、筛选等可选条件。',
      },
      {
        question: '创建资源时为什么常返回 201？',
        answer: '201 Created 明确告诉客户端资源已经被创建，比 200 更准确。',
      },
      {
        question: '路由顺序为什么重要？',
        answer: 'Express 按注册顺序匹配路由，过于宽泛的路由放前面可能抢先处理请求。',
      },
    ],
  } satisfies Lesson;
