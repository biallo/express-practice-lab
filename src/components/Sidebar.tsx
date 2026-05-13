import { useLayoutEffect, useRef } from 'react';
import { lessons } from '../data/lessons';
import { CheckIcon } from './icons';

const brandIconSrc = `${import.meta.env.BASE_URL}icons/icon-192.png`;

export function Sidebar({
  activeLessonId,
  completedLessons,
  progress,
  onSelectLesson,
}: {
  activeLessonId: string;
  completedLessons: Set<string>;
  progress: number;
  onSelectLesson: (lessonId: string) => void;
}) {
  const courseListRef = useRef<HTMLElement>(null);
  const activeCourseRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const courseList = courseListRef.current;
    const activeCourse = activeCourseRef.current;

    if (!courseList || !activeCourse || courseList.offsetParent === null) return;

    const listRect = courseList.getBoundingClientRect();
    const activeRect = activeCourse.getBoundingClientRect();
    const isVisible = activeRect.top >= listRect.top && activeRect.bottom <= listRect.bottom;

    if (!isVisible) {
      activeCourse.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  }, [activeLessonId]);

  return (
    <aside className="sidebar">
      <div className="sidebar-fixed">
        <div className="brand">
          <img src={brandIconSrc} alt="" />
          <div>
            <span>Express Practice Lab</span>
            <strong>Express 5.2.1</strong>
          </div>
        </div>

        <div className="progress-panel" aria-label="学习进度">
          <div className="progress-row">
            <span>完成进度</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <label className="mobile-lesson-picker">
          <span>选择课程</span>
          <select value={activeLessonId} onChange={(event) => onSelectLesson(event.target.value)}>
            {lessons.map((lesson) => (
              <option value={lesson.id} key={lesson.id}>
                {lesson.number}. {lesson.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <nav className="course-list" aria-label="课程列表" ref={courseListRef}>
        {lessons.map((lesson) => {
          const isSelected = lesson.id === activeLessonId;
          const isDone = completedLessons.has(lesson.id);

          return (
            <button
              className={`course-item ${isSelected ? 'selected' : ''}`}
              key={lesson.id}
              ref={isSelected ? activeCourseRef : null}
              onClick={() => onSelectLesson(lesson.id)}
              type="button"
            >
              <span className="course-number">{lesson.number}</span>
              <span className="course-meta">
                <span className="course-title">{lesson.title}</span>
                <span>{lesson.level}</span>
              </span>
              <span className={`course-check ${isDone ? 'done' : ''}`} aria-label={isDone ? '已完成' : '未完成'}>
                {isDone ? <CheckIcon /> : null}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
