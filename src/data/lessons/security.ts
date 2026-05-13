import type { Lesson } from './types';

export const securityLesson = {
    id: 'security',
    number: '13',
    title: '安全基础',
    level: '生产',
    summary: '从请求大小、HTTP 头、认证授权和依赖更新几个方面建立安全基线。',
    methods: [
      {
        title: '限制输入',
        detail:
          '限制 body 大小、文件上传类型、字段长度和请求频率，能减少滥用和资源消耗。',
      },
      {
        title: '安全响应头',
        detail:
          '生产项目通常会使用 helmet 设置常见安全头，降低点击劫持、MIME 嗅探等风险。',
      },
      {
        title: '认证不等于授权',
        detail:
          '认证确认你是谁，授权确认你能做什么。每个敏感操作都应该检查权限，而不只是检查已登录。',
      },
    ],
    examples: [
      {
        title: '保护管理接口',
        language: 'js',
        code: `function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });

  if (req.user.role !== 'admin') {
    // 403 表示已认证，但没有权限执行该操作。
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
}

app.delete('/admin/users/:id', requireAdmin, async (req, res) => {
  await deleteUser(req.params.id);
  res.status(204).end();
});`,
      },
    ],
    review: [
      {
        question: '401 和 403 有什么区别？',
        answer: '401 表示未认证或认证无效；403 表示已经知道用户身份，但用户没有权限。',
      },
      {
        question: '为什么限制请求大小是安全措施？',
        answer: '超大请求会消耗内存和 CPU，可能造成服务不可用。',
      },
      {
        question: '认证通过后为什么还要授权？',
        answer: '登录用户不一定能执行所有操作，敏感动作必须检查角色、资源归属或策略。',
      },
    ],
  } satisfies Lesson;
