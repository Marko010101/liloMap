import { RestartAlt as RestartAltIcon } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useMapFilters } from '../../context/MapFilterContext';
import { useSection } from '../../context/SectionContext';
import { useMapLayers } from '../../context/MapLayerContext';
import { useSelectedSpace } from '../../context/SelectedSpaceContext';
import { useDirection } from '../../context/DirectionContext';

const ClearFilter = () => {
  const { setAreaRange } = useMapFilters();
  const { clear: clearSections } = useSection();
  const { clearDebtFilter } = useMapLayers();
  const { clearSelectedSpace } = useSelectedSpace();
  const { setIsDirectionMode, setDirections } = useDirection();

  const handleClearFilters = () => {
    setAreaRange(null);
    clearSections();
    clearDebtFilter();
    clearSelectedSpace();
    setIsDirectionMode(false);
    setDirections(null);
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
