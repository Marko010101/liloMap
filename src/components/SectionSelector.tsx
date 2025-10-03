import { useMemo } from 'react';
import { useSection } from '../context/SectionContext';
import SectionCard from './ui/SectionCard';
import { SECTIONS } from '../types/section';
import { Box } from '@mui/material';
import { Colors } from '../data/Colors';

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
        my: 2.5,
        pt: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <div className="w-full">
        <div className="mb-3 flex max-w-full items-center justify-between">
          <h3 className="flex flex-wrap gap-1 text-sm text-gray-700">
            სექტორები{' '}
            {selected.length > 0
              ? selected.map((s) => (
                  <span
                    key={s}
                    className="rounded text-white"
                    style={{
                      color:
                        Colors.sector[s as keyof (typeof Colors)['sector']],
                    }}
                  >
                    {s}
                  </span>
                ))
              : null}
          </h3>
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
