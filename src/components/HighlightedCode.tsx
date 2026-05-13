import type { ReactNode } from 'react';

function highlightSegment(segment: string) {
  const tokenPattern =
    /(`(?:\\.|[^`])*`|'(?:\\.|[^'])*'|"(?:\\.|[^"])*"|\b(?:async|await|break|class|const|constructor|export|false|function|if|import|new|null|process|return|this|throw|true|try|catch|from|let|const|var)\b|\b\d+(?:\.\d+)?\b|[A-Za-z_$][\w$]*(?=\())/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(segment))) {
    if (match.index > lastIndex) {
      nodes.push(segment.slice(lastIndex, match.index));
    }

    const token = match[0];
    let className = 'token-function';

    if (/^['"`]/.test(token)) className = 'token-string';
    else if (/^\d/.test(token)) className = 'token-number';
    else if (/^(async|await|break|class|const|constructor|export|false|function|if|import|new|null|process|return|this|throw|true|try|catch|from|let|var)$/.test(token)) {
      className = 'token-keyword';
    }

    nodes.push(
      <span className={className} key={`${token}-${match.index}`}>
        {token}
      </span>,
    );
    lastIndex = match.index + token.length;
  }

  if (lastIndex < segment.length) {
    nodes.push(segment.slice(lastIndex));
  }

  return nodes;
}

export function HighlightedCode({ code }: { code: string }) {
  return (
    <>
      {code.split('\n').map((line, index) => {
        const commentIndex = line.indexOf('//');
        const beforeComment = commentIndex >= 0 ? line.slice(0, commentIndex) : line;
        const comment = commentIndex >= 0 ? line.slice(commentIndex) : '';

        return (
          <span className="code-line" key={`${index}-${line}`}>
            {highlightSegment(beforeComment)}
            {comment ? <span className="token-comment">{comment}</span> : null}
            {'\n'}
          </span>
        );
      })}
    </>
  );
}
