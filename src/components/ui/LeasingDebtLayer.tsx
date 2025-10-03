import Button from '@mui/material/Button';
import { useMapLayers } from '../../context/MapLayerContext';

const LeasingDebtLayer = () => {
  const { showDebt, toggleDebt } = useMapLayers();

  return (
    <Button
      fullWidth
      variant={showDebt ? 'contained' : 'outlined'}
      disableElevation
      onClick={toggleDebt}
      sx={{
        bgcolor: showDebt ? '#7e57c2' : 'transparent',
        color: showDebt ? '#fff' : '#7e57c2',
        borderColor: '#7e57c2',
        '&:hover': {
          bgcolor: showDebt ? '#5e35b1' : 'rgba(126,87,194,0.08)',
          borderColor: '#5e35b1',
        },
        textTransform: 'none',
        fontWeight: 500,
      }}
    >
      {showDebt
        ? ' იჯარის დავალიანების გამორთვა'
        : 'იჯარის დავალიანების ჩართვა'}
    </Button>
  );
};

export default LeasingDebtLayer;
