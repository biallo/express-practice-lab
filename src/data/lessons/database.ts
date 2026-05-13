import type { Lesson } from './types';

export const databaseLesson = {
    id: 'database',
    number: '12',
    title: '数据库集成',
    level: '实践',
    summary: '把数据库访问从路由中拆出去，处理连接、异步错误和事务边界。',
    methods: [
      {
        title: '连接复用',
        detail:
          '数据库客户端通常应在应用启动时创建并复用，避免每个请求都新建连接。',
      },
      {
        title: '服务层隔离',
        detail:
          '路由层处理 HTTP，服务层处理业务规则，数据访问层处理 SQL/ORM。分层能让测试和替换实现更简单。',
      },
      {
        title: '事务边界',
        detail:
          '多个写操作必须一起成功或失败时，需要事务。不要把跨多表写入散落在多个互不知情的函数中。',
      },
    ],
    examples: [
      {
        title: '路由调用服务层',
        language: 'js',
        code: `app.post('/orders', async (req, res) => {
  const order = await ordersService.createOrder({
    userId: req.user.id,
    items: req.body.items,
  });

  // 路由层只负责把业务结果翻译成 HTTP 响应。
  res.status(201).json({ data: order });
});

const ordersService = {
  async createOrder(input) {
    return database.transaction(async (tx) => {
      const order = await tx.orders.create(input);
      await tx.inventory.reserve(input.items);
      return order;
    });
  },
};`,
      },
    ],
    review: [
      {
        question: '为什么不建议每个请求都创建数据库连接？',
        answer: '连接创建成本高，也容易耗尽数据库连接池。应用应复用客户端或连接池。',
      },
      {
        question: '事务解决什么问题？',
        answer: '事务保证一组相关写操作要么全部成功，要么全部回滚，避免数据处于半完成状态。',
      },
      {
        question: '服务层隔离的主要收益是什么？',
        answer: '业务逻辑更容易测试、复用和维护，路由层不会被数据库细节污染。',
      },
    ],
  } satisfies Lesson;
