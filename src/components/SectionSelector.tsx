import { useMemo } from 'react';
import { useSection } from '../context/SectionContext';
import SectionCard from './ui/SectionCard';
import { SECTIONS } from '../types/section';
import { Box } from '@mui/material';

export default function SectionSelector() {
  const { selected, toggle, clear, setAll } = useSection();

  const cards = useMemo(
    () =>
      SECTIONS.map((s) => (
        <SectionCard
          key={s}
          section={s}
          selected={selected.includes(s)}
          onToggle={toggle}
        />
      )),
    [selected, toggle],
  );

  return (
    <Box
      sx={{
        width: '100%',
        m: 3,
        pt: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <div className="w-full">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">სექტორები</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAll(SECTIONS)}
              className="cursor-pointer text-xs text-gray-600 hover:underline"
            >
              ყველა
            </button>
            <button
              onClick={clear}
              className="cursor-pointer text-xs text-blue-600 hover:underline"
            >
              არცერთი
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pb-1">{cards}</div>
      </div>
    </Box>
  );
}
