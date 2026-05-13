import type { Lesson } from '../data/lessons';

export function LessonHero({ lesson, completed }: { lesson: Lesson; completed: boolean }) {
  return (
    <header className="lesson-hero">
      <div>
        <p className="eyebrow">
          第 {lesson.number} 课 · {lesson.level}
        </p>
        <h1>{lesson.title}</h1>
        <p>{lesson.summary}</p>
      </div>
      <span className={`status-pill ${completed ? 'done' : ''}`}>{completed ? '已完成' : '学习中'}</span>
    </header>
  );
}
