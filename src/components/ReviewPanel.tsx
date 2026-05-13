import type { Lesson } from '../data/lessons';

export function ReviewPanel({
  lesson,
  completed,
  onComplete,
}: {
  lesson: Lesson;
  completed: boolean;
  onComplete: () => void;
}) {
  return (
    <section className="panel">
      <div className="section-head review-head">
        <h2>复盘问题</h2>
      </div>

      <div className="qa-list">
        {lesson.review.map((item, index) => (
          <details className="qa-card" key={item.question}>
            <summary>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.question}
            </summary>
            <div className="qa-answer">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>

      <div className="review-actions">
        <button
          className={`complete-button ${completed ? 'done' : ''}`}
          type="button"
          disabled={completed}
          onClick={onComplete}
        >
          {completed ? '已完成' : '标记完成'}
        </button>
      </div>
    </section>
  );
}
