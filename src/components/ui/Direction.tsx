import { Box, Typography } from '@mui/material';
import { useDirection } from '../../context/DirectionContext';
import { Button } from './button';

const Direction = () => {
  const { isDirectionMode, setIsDirectionMode, directions } = useDirection();

  const { distance = 0, departure = {}, destination = {} } = directions || {};
  const toggleDirectionMode = () => setIsDirectionMode((v) => !v);
  const roundedDistance = distance ? Number(distance.toFixed(1)) : 0;

  return (
    <Box
      sx={{
        width: '100%',
        pt: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        textAlign: 'center',
        px: 2,
      }}
    >
      {departure?.name && destination?.name ? (
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: '1rem',
            mb: 1.5,
            lineHeight: 1.6,
            '& span': {
              color: 'primary.main',
              fontWeight: 600,
            },
          }}
        >
          <span>{departure.name}</span>-სა და <span>{destination.name}</span>-ს
          შორის დაშორებაა <span>{roundedDistance}</span> ნაბიჯი.
        </Typography>
      ) : (
        <Typography
          variant="body2"
          sx={{
            color: 'text.disabled',
            fontStyle: 'italic',
            fontSize: '0.9rem',
            mb: 1,
          }}
        >
          გააქტიურეთ მიმართულების ღილაკი და აირჩიეთ ორი მდებარეობა მიმართულების
          სანახავად.
        </Typography>
      )}

      <Button
        variant={isDirectionMode ? 'secondary' : 'default'}
        onClick={toggleDirectionMode}
      >
        {isDirectionMode ? 'გააქტიურებულია' : 'გააქტიურება'}
      </Button>
    </Box>
  );
};

export default Direction;
