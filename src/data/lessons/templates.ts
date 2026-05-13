import type { Lesson } from './types';

export const templatesLesson = {
    id: 'templates',
    number: '11',
    title: '模板引擎与服务端渲染',
    level: '扩展',
    summary: '了解 Express 如何渲染 HTML 页面，以及它和纯 API 服务的差异。',
    methods: [
      {
        title: 'view engine',
        detail:
          'app.set("view engine", "pug") 等配置会告诉 Express 使用哪个模板引擎渲染视图。',
      },
      {
        title: 'res.render',
        detail:
          'res.render(view, data) 会把模板和数据合成 HTML 响应，适合后台页面、传统网站或邮件预览等场景。',
      },
      {
        title: 'API 与页面分工',
        detail:
          '现代项目常让 Express 做 API，让 Vite/React 做前端。服务端渲染仍适合需要少量页面且交互不复杂的场景。',
      },
    ],
    examples: [
      {
        title: '渲染服务端页面',
        language: 'js',
        code: `app.set('views', './views');
app.set('view engine', 'pug');

app.get('/admin', async (req, res) => {
  const stats = await loadDashboardStats();

  // res.render 返回 HTML，不是 JSON。
  res.render('admin-dashboard', {
    title: 'Admin',
    stats,
  });
});`,
      },
    ],
    review: [
      {
        question: 'res.render 和 res.json 的输出有什么区别？',
        answer: 'res.render 输出 HTML 页面；res.json 输出 JSON 数据。',
      },
      {
        question: '模板引擎适合哪些 Express 项目？',
        answer: '适合传统多页网站、后台管理、邮件模板预览或交互较少的服务端页面。',
      },
      {
        question: '现代前后端分离项目中 Express 常扮演什么角色？',
        answer: '常作为 API 服务，负责认证、业务逻辑、数据库访问和外部系统集成。',
      },
    ],
  } satisfies Lesson;
