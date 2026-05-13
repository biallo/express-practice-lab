import type { Lesson } from './types';

export const validationLesson = {
    id: 'validation',
    number: '12',
    title: '输入校验',
    level: '实践',
    summary: '在请求进入业务逻辑之前校验 body、params 和 query，降低脏数据和安全风险。',
    methods: [
      {
        title: '信任边界',
        detail:
          '所有来自客户端的数据都不可信。即使前端已经校验，后端仍必须校验类型、长度、枚举值和权限边界。',
      },
      {
        title: '校验位置',
        detail:
          '常见做法是在路由处理器前挂载校验中间件，失败时直接返回 400，成功时把清洗后的数据交给业务层。',
      },
      {
        title: '错误可读性',
        detail:
          '校验错误应告诉客户端哪个字段不合法，以及如何修复。不要只返回 Validation failed，否则客户端无法把错误精确展示到表单字段上。',
      },
      {
        title: '校验和清洗分开理解',
        detail:
          '校验回答“这个输入能不能接受”，清洗回答“接受后以什么标准形状进入业务层”。trim、类型转换、默认值填充都属于清洗。',
      },
    ],
    examples: [
      {
        title: '轻量校验中间件',
        language: 'js',
        code: `function validateCourse(req, res, next) {
  const { title } = req.body;

  if (typeof title !== 'string' || title.trim().length < 3) {
    // 400 表示客户端输入不符合接口约定。
    return res.status(400).json({
      error: { field: 'title', message: 'Title must be at least 3 characters' },
    });
  }

  // 从这里开始，业务层可以假设 title 是清洗过的字符串。
  req.body.title = title.trim();
  next();
}

app.post('/courses', validateCourse, (req, res) => {
  res.status(201).json({ data: { title: req.body.title } });
});`,
      },
    ],
    review: [
      {
        question: '为什么后端不能依赖前端校验？',
        answer: '客户端可以被绕过，请求可以直接构造，后端才是保护数据一致性和安全的边界。',
      },
      {
        question: '校验失败通常返回什么状态码？',
        answer: '通常返回 400 Bad Request；如果语义更细，也可能使用 422。',
      },
      {
        question: '清洗数据有什么价值？',
        answer: '清洗后的数据形状更稳定，业务层可以少处理空格、类型转换和非法值。',
      },
      {
        question: '为什么错误信息要指出具体字段？',
        answer: '具体字段能帮助客户端把错误展示到正确控件，也能减少调用方反复试错。',
      },
    ],
  } satisfies Lesson;
