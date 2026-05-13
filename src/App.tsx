import { useMemo, useState } from 'react';
import { ExplainPanel, LessonHero, ReviewPanel, Sidebar, Tabs, type ActiveTab } from './components';
import { lessons } from './data/lessons';

const completedKey = 'express-practice-lab.completed';
const activeLessonKey = 'express-practice-lab.active-lesson';

function loadCompleted() {
  try {
    return new Set<string>(JSON.parse(localStorage.getItem(completedKey) || '[]'));
  } catch {
    return new Set<string>();
  }
}

function loadActiveLesson() {
  try {
    const stored = localStorage.getItem(activeLessonKey);
    return lessons.some((lesson) => lesson.id === stored) ? stored! : lessons[0].id;
  } catch {
    return lessons[0].id;
  }
}

export function App() {
  const [activeLessonId, setActiveLessonId] = useState(loadActiveLesson);
  const [activeTab, setActiveTab] = useState<ActiveTab>('explain');
  const [completedLessons, setCompletedLessons] = useState(loadCompleted);
  const activeLesson = useMemo(
    () => lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0],
    [activeLessonId],
  );
  const progress = Math.round((completedLessons.size / lessons.length) * 100);

  function selectLesson(lessonId: string) {
    setActiveLessonId(lessonId);
    setActiveTab('explain');
    localStorage.setItem(activeLessonKey, lessonId);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function completeLesson() {
    setCompletedLessons((current) => {
      const next = new Set(current);
      next.add(activeLessonId);
      localStorage.setItem(completedKey, JSON.stringify([...next]));
      return next;
    });
  }

  return (
    <div className="shell">
      <Sidebar
        activeLessonId={activeLessonId}
        completedLessons={completedLessons}
        progress={progress}
        onSelectLesson={selectLesson}
      />

      <main className="content">
        <LessonHero lesson={activeLesson} completed={completedLessons.has(activeLesson.id)} />
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'explain' ? (
          <ExplainPanel lesson={activeLesson} />
        ) : (
          <ReviewPanel
            lesson={activeLesson}
            completed={completedLessons.has(activeLesson.id)}
            onComplete={completeLesson}
          />
        )}
      </main>
    </div>
  );
}
