// components/ui/ClearFilter.tsx
import { RestartAlt as RestartAltIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useMapFilters } from '../../context/MapFilterContext';
import { useSection } from '../../context/SectionContext';
import { useMapLayers } from '../../context/MapLayerContext';
import { useSelectedSpace } from '../../context/SelectedSpaceContext';

const ClearFilter = () => {
  const { setAreaRange } = useMapFilters();
  const { clear: clearSections } = useSection();
  const { setShowDebt } = useMapLayers();
  const { clearSelectedSpace } = useSelectedSpace();

  const handleClearFilters = () => {
    setAreaRange(null);
    clearSections();
    setShowDebt(false);
    clearSelectedSpace();
  };

  return (
    <div className="mt-5 w-full">
      <Button
        fullWidth
        size="small"
        variant="outlined"
        startIcon={<RestartAltIcon />}
        onClick={handleClearFilters}
      >
        ფილტრის გასუფთავება
      </Button>
    </div>
  );
};

export default ClearFilter;
