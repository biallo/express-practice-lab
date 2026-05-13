import type { Lesson } from './types';

export const cookiesSessionsLesson = {
    id: 'cookies-sessions',
    number: '13',
    title: 'Cookie、Session 与认证入口',
    level: '实践',
    summary: '理解 Express 中常见登录状态保存方式，以及 Cookie 安全属性的意义。',
    methods: [
      {
        title: 'Cookie 保存状态标识',
        detail:
          'Cookie 会随同域请求自动发送，适合保存 session id 或短小状态。敏感数据不应明文放在 Cookie 中。',
      },
      {
        title: 'Session 放服务端',
        detail:
          'Session 通常只把 ID 放在 Cookie，真实登录状态放服务端存储，如 Redis。这样更容易吊销和更新权限。',
      },
      {
        title: '安全属性',
        detail:
          'httpOnly 降低 XSS 读取风险，secure 要求 HTTPS，sameSite 降低跨站请求风险，maxAge 控制过期时间。这些属性不是互相替代，而是共同组成 Cookie 的基本安全边界。',
      },
      {
        title: '认证和会话生命周期',
        detail:
          '登录、刷新、退出、密码修改和权限变化都会影响会话。服务端 Session 的优势是可以主动吊销，而纯客户端令牌通常需要额外黑名单或短过期策略。',
      },
    ],
    examples: [
      {
        title: '设置安全 Cookie',
        language: 'js',
        code: `app.post('/login', async (req, res) => {
  const sessionId = await createSession(req.body.email);

  res.cookie('sid', sessionId, {
    // httpOnly 防止前端脚本直接读取 sid；secure 在 HTTPS 下才发送。
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.json({ ok: true });
});`,
      },
    ],
    review: [
      {
        question: '为什么不把用户权限明文放进 Cookie？',
        answer: 'Cookie 在客户端可控，明文权限容易被篡改或泄露，应只保存不可猜测的会话标识或签名令牌。',
      },
      {
        question: 'httpOnly 解决什么风险？',
        answer: '它让浏览器脚本不能直接读取 Cookie，降低 XSS 窃取会话的风险。',
      },
      {
        question: 'Session 相比纯 Cookie 状态有什么优势？',
        answer: '服务端可主动吊销、更新和审计登录状态，适合权限变化较多的系统。',
      },
      {
        question: 'sameSite 主要缓解什么问题？',
        answer: 'sameSite 可以减少浏览器在跨站请求中自动携带 Cookie 的情况，从而降低 CSRF 风险。',
      },
      {
        question: '退出登录时服务端应该做什么？',
        answer: '不仅要清除浏览器 Cookie，还应该让服务端 Session 失效，避免旧 session id 继续可用。',
      },
    ],
  } satisfies Lesson;
