import { useState, useEffect } from 'react';
import { InputAdornment, IconButton, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelectedSpace } from '../../context/SelectedSpaceContext';
import { matchStock } from '../../helpers/spaceHelpers';

export default function SearchField() {
  const { setSelectedSpace } = useSelectedSpace();
  const [id, setId] = useState('');

  useEffect(() => {
    if (id.trim()) {
      const matched = matchStock(id);
      setSelectedSpace(matched ?? null);
    }
  }, [id, setSelectedSpace]);

  const handleClear = () => {
    setId('');
    setSelectedSpace(null);
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
      <div className="w-full">
        <TextField
          label="მოძებნე ID-ის მიხედვით"
          value={id}
          size="small"
          onChange={(e) => setId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') handleClear();
          }}
          fullWidth
          color="primary"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">ID</InputAdornment>
              ),
              endAdornment: id ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClear}
                    edge="end"
                    size="small"
                    aria-label="Clear"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : undefined,
            },
          }}
        />
      </div>
    </Box>
  );
}
