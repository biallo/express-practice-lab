import type { Lesson } from './types';

export const routerLesson = {
    id: 'router',
    number: '09',
    title: 'Router 与模块化路由',
    level: '工程',
    summary: '用 express.Router 拆分业务模块，避免所有路由挤在入口文件中。',
    methods: [
      {
        title: 'Router 是迷你 app',
        detail:
          'Router 可以注册中间件和路由，再挂载到 app 上。它让课程、用户、订单等模块拥有独立路由文件。',
      },
      {
        title: '前缀挂载',
        detail:
          'app.use("/api/courses", coursesRouter) 后，router 内部只需要写 "/" 和 "/:id"，减少重复路径。',
      },
      {
        title: '模块边界',
        detail:
          '路由文件应专注 HTTP 层，复杂业务逻辑放到 service 中，数据库访问放到 repository 或 model 层。这样路由负责状态码和输入输出转换，业务层负责规则，数据层负责持久化。',
      },
      {
        title: '局部中间件',
        detail:
          'Router 可以拥有自己的 use 链。认证、校验、日志等能力挂在特定 router 上，可以让作用范围和业务模块保持一致。',
      },
    ],
    examples: [
      {
        title: '拆分课程路由',
        language: 'js',
        code: `import { Router } from 'express';

export const coursesRouter = Router();

coursesRouter.use(requireAuth);

coursesRouter.get('/', async (req, res) => {
  res.json({ data: [] });
});

coursesRouter.get('/:courseId', async (req, res) => {
  // router 内路径会拼接 app.use 中的 /api/courses 前缀。
  res.json({ data: { id: req.params.courseId } });
});

app.use('/api/courses', coursesRouter);`,
      },
    ],
    review: [
      {
        question: 'Router 解决了什么工程问题？',
        answer: '它把不同业务模块的路由拆开，降低入口文件复杂度，也让中间件范围更清晰。',
      },
      {
        question: 'app.use("/api/users", usersRouter) 后 router 内部怎么写列表路径？',
        answer: '写 "/" 即可，最终完整路径是 /api/users。',
      },
      {
        question: '为什么路由层不应塞满业务逻辑？',
        answer: '路由层负责 HTTP 适配，业务逻辑混在其中会难测试、难复用、难维护。',
      },
      {
        question: 'Router 上的 use 和 app.use 有什么关系？',
        answer: 'Router 自己也是中间件容器。router.use 只影响进入该 router 的请求，app.use 则决定 router 挂载到应用的路径和顺序。',
      },
    ],
  } satisfies Lesson;
