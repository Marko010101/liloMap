import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useMapFilters } from '../context/MapFilterContext';

type AreaNum = number | '';
type AreaRangeDraft = [AreaNum, AreaNum];
const fmt = (n: number) => new Intl.NumberFormat('ka-GE').format(n) + ' მ²';

export default function AreaRangeFilter() {
  const { areaRange, setAreaRange, limits } = useMapFilters();
  const { min, max, step } = limits;

  // Local draft allows '' while typing
  const [draft, setDraft] = useState<AreaRangeDraft>([min, max]);

  // reflect external changes (reset/inactive)
  useEffect(() => {
    const [a, b] = areaRange ?? [min, max];
    setDraft([a, b]);
  }, [areaRange, min, max]);

  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const roundToStep = (v: number) => Math.round(v / step) * step;

  const normalizeCommit = (a: AreaNum, b: AreaNum) => {
    const A = clamp(roundToStep(Number(a ?? min)));
    const B = clamp(roundToStep(Number(b ?? max)));
    return A <= B ? ([A, B] as [number, number]) : ([B, A] as [number, number]);
  };

  // ----- Inputs (live): do NOT round to step while typing -----
  const setMinLive = (val: string) => {
    if (val === '') return setDraft((d) => ['', d[1]]);
    const n = Number(val);
    if (Number.isNaN(n)) return;
    setDraft((d) => [clamp(n), d[1]]);
  };
  const setMaxLive = (val: string) => {
    if (val === '') return setDraft((d) => [d[0], '']);
    const n = Number(val);
    if (Number.isNaN(n)) return;
    setDraft((d) => [d[0], clamp(n)]);
  };

  // Commit on blur/Enter: round + set filter
  const commitDraft = () => {
    const [A, B] = normalizeCommit(draft[0], draft[1]);
    const isFull = A <= min && B >= max;
    setAreaRange(isFull ? null : [A, B]);
    // also snap inputs visually to the committed numbers
    setDraft([A, B]);
  };
  const onKeyDownCommit: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') commitDraft();
  };
  const selectAll: React.FocusEventHandler<HTMLInputElement> = (e) =>
    e.target.select();

  // ----- Slider (live + commit): slider already aligned to step -----
  const sliderValue: [number, number] = [
    Number(draft[0] === '' ? min : draft[0]),
    Number(draft[1] === '' ? max : draft[1]),
  ];
  const handleSliderChange = (_: Event, v: number | number[]) => {
    if (Array.isArray(v) && v.length === 2) setDraft([v[0], v[1]]);
  };
  const handleSliderCommitted = (
    _: Event | React.SyntheticEvent,
    v: number | number[],
  ) => {
    if (!Array.isArray(v) || v.length !== 2) return;
    const [A, B] = normalizeCommit(v[0], v[1]);
    const isFull = A <= min && B >= max;
    setAreaRange(isFull ? null : [A, B]);
    setDraft([A, B]);
  };

  return (
    <Box
      sx={{
        width: '100%',
        pt: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <div className="flex items-baseline justify-between">
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          ფართობი
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          არჩეული: <strong>{fmt(sliderValue[0])}</strong> –{' '}
          <strong>{fmt(sliderValue[1])}</strong>
        </Typography>
      </div>

      <Stack spacing={1}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <TextField
            size="small"
            type="number"
            label="მინ."
            value={draft[0]}
            onChange={(e) => setMinLive(e.target.value)}
            onFocus={selectAll}
            onBlur={commitDraft}
            onKeyDown={onKeyDownCommit}
            inputProps={{ min, max, step, inputMode: 'numeric' }}
            sx={{ width: 110 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">მ²</InputAdornment>,
            }}
          />

          <TextField
            size="small"
            type="number"
            label="მაქს."
            value={draft[1]}
            onChange={(e) => setMaxLive(e.target.value)}
            onFocus={selectAll}
            onBlur={commitDraft}
            onKeyDown={onKeyDownCommit}
            inputProps={{ min, max, step, inputMode: 'numeric' }}
            sx={{ width: 110 }}
            InputProps={{
              endAdornment: <InputAdornment position="end">მ²</InputAdornment>,
            }}
          />
        </Stack>

        <Slider
          value={sliderValue}
          min={min}
          max={max}
          step={step}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderCommitted}
          valueLabelDisplay="auto"
          valueLabelFormat={(n) => fmt(Number(n))}
          getAriaValueText={(n) => `${n} კვადრატული მეტრი`}
          disableSwap
          marks={[
            { value: min, label: fmt(min) },
            { value: max, label: fmt(max) },
          ]}
          aria-labelledby="area-range-slider"
        />
      </Stack>
    </Box>
  );
}
