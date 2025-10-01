// components/AreaRangeFilter.tsx
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import MuseumIcon from "@mui/icons-material/Museum";
import MuseumOutlinedIcon from "@mui/icons-material/MuseumOutlined";
import { useMapFilters } from "../context/MapFilterContext";

type AreaRange = [number, number];
const fmt = (n: number) => new Intl.NumberFormat("ka-GE").format(n) + " მ²";

export default function AreaRangeFilter() {
  const { areaRange, setAreaRange, limits } = useMapFilters();
  const { min, max, step } = limits;

  // Local draft: show full range initially, but NOT applied until commit
  const [draft, setDraft] = useState<AreaRange>([min, max]);

  // If external range changes (e.g., reset), reflect it
  useEffect(() => {
    setDraft(areaRange ?? [min, max]);
  }, [areaRange, min, max]);

  const handleChange = (_: Event, v: number | number[]) => {
    if (Array.isArray(v) && v.length === 2) setDraft([v[0], v[1]] as AreaRange);
  };

  const handleCommitted = (
    _: Event | React.SyntheticEvent,
    v: number | number[]
  ) => {
    if (!Array.isArray(v) || v.length !== 2) return;
    const pair: AreaRange = [v[0], v[1]];
    // if full range -> deactivate (null), else activate with the chosen range
    const isFull = pair[0] <= min && pair[1] >= max;
    setAreaRange(isFull ? null : pair);
  };

  return (
    <Box sx={{ width: 360, m: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        ფართობის დიაპაზონი
      </Typography>

      <Stack spacing={1}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Chip
            size="small"
            icon={<MuseumOutlinedIcon />}
            label={fmt(min)}
            variant="outlined"
          />
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            არჩეული: <strong>{fmt(draft[0])}</strong> –{" "}
            <strong>{fmt(draft[1])}</strong>
          </Typography>
          <Chip size="small" icon={<MuseumIcon />} label={fmt(max)} />
        </Stack>

        <Slider
          value={draft}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          onChangeCommitted={handleCommitted}
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
