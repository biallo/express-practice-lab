import type { Lesson } from './types';

export const responseToolsLesson = {
    id: 'response-tools',
    number: '08',
    title: '响应工具与内容协商',
    level: '进阶',
    summary: '掌握 redirect、sendFile、download、format、vary 等响应工具，处理 JSON 之外的输出。',
    methods: [
      {
        title: '跳转与文件响应',
        detail:
          'res.redirect 用于跳转，res.sendFile 发送服务端文件，res.download 会提示浏览器下载。文件路径必须受控，不能直接拼接用户输入。',
      },
      {
        title: '内容协商',
        detail:
          'req.accepts 和 res.format 可以根据 Accept 头返回 JSON、HTML 或纯文本，让同一资源在不同客户端下有不同表达。协商失败时返回 406，比默默返回客户端不支持的格式更准确。',
      },
      {
        title: '缓存协商头',
        detail:
          'res.vary("Accept") 或 res.vary("Origin") 告诉缓存层响应会随请求头变化，避免缓存把错误版本发给其他客户端。',
      },
      {
        title: '附件与安全',
        detail:
          'res.attachment 和 res.download 会设置 Content-Disposition。下载文件前要先做权限检查，并把文件 ID 映射到服务器端已知路径，避免目录穿越。',
      },
    ],
    examples: [
      {
        title: '多格式响应与下载',
        language: 'js',
        code: `app.get('/reports/:id', async (req, res) => {
  const report = await loadReport(req.params.id);
  if (!report) return res.sendStatus(404);

  res.vary('Accept');

  res.format({
    // 同一个 report 资源，根据 Accept 返回不同表现形式。
    'application/json': () => res.json({ data: report }),
    'text/html': () => res.render('report', { report }),
    default: () => res.status(406).send('JSON or HTML required'),
  });
});

app.get('/reports/:id/download', (req, res) => {
  res.download(resolveReportPath(req.params.id), 'report.pdf');
});`,
      },
    ],
    review: [
      {
        question: 'res.sendFile 和 res.download 有什么区别？',
        answer: 'sendFile 直接发送文件内容；download 会设置下载相关头，让浏览器更倾向于保存为附件。',
      },
      {
        question: '什么时候需要 res.vary？',
        answer: '当响应内容会根据 Accept、Origin、Accept-Encoding 等请求头变化时，需要 Vary 防止缓存误复用。',
      },
      {
        question: '为什么文件响应不能直接使用用户传入路径？',
        answer: '用户路径可能造成目录穿越或读取敏感文件，必须映射到受控 ID 或固定目录。',
      },
      {
        question: '内容协商失败为什么适合返回 406？',
        answer: '406 表示服务端无法生成客户端 Accept 声明可接受的格式，比返回错误格式更容易让客户端定位问题。',
      },
      {
        question: '下载接口为什么也要做权限检查？',
        answer: '文件 URL 常被猜测或转发，下载前仍要确认当前用户是否能访问该文件。',
      },
    ],
  } satisfies Lesson;
