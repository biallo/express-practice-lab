import type { Example } from '../data/lessons';
import { HighlightedCode } from './HighlightedCode';

export function CodeExample({ example }: { example: Example }) {
  return (
    <article className="code-card">
      <div className="code-title">
        <span>{example.title}</span>
        <small>{example.language}</small>
      </div>
      <pre>
        <code>
          <HighlightedCode code={example.code} />
        </code>
      </pre>
    </article>
  );
}
