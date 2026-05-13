import type { Lesson } from './types';

export const corsProxyLesson = {
    id: 'cors-proxy',
    number: '10',
    title: 'CORS 与代理部署',
    level: '部署',
    summary: '处理浏览器跨域请求，并正确理解反向代理后的协议、IP 和安全设置。',
    methods: [
      {
        title: 'CORS 是浏览器策略',
        detail:
          'CORS 限制的是浏览器脚本跨域读取响应。服务端之间的请求不受浏览器 CORS 策略影响。',
      },
      {
        title: '精确允许来源',
        detail:
          '生产环境不要无条件允许所有 origin，尤其是带 credentials 的接口。应按环境配置允许列表。',
      },
      {
        title: 'trust proxy',
        detail:
          '部署在 Nginx、负载均衡或平台代理后时，设置 trust proxy 可以让 req.ip、req.protocol 等读取代理头。',
      },
    ],
    examples: [
      {
        title: '手写受控 CORS',
        language: 'js',
        code: `const allowedOrigins = new Set(['https://example.com']);

app.set('trust proxy', 1);

app.use((req, res, next) => {
  const origin = req.get('origin');

  if (origin && allowedOrigins.has(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Vary', 'Origin');
  }

  next();
});`,
      },
    ],
    review: [
      {
        question: 'CORS 是谁执行的？',
        answer: '主要由浏览器执行。服务端返回 CORS 头，浏览器据此决定前端脚本能否读取响应。',
      },
      {
        question: '为什么动态 origin 要设置 Vary: Origin？',
        answer: '告诉缓存层响应会随 Origin 变化，避免把一个来源的允许结果错误复用给另一个来源。',
      },
      {
        question: 'trust proxy 配错可能带来什么问题？',
        answer: '可能导致 IP、协议、安全 Cookie 判断、限流和日志不准确，甚至被伪造代理头影响。',
      },
    ],
  } satisfies Lesson;
