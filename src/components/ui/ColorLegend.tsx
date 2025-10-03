import { Box, Stack, Typography } from '@mui/material';
import { Colors } from '../../data/Colors';
import { BANDS } from '../../helpers/spaceHelpers';

export default function ColorLegend({
  mode,
}: {
  mode: 'leasingDebt' | 'leasingCost' | null;
}) {
  if (!mode) return null;

  const palette =
    mode === 'leasingDebt' ? Colors.leasingDebt : Colors.leasingCost;
  const items = BANDS[mode];

  return (
    <Box mt={1.5}>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        ფერთა დიაპაზონი (
        {mode === 'leasingDebt' ? 'იჯარის დავალიანება' : 'იჯარის თანხა'}):
      </Typography>

      <Stack direction="row" spacing={1} mt={0.5} flexWrap="wrap">
        {items.map(({ key, label }) => (
          <Stack
            key={key}
            direction="row"
            alignItems="center"
            spacing={0.75}
            sx={{ mr: 1.5, mb: 0.5 }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: 0.5,
                bgcolor: palette[key],
                border: '1px solid rgba(0,0,0,0.12)',
              }}
            />
            <Typography variant="caption">{label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
