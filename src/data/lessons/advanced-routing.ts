import type { Lesson } from './types';

export const advancedRoutingLesson = {
    id: 'advanced-routing',
    number: '03',
    title: '高级路由与参数预处理',
    level: '进阶',
    summary: '学习 app.all、route 链式写法、参数预处理和条件跳过，让复杂路由更清晰。',
    methods: [
      {
        title: '覆盖所有方法',
        detail:
          'app.all(path, middleware) 会匹配指定路径的所有 HTTP 方法，适合做认证、审计或统一入口检查，但不要把业务语义藏在 all 中。',
      },
      {
        title: '链式定义同一路径',
        detail:
          'app.route("/users/:id") 或 router.route("/users/:id") 可以把同一路径的 GET、PATCH、DELETE 聚合在一起，减少路径重复。',
      },
      {
        title: '参数预处理',
        detail:
          'app.param 或 router.param 可以在进入具体 handler 前加载资源、校验 ID 或挂载 req.course。参数处理失败时应直接 next(error) 或返回 404。',
      },
      {
        title: '条件跳过',
        detail:
          'next("route") 可以跳过当前 route 剩余 handler，进入后续匹配路由。它适合做条件分流，例如公开资源直接走公开 handler，私有资源继续走认证链。',
      },
      {
        title: 'Router 选项',
        detail:
          'mergeParams 用于子 router 读取父 router 的路径参数；strict 会区分尾部斜杠；caseSensitive 会区分大小写。默认值更宽松，生产 API 如果需要强约束要显式配置。',
      },
    ],
    examples: [
      {
        title: '复用路径与加载参数',
        language: 'js',
        code: `router.param('courseId', async (req, res, next, courseId) => {
  const course = await coursesService.findById(courseId);
  if (!course) return res.status(404).json({ error: 'Course not found' });

  req.course = course;
  next();
});

router.all('/courses/:courseId', requireAuth);

router
  .route('/courses/:courseId')
  .get((req, res) => {
    res.json({ data: req.course });
  })
  .patch(validateCoursePatch, async (req, res) => {
    const updated = await coursesService.update(req.course.id, req.body);
    res.json({ data: updated });
  });`,
      },
    ],
    review: [
      {
        question: 'app.all 适合放什么逻辑？',
        answer: '适合放某个路径下所有方法都需要的横切逻辑，如认证、权限预检或审计，不适合承载具体业务语义。',
      },
      {
        question: 'route 链式写法解决什么问题？',
        answer: '它把同一路径的不同 HTTP 方法集中管理，减少重复路径字符串，也更容易看出一个资源支持哪些操作。',
      },
      {
        question: 'param 预处理有什么风险？',
        answer: '如果预处理做了过重查询或副作用，会让每个匹配请求变慢；应保持职责明确，只做必要加载和校验。',
      },
      {
        question: 'next("route") 和 next() 有什么区别？',
        answer: 'next() 进入当前路由链的下一个 handler；next("route") 会跳过当前 route 的剩余 handler，继续寻找后续匹配路由。',
      },
      {
        question: '什么时候需要 Router({ mergeParams: true })？',
        answer: '当子 router 需要读取父路径上的参数时需要开启，例如 /teams/:teamId/projects 挂载的 projectsRouter 需要 teamId。',
      },
    ],
  } satisfies Lesson;
