import { BookIcon, MessageIcon } from './icons';

export type ActiveTab = 'explain' | 'review';

export function Tabs({
  activeTab,
  onTabChange,
}: {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}) {
  return (
    <div className="tabs" role="tablist" aria-label="课程内容">
      <button
        className={activeTab === 'explain' ? 'active' : ''}
        onClick={() => onTabChange('explain')}
        role="tab"
        type="button"
        aria-selected={activeTab === 'explain'}
      >
        <BookIcon />
        讲解
      </button>
      <button
        className={activeTab === 'review' ? 'active' : ''}
        onClick={() => onTabChange('review')}
        role="tab"
        type="button"
        aria-selected={activeTab === 'review'}
      >
        <MessageIcon />
        复盘
      </button>
    </div>
  );
}
