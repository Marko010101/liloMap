import type { Section } from '../../context/SectionContext';
import { Colors } from '../../data/Colors';

type Props = {
  section: Section;
  selected: boolean;
  onToggle: (s: Section) => void;
};

export default function SectionCard({ section, selected, onToggle }: Props) {
  const bg = Colors.sector[section];

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onToggle(section)}
      title={`სექტორი ${section}`}
      className={[
        'flex h-14 w-14 cursor-pointer flex-col items-center justify-center',
        'rounded-xl shadow-sm ring-2 transition-transform duration-150',
        selected ? 'scale-110 ring-black/50' : 'ring-black/5',
      ].join(' ')}
      style={{ backgroundColor: bg }}
    >
      <span className="text-sm font-semibold text-black/80 drop-shadow">
        {section}
      </span>
      <span className="text-[10px] text-black/70">Sector</span>
    </button>
  );
}
