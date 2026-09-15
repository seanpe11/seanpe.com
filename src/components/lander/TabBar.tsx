export type Tab = { id: string; label: string };

type TabBarProps = {
  tabs: Tab[];
  active: number;
  onChange: (index: number) => void;
};

/** The three-button bar from the original layout, now driving the deck. */
export const TabBar = ({ tabs, active, onChange }: TabBarProps) => (
  <div role="tablist" aria-label="Sections" className="grid w-full grid-cols-3">
    {tabs.map((t, i) => {
      const isActive = i === active;
      return (
        <button
          key={t.id}
          role="tab"
          type="button"
          aria-selected={isActive}
          aria-controls={`panel-${t.id}`}
          onClick={() => onChange(i)}
          className={`rounded-none border border-white/20 px-3 py-2 text-sm font-medium transition-all duration-200 ${
            isActive
              ? "bg-[#33ccff] text-gray-900 shadow-lg shadow-[#33ccff]/30"
              : "text-white hover:bg-white/10"
          }`}
        >
          {t.label}
        </button>
      );
    })}
  </div>
);
