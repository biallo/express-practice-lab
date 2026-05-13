import type { Lesson } from './types';

export const productionLesson = {
    id: 'production',
    number: '20',
    title: '生产运行与可观测性',
    level: '生产',
    summary: '学习健康检查、日志、优雅关闭和进程管理，让 Express 服务更适合上线。',
    methods: [
      {
        title: '健康检查',
        detail:
          '健康检查接口让负载均衡、容器平台和监控系统判断服务是否可接收请求。基础健康检查要快、稳定、少依赖；深度依赖检查可以单独提供给监控系统。',
      },
      {
        title: '结构化日志',
        detail:
          '生产日志应包含时间、级别、请求 ID、路径、状态码和耗时，方便搜索、聚合和告警。',
      },
      {
        title: '优雅关闭',
        detail:
          '收到 SIGTERM 时应停止接收新请求，等待已有请求完成，再关闭数据库连接和进程。',
      },
      {
        title: '进程管理',
        detail:
          '生产环境通常由 systemd、PM2、Docker、Kubernetes 或平台运行时负责重启和日志采集。应用自身应正确处理信号，而不是假设进程永远不退出。',
      },
    ],
    examples: [
      {
        title: '健康检查与优雅关闭',
        language: 'js',
        code: `const server = app.listen(process.env.PORT ?? 3000);

app.get('/healthz', (req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

process.on('SIGTERM', () => {
  // 容器平台停止服务时通常发送 SIGTERM。
  server.close(async () => {
    // close 停止接收新连接，回调在已有连接结束后执行。
    await database.disconnect();
    process.exit(0);
  });
});`,
      },
    ],
    review: [
      {
        question: '健康检查接口应该做得多复杂？',
        answer: '基础检查应快速稳定；深度依赖检查可以单独做，避免健康检查本身拖垮服务。',
      },
      {
        question: '为什么生产日志要结构化？',
        answer: '结构化日志容易被日志平台解析、检索和聚合，比自由文本更适合排查线上问题。',
      },
      {
        question: '优雅关闭解决什么问题？',
        answer: '它减少部署或扩缩容时的请求中断，并确保数据库连接等资源被正确释放。',
      },
      {
        question: '为什么健康检查不应该每次都做昂贵查询？',
        answer: '健康检查频率高，昂贵依赖检查可能放大故障或拖慢服务，应把轻量存活检查和深度检查分开。',
      },
      {
        question: '结构化日志里为什么需要请求 ID？',
        answer: '请求 ID 能把同一次请求经过的多条日志串起来，排查跨中间件、服务层和数据库调用的问题。',
      },
    ],
  } satisfies Lesson;
