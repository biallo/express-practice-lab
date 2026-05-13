import type { Lesson } from '../data/lessons';
import { CodeExample } from './CodeExample';

export function ExplainPanel({ lesson }: { lesson: Lesson }) {
  return (
    <section className="panel">
      <div className="section-head">
        <h2>核心讲解</h2>
      </div>

      <div className="method-list">
        {lesson.methods.map((method) => (
          <article className="method-card" key={method.title}>
            <h3>{method.title}</h3>
            <p>{method.detail}</p>
          </article>
        ))}
      </div>

      <div className="section-head code-head">
        <h2>示例代码</h2>
      </div>

      <div className="examples">
        {lesson.examples.map((example) => (
          <CodeExample example={example} key={example.title} />
        ))}
      </div>
    </section>
  );
}
