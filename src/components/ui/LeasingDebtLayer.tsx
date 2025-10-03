import Button from '@mui/material/Button';
import { useMapLayers } from '../../context/MapLayerContext';
import { Box } from '@mui/material';
import ColorLegend from './ColorLegend';

const LeasingDebtLayer = () => {
  const { debtFilter, setDebtFilter, clearDebtFilter } = useMapLayers();

  const isLeasingDebt = debtFilter === 'leasingDebt';
  const isRentDebt = debtFilter === 'rentDebt';

  const legendMode = isLeasingDebt
    ? 'leasingDebt'
    : isRentDebt
      ? 'leasingCost'
      : null;

  return (
    <Box sx={{ width: '100%', borderTop: '1px solid', borderColor: 'divider' }}>
      <div className="w-full">
        <div className="mt-4 flex items-center justify-between">
          <Button
            fullWidth
            variant={isLeasingDebt ? 'contained' : 'outlined'}
            disableElevation
            onClick={() =>
              isLeasingDebt ? clearDebtFilter() : setDebtFilter('leasingDebt')
            }
            sx={{
              bgcolor: isLeasingDebt ? '#7e57c2' : 'transparent',
              color: isLeasingDebt ? '#fff' : '#7e57c2',
              borderColor: '#7e57c2',
              '&:hover': {
                bgcolor: isLeasingDebt ? '#5e35b1' : 'rgba(126,87,194,0.08)',
                borderColor: '#5e35b1',
              },
              textTransform: 'none',
              fontSize: 12,
              fontWeight: 500,
              width: 'max-content',
            }}
          >
            იჯარის დავალიანება
          </Button>

          <Button
            fullWidth
            variant={isRentDebt ? 'contained' : 'outlined'}
            disableElevation
            onClick={() =>
              isRentDebt ? clearDebtFilter() : setDebtFilter('rentDebt')
            }
            sx={{
              bgcolor: isRentDebt ? '#7e57c2' : 'transparent',
              color: isRentDebt ? '#fff' : '#7e57c2',
              width: 'max-content',
              fontSize: 12,
              borderColor: '#7e57c2',
              '&:hover': {
                bgcolor: isRentDebt ? '#5e35b1' : 'rgba(126,87,194,0.08)',
                borderColor: '#5e35b1',
              },
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            იჯარის თანხა
          </Button>
        </div>

        {/* Legend */}
        <ColorLegend mode={legendMode} />
      </div>
    </Box>
  );
};

export default LeasingDebtLayer;
