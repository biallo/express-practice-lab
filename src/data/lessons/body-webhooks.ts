import type { Lesson } from './types';

export const bodyWebhooksLesson = {
    id: 'body-webhooks',
    number: '06',
    title: '请求体边界与 Webhook',
    level: '实践',
    summary: '理解 raw、text、verify 和 req.is，在签名校验与特殊内容类型场景中正确读取请求体。',
    methods: [
      {
        title: 'raw body 场景',
        detail:
          'Webhook 签名通常基于原始字节计算。此时不能先把 body 解析成对象，否则序列化差异会导致签名验证失败。',
      },
      {
        title: '按内容类型选择解析器',
        detail:
          'express.raw、express.text、express.json 和 express.urlencoded 都只处理匹配 type 的请求。路由级挂载能避免多个解析器互相干扰。',
      },
      {
        title: 'verify 钩子',
        detail:
          'express.json({ verify }) 可以在 JSON 解析前拿到原始 Buffer，适合少数需要同时保留 raw body 和 JSON body 的接口。',
      },
      {
        title: '签名校验的顺序',
        detail:
          'Webhook 应先验证签名，再信任事件内容。签名失败时不要解析业务字段、不要执行副作用；签名通过后再根据事件类型做幂等处理。',
      },
    ],
    examples: [
      {
        title: 'Webhook 签名校验',
        language: 'js',
        code: `app.post('/webhooks/github', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.get('x-hub-signature-256');

  // 签名要基于 req.body 这个原始 Buffer，而不是 JSON.parse 后的对象。
  if (!verifyWebhookSignature(req.body, signature)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const event = JSON.parse(req.body.toString('utf8'));
  res.status(202).json({ accepted: event.action });
});

app.post('/api/courses', express.json({ limit: '1mb' }), (req, res) => {
  if (!req.is('application/json')) return res.status(415).end();
  res.status(201).json({ data: req.body });
});`,
      },
    ],
    review: [
      {
        question: '为什么 Webhook 常用 express.raw？',
        answer: '因为签名通常针对原始请求字节计算，先解析成对象再计算会改变内容表示，导致合法请求验证失败。',
      },
      {
        question: '多个 body parser 为什么要谨慎叠加？',
        answer: '请求体流只能可靠消费一次，解析器顺序和 type 匹配不当可能导致 req.body 形状不符合预期。',
      },
      {
        question: 'req.is 的作用是什么？',
        answer: '它根据 Content-Type 判断请求是否匹配指定媒体类型，常用于拒绝不支持的输入格式。',
      },
      {
        question: '签名验证失败时为什么不继续解析事件？',
        answer: '签名失败说明请求来源或内容不可信，继续解析和执行业务逻辑会扩大攻击面。',
      },
      {
        question: 'Webhook handler 为什么通常还要做幂等？',
        answer: '第三方平台可能重试同一事件，服务端需要按事件 ID 去重，避免重复创建订单或重复发放权益。',
      },
    ],
  } satisfies Lesson;
